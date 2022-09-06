import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const categoryRouter = createProtectedRouter()
    .query('getAll', {
        input: z.object({
            name: z.string().nullable(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.category.findMany({
                where: {
                    name: input.name ? input.name : undefined,
                },
            });
        },
    })
    .mutation('create', {
        input: z.object({
            name: z.string().min(3),
            description: z.string().nullable(),
        }),
        async resolve({ input, ctx }) {
            console.log('creating category', {
                name: input.name,
                description: input.description ?? '',
                userId: ctx.session.user.id,
            });
            return await ctx.prisma.category.create({
                data: {
                    name: input.name,
                    description: input.description ?? '',
                    User: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });
        },
    });
