import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth"
import { createHash } from "crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const hashKey = new Date().getTime() + getRandomArbitrary(1, 1000)

  const session = await getServerSession(event)

  const prisma = new PrismaClient();
  const hash = createHash("sha256").update(String(hashKey)).digest("hex");

  const laptopsCount = await prisma.laptops_status.count({
    where: {
      usersId: session.user.id,
      active: true,
    }
  });

  if (laptopsCount >= 3) {
    return 'Laptop limit error';
  }

  const isTaken = await prisma.laptops.findFirst({
    where: {
      AND: [
        {
          number: Number(body.id)
        },
        {
          status: false
        }
      ]
    }
  });

  if (isTaken) {
    return false;
  }

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
      usersId: session.user.id,
      active: true,
      hash: hash
    },
  });

  return 'ok';
});
