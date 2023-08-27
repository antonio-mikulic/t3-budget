import { createTRPCRouter, protectedProcedure } from "../api/trpc";

export const userRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.user.findMany({
			include: {
				accounts: true,
			},
		});
	}),
});
