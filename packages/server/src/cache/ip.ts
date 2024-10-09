import redisClient from "./client.js";

const IP_KEY_PREFIX = "IP:";

export async function setIpRatingLimit(ip: string, limit: number): Promise<void> {
    await redisClient.set(IP_KEY_PREFIX + ip, limit, {
        EX: limit
    });
}

export async function getIpRateLimited(ip: string): Promise<boolean> {
    return await redisClient.exists(IP_KEY_PREFIX + ip) === 1;
}