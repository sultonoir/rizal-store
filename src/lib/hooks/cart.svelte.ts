import type { CartSchema } from '$lib/components/form/cart/schema';

export const cart = $state<{ value: CartSchema }>({ value: [] });
