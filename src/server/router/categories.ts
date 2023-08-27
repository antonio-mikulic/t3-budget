import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
	getAll: protectedProcedure.input(z.object({
		name: z.string().nullable(),
	})).query(({ input, ctx }) => {
		if (!ctx.session?.user?.id) {
			throw new Error('User not logged in');
		}

		return ctx.prisma.category.findMany({
			where: {
				name: input.name ? input.name : undefined,
				userId: ctx.session?.user?.id,
			},
		});
	}),
	create: protectedProcedure.input(z.object({
		name: z.string().min(3),
		description: z.string().nullable(),
	})).mutation(async ({ input, ctx }) => {
		const existingCategory = await ctx.prisma.category.count({
			where: {
				name: input.name,
				userId: ctx.session?.user?.id,
			},
		});

		if (existingCategory) {
			throw new Error('Category with same name already exists');
		}

		return ctx.prisma.category.create({
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
	}),
	update: protectedProcedure.input(z.object({
		id: z.string(),
		name: z.string().min(3),
		description: z.string().nullable(),
	})).mutation(async ({ input, ctx }) => {
		const existingCategory = await  ctx.prisma.category.count({
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

		return  ctx.prisma.category.update({
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
	}),
})
