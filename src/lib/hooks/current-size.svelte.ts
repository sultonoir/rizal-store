// src/lib/hooks/current-store.ts
import type { StockAndSize } from '@prisma/client';

export const currentSize = $state<{ current: StockAndSize }>({
	current: {
		name: '',
		id: '',
		amount: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
		productId: ''
	}
});
