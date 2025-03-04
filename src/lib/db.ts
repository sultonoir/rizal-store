import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const db = new PrismaClient({
	log: [
		{ level: 'query', emit: 'event' },
		{ level: 'info', emit: 'event' },
		{ level: 'warn', emit: 'event' },
		{ level: 'error', emit: 'event' }
	]
}).$extends(withAccelerate());

export { db };
