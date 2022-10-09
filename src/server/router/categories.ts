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
                    userId: ctx.session?.user?.id,
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
            const existingCategory = await ctx.prisma.category.count({
                where: {
                    name: input.name,
                    userId: ctx.session?.user?.id,
                },
            });

            if (existingCategory) {
                throw new Error('Category with same name already exists');
            }

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
    })
    .mutation('update', {
        input: z.object({
            id: z.string(),
            name: z.string().min(3),
            description: z.string().nullable(),
        }),
        async resolve({ input, ctx }) {
            const existingCategory = await ctx.prisma.category.count({
                where: {
                    name: input.name,
                    userId: ctx.session?.user?.id,
                    NOT: {
                        id: input.id,
                    },
                },
            });

            if (existingCategory) {
                throw new Error('Category with same name already exists');
            }

            return await ctx.prisma.category.update({
                data: {
                    name: input.name,
                    description: input.description ?? '',
                },
                where: {
                    id: input.id,
                },
            });
        },
    })
    .mutation('delete', {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input, ctx }) {
            const blocked = await ctx.prisma.expense.count({
                where: {
                    categoryId: input.id,
                    userId: ctx.session?.user?.id,
                },
            });

            if (blocked) {
                throw new Error('Cannot delete category with expenses');
            }

            return await ctx.prisma.category.delete({
                where: {
                    id: input.id,
                },
            });
        },
    });
