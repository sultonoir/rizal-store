import { OPTIMIZE_API_KEY } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { withOptimize } from '@prisma/extension-optimize';

const db = new PrismaClient({
	log: [
		{ level: 'query', emit: 'event' },
		{ level: 'info', emit: 'event' },
		{ level: 'warn', emit: 'event' },
		{ level: 'error', emit: 'event' }
	]
})
	.$extends(
		withOptimize({
			apiKey: OPTIMIZE_API_KEY
		})
	)
	.$extends(withAccelerate());

export { db };
