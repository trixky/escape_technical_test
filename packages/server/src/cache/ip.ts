import redisClient from "./client.js";

const IP_KEY_PREFIX = "IP=";
const DEFAULT_RATE_LIMIT_SEC = 5;

export async function setIpRatingLimit(ip: string, limit: number = DEFAULT_RATE_LIMIT_SEC): Promise<void> {
    await redisClient.set(IP_KEY_PREFIX + ip, limit, {
        EX: limit
    });
}

export async function getIpRateLimited(ip: string): Promise<boolean> {
    return await redisClient.exists(IP_KEY_PREFIX + ip) === 1;
}