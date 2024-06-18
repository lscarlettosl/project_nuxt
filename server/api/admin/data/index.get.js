import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const laptops = await prisma.laptops_status.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      laptopsId: true,
      startTime: true,
      endTime: true,
      usersId: true,
      active: true,
      hash: true,
      user: {
        select: {
          last_name: true,
        },
      },

      laptop: {
        select: {
          number: true,
        },
      },
    },
  });

  return laptops;
});
