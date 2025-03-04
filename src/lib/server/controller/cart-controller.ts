import {
	type AddCartSchema,
	type UpdateCart
} from '$lib/components/form/cart/schema';
import { db } from '$lib/db';

export async function getCartUserId(userId: string) {
	const carts = await db.cart.findMany({
		where: {
			userId
		},
		select: {
			size: true,
			quantity: true,
			id: true,
			product: {
				select: {
					id: true,
					name: true,
					slug: true,
					price: true,
					discount: true,
					priceAfterDiscount: true,
					stockandsize: {
						select: {
							productId: true,
							name: true,
							amount: true
						}
					},
					productImage: {
						take: 1,
						select: {
							url: true
						},
						orderBy: {
							createdAt: 'asc'
						}
					}
				}
			}
		},
		orderBy: {
			createdAt: 'asc'
		}
	});

	const result = carts.map((cart) => {
		const size = cart.product.stockandsize.find((s) => s.name == cart.size);
		return {
			id: cart.id,
			size: size?.name ?? 'S',
			quantity: cart.quantity,
			name: cart.product.name,
			slug: cart.product.slug,
			price: cart.product.price,
			priceAfterDiscount: cart.product.priceAfterDiscount,
			discount: cart.product.discount,
			image: cart.product.productImage[0].url,
			max: size?.amount ?? 99
		};
	});

	return result;
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
