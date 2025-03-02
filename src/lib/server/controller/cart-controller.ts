import {
	cartSchema,
	type AddCartSchema,
	type CartSchema
} from '$lib/components/form/cart/schema';
import { db } from '$lib/db';
import { type Cookies } from '@sveltejs/kit';

export function updateCart(newItems: CartSchema, cookies: Cookies) {
	cookies.set('cart', JSON.stringify(newItems), {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7,
		path: '/'
	});
}

export function getCart(cookies: Cookies) {
	const cart = cookies.get('cart');
	if (!cart) {
		return [];
	}
	try {
		return cartSchema.parse(JSON.parse(cart));
	} catch {
		console.error('Failed to parse cart cookie');
		return [];
	}
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
			quantity: data.quantity
		}
	});

	return updateCart;
}

export function removeFromCart({
	cookies,
	id
}: {
	cookies: Cookies;
	id: string;
}) {
	const prevCart = getCart(cookies);

	const newCart = prevCart.filter((item) => item.id !== id);

	updateCart(newCart, cookies);
}

export function updateCartQuantity({
	id,
	newQuantity,
	cookies
}: {
	id: string;
	newQuantity: number;
	cookies: Cookies;
}) {
	const cart = getCart(cookies); // Ambil cart saat ini

	// Cek apakah item dengan productSlug & size sudah ada dalam cart
	const updatedCart = cart.map((item) => {
		if (item.id === id) {
			return { ...item, quantity: newQuantity }; // Update quantity
		}
		return item;
	});

	updateCart(updatedCart, cookies); // Simpan perubahan cart

	return { success: true };
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
