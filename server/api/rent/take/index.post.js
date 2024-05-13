import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const prisma = new PrismaClient();

  const resp = await prisma.laptops.update({
    where: {
      number: Number(body.id),
    },
    data: {
      status: false,
    },
  });

  const status = await prisma.laptops_status.create({
    data: {
      laptopsId: resp.id,
      usersId: 1,
      active: true,
    },
  });
  return resp;
});
