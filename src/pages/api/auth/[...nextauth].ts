import NextAuth, { type NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user, token }) {
            if (session.user) {
                session.user.id = user?.id ?? token.sub;
                console.log('SET USER ID', session.user.id);
            }
            return session;
        },
    },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    secret: env.NEXTAUTH_SECRET,
    providers: [
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
            authorization: { params: { scope: 'identify email' } },
        }),

        // ...add more providers here
    ],
};

export default NextAuth(authOptions);
