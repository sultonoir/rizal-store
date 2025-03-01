import { cartSchema, type AddCartSchema, type CartSchema } from '$lib/components/form/cart/schema';
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
	cookies,
	data,
	id
}: {
	cookies: Cookies;
	data: AddCartSchema;
	id: string;
}) {
	const prevCart = getCart(cookies);

	const newCart = prevCart.map((item) => {
		if (item.id === id) {
			return { ...item, quantity: item.quantity + data.quantity };
		}
		return item;
	});

	const itemExists = prevCart.some((item) => item.id === id);

	if (!itemExists) {
		newCart.push({ productSlug: data.productSlug, quantity: data.quantity, size: data.size, id });
	}

	updateCart(newCart, cookies);
	return { success: true };
}

export function removeFromCart({ cookies, id }: { cookies: Cookies; id: string }) {
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
