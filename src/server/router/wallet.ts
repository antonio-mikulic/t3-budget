import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const walletRouter = createProtectedRouter()
    .query('getAll', {
        input: z.object({
            name: z.string().nullable(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.wallet.findMany({
                where: {
                    name: input.name ?? undefined,
                },
            });
        },
    })
    .mutation('create', {
        input: z.object({
            name: z.string().min(3),
            total: z.number().nullable(),
            description: z.string().nullable(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.wallet.create({
                data: {
                    name: input.name,
                    total: input.total ?? 0,
                    description: input.description ?? '',
                    User: {
                        connect: {
                            id: ctx.session?.user?.id,
                        },
                    },
                },
            });
        },
    });
