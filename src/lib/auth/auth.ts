import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../db/index";
import bcrypt from "bcrypt";

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        StationID: { label: "StationID", type: "text", placeholder: "" },
        Password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        const StationId = credentials.StationID;
        const password = credentials.Password;

        const user = await client.user.findUnique({
          where: {
            StationId,
            password,
          },
        });
        console.log(user);

        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            console.log("user ");
            return {
              id: user.id,
              name: user.StationName,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  pages: {
    signIn: "/logIn",
  },
};
