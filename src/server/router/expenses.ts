import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const expenseRouter = createProtectedRouter()
    .query('getAll', {
        input: z.object({
            dateMin: z.date().default(new Date(2000, 1, 1)),
            dateMax: z.date().default(new Date(2100, 1, 1)),
            amountMin: z.number().default(0),
            amountMax: z.number().default(2147483647),
            locations: z.array(z.string()).nullish(),
            categories: z.array(z.string()).nullish(),
            wallets: z.array(z.string()).nullish(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.expense.findMany({
                where: {
                    date: {
                        lte: input.dateMin,
                        gte: input.dateMax,
                    },
                    expense: {
                        lte: input.amountMin,
                        gte: input.amountMax,
                    },
                    location: !input.locations ? undefined : { in: input.locations },
                    walletId: !input.wallets ? undefined : { in: input.wallets },
                    categoryId: !input.categories ? undefined : { in: input.categories },
                },
                include: {
                    Category: true,
                    Wallet: true,
                },
            });
        },
    })
    .mutation('create', {
        input: z.object({
            date: z.date(),
            expense: z.number(),
            currency: z.string(),
            description: z.string().nullable(),
            location: z.string(),
            categoryId: z.string(),
            walletId: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.expense.create({
                data: {
                    date: input.date,
                    expense: input.expense,
                    currency: input.currency,
                    expenseEuro: input.currency === 'EUR' ? input.expense : input.expense / 7.5345,
                    description: input.description ?? input.location,
                    location: input.location,
                    Category: {
                        connect: {
                            id: input.categoryId,
                        },
                    },
                    Wallet: {
                        connect: {
                            id: input.walletId,
                        },
                    },
                    User: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });
        },
    });
