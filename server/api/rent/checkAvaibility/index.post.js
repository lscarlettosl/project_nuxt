import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const prisma = new PrismaClient();

    const laptop = await prisma.laptops.findFirst({
        where: {
            AND: [
                {
                    number: Number(body.id)
                },
                {
                    status: true
                }
            ]
        }
    });

    if(!laptop) {
        return false
    }else{
        return true
    }

    if (laptop) {
        
        await prisma.laptops.update({
            where: { id: laptop.id },
            data: { status: false }
        });

        return { success: true, message: "Ноутбук успешно возвращен." };
    } else {
        return { success: false, message: "Ноутбук не найден или уже возвращен." };
    }
});
