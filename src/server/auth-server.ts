import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";

// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import {
//   getServerSession,
//   type User,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";
// import { type Adapter } from "next-auth/adapters";
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

// import { env } from "~/env";
// import { db } from "~/server/db";
// import {
//   accounts,
//   sessions,
//   users,
//   verificationTokens,
// } from "~/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
async function isBanned(userId: string): Promise<boolean> {
  // Check if the user is banned
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (
    dbUser?.bannedAt &&
    dbUser?.bannedUntil &&
    dbUser?.bannedAt < new Date() &&
    new Date() < dbUser.bannedUntil
  ) {
    console.log("Sign-in blocked: User is banned");
    return true;
  }
  return false; // Allow sign-in to proceed
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // Custom logic here
      console.log("Sign-in attempt:", { user, account, profile, email });
      if (await isBanned(user.id)) {
        return false;
      }
      console.log("Allowed sign-in");
      return true;
    },
    session: async ({ session, token }) => {
      if (await isBanned(session.user.id)) {
        console.log("User is banned");
        return {
          ...session,
          user: { ...session.user, id: token.sub, isBanned: true },
        };
      }
      console.log("Session:", session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("User:", user);
        if (await isBanned(user.id)) {
          // Instead of returning null, set a flag on the token
          token.isBanned = true;
          console.log("Token:", token);
        }
      }
      return token;
    },
    redirect({ url, baseUrl }) {
      // Redirect to /home after successful sign-in
      if (url.startsWith(baseUrl)) return `${baseUrl}/home`;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    ...(env.DISCORD_CLIENT_ID
      ? [
          DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(env.GOOGLE_CLIENT_ID
      ? [
          GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(env.APPLE_CLIENT_ID
      ? [
          AppleProvider({
            clientId: env.APPLE_CLIENT_ID,
            clientSecret: env.APPLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(env.FACEBOOK_CLIENT_ID
      ? [
          FacebookProvider({
            clientId: env.FACEBOOK_CLIENT_ID,
            clientSecret: env.FACEBOOK_CLIENT_SECRET!,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const userInDB = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!userInDB || !userInDB.passwordHash) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          userInDB.passwordHash,
        );

        if (!isPasswordValid) {
          console.log("Password validation failed");
          return null;
        }

        const userForToken = {
          id: userInDB.id,
          email: userInDB.email,
          name: userInDB.name,
        };
        console.log("Authorized user:", userForToken);
        return userForToken;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET as string,
  jwt: {
    secret: env.NEXTAUTH_SECRET as string,
  },
};

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  */
// export const getServerAuthSession = () => getServerSession(authOptions);

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
