import {
	type AddCartSchema,
	type UpdateCart
} from '$lib/components/form/cart/schema';
import { db } from '$lib/db';

export async function getCartUserId(userId: string) {
	const carts = await db.cart.findMany({
		where: {
			userId
		}
	});

	const products = await db.productDetails.findMany({
		where: {
			product: {
				id: {
					in: carts.map((item) => item.productId)
				}
			}
		},
		include: {
			product: {
				include: {
					productImage: {
						take: 1,
						orderBy: {
							createdAt: 'asc'
						}
					},
					stockandsize: true
				}
			},
			subcategory: true,
			category: true
		}
	});

	// Bangun ulang result berdasarkan cart, bukan hanya berdasarkan hasil query

	const result = carts.map((cartItem) => {
		const product = products.find((p) => p.product.id === cartItem.productId);

		if (!product) return null; // Jika produk tidak ditemukan, skip

		// Cari stok yang sesuai dengan ukuran dari cart
		const stock = product.product.stockandsize.find(
			(s) => s.name === cartItem.size
		);

		// Jika ukuran tidak ditemukan atau stok kurang, item tetap ditampilkan tetapi dengan `maxQuantity = 0`
		const maxQuantity = stock ? stock.amount : 0;

		return {
			...product.product,
			id: cartItem.id,
			productImage: product.product.productImage[0] || null,
			quantity: cartItem.quantity,
			size: cartItem.size,
			link: `/products/${product.category.name}/${product.subcategory.name}/${product.product.slug}`,
			maxQuantity // Jika tidak ada stok, maxQuantity = 0
		};
	});

	return result.filter((item) => item !== null);
}

export async function addToCart({
	data,
	userId
}: {
	data: AddCartSchema;
	userId: string;
}) {
	const existCart = await db.cart.findFirst({
		where: {
			productId: data.productId,
			userId,
			size: data.size
		}
	});

	if (!existCart) {
		const createCart = await db.cart.create({
			data: {
				...data,
				userId
			}
		});

		return createCart;
	}

	const updateCart = await db.cart.update({
		where: {
			id: existCart.id
		},
		data: {
			quantity: existCart.quantity + data.quantity
		}
	});

	return updateCart;
}

export async function removeFromCart({
	userId,
	id
}: {
	userId: string;
	id: string;
}) {
	const cart = await db.cart.delete({
		where: {
			userId,
			id
		}
	});

	return cart;
}

export async function updateCart({
	data,
	userId
}: {
	data: UpdateCart;
	userId: string;
}) {
	const cart = await db.cart.update({
		where: {
			id: data.id,
			userId
		},
		data: {
			quantity: data.quantity
		}
	});

	return cart;
}

export async function getCartCount({ userId }: { userId?: string }) {
	if (!userId) {
		return 0;
	}

	const cartCount = await db.cart.aggregate({
		where: { userId },
		_sum: {
			quantity: true
		}
	});

	return cartCount._sum.quantity ?? 0;
}
