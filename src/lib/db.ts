import { PrismaClient } from '@prisma/client';
import pino from 'pino';

const logger = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			translateTime: 'HH:MM:ss Z',
			ignore: 'pid,hostname'
		}
	}
});

const db = new PrismaClient({
	log: [
		{ level: 'query', emit: 'event' },
		{ level: 'info', emit: 'event' },
		{ level: 'warn', emit: 'event' },
		{ level: 'error', emit: 'event' }
	]
});

db.$on('query', (e) =>
	logger.info(`QUERY: ${e.query} - ${e.params} - ${e.duration}`)
);
db.$on('info', (e) => logger.info(`INFO: ${e.message}`));
db.$on('warn', (e) => logger.warn(`WARN: ${e.message}`));
db.$on('error', (e) => logger.error(`ERROR: ${e.message}`));

export { db };
