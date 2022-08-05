import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL);

const dataKey = "data";

export const redisWrite = (data: object): Promise<unknown> =>
	client.set(dataKey, JSON.stringify(data));

export const redisRead = (): Promise<unknown> =>
	client
		.get(dataKey)
		.then((result) => JSON.parse(result))
		.catch((err) => console.error(err));
