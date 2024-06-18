// file: ~/server/api/auth/[...].ts
import { PrismaClient } from "@prisma/client";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { default as bcrypt } from 'bcryptjs'
import mysql, { RowDataPacket } from 'mysql2/promise'
export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  pages: {
    signIn: "/authorization",
  },
  secret: "your-secret-here",
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        const prisma = new PrismaClient();



        const response = await prisma.users.findFirstOrThrow({
          where: {
            email: credentials?.email,
          },
        });


        const correctPassword = await bcrypt.compare(credentials.password!, response.password!)

        if (correctPassword) {
          return {
            id: response!.id,
            email: response!.email,
            role: response!.role,
            name: response!.first_name + ' ' + response.last_name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user = {
        id: token.id as number,
        email: token.email!,
        role: token.role as string,
        name: token.name as string,
      };

      return session;
    },
  },
});
