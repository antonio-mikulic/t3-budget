import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from "../api/trpc";

export const walletRouter = createTRPCRouter({
	getAll: protectedProcedure.input(z.object({
		name: z.string().nullable(),
	})).query(async ({ input, ctx }) => {
		if (!ctx.session?.user?.id) {
			throw new Error('User not logged in');
		}

		const wallets = await ctx.prisma.wallet.findMany({
			where: {
				name: input.name ? input.name : undefined,
				userId: ctx.session?.user?.id,
			},
			include: {
				Expense: true,
			},
		});

		for (const wallet of wallets) {
			wallet.total = Math.round(wallet.Expense.reduce((acc, expense) => acc + expense.expenseEuro, 0));
		}

		return wallets;
	}),
	create: protectedProcedure.input(z.object({
		name: z.string().min(3),
		description: z.string().nullable(),
	})).mutation(async ({ input, ctx }) => {
		const existing = await ctx.prisma.wallet.count({
			where: {
				name: input.name,
				userId: ctx.session?.user?.id,
			},
		});

		if (existing) {
			throw new Error('Wallet with same name already exists');
		}

		return await ctx.prisma.wallet.create({
			data: {
				name: input.name,
				total: 0,
				description: input.description ?? '',
				User: {
					connect: {
						id: ctx.session?.user?.id,
					},
				},
			},
		});
	}),
	update: protectedProcedure.input(z.object({
		id: z.string(),
		name: z.string().min(3),
		description: z.string().nullable(),
	})).mutation(async ({ input, ctx }) => {
		const existing = await ctx.prisma.wallet.count({
			where: {
				name: input.name,
				userId: ctx.session?.user?.id,
				NOT: {
					id: input.id,
				},
			},
		});

		if (existing) {
			throw new Error('Wallet with same name already exists');
		}

		return await ctx.prisma.wallet.update({
			data: {
				name: input.name,
				description: input.description ?? '',
			},
			where: {
				id: input.id,
			},
		});
	}),
	delete: protectedProcedure.input(z.object({
		id: z.string(),
	})).mutation(async ({ input, ctx }) => {
		const blocked = await ctx.prisma.expense.count({
			where: {
				walletId: input.id,
			},
		});

		if (blocked) {
			throw new Error('Cannot delete wallet with expenses');
		}

		return await ctx.prisma.wallet.delete({
			where: {
				id: input.id,
			},
		});
	}),
});
