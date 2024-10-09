import prismaClient from "./client.js";

// ------------------------ READ
export const emplacementGetAll = async () => await prismaClient.emplacement.findMany();

// ------------------------ WRITE
export const emplacementCreateOrUpdate = async (x: number, y: number, color: string) => await prismaClient.emplacement.upsert({
    where: {
        x_y: { x, y }
    },
    update: {
        color
    },
    create: {
        x,
        y,
        color
    },
});
