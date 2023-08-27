import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "../router/categories";
import { expenseRouter } from "../router/expenses";
import { userRouter } from "../router/users";
import { walletRouter } from "../router/wallet";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	category: categoryRouter,
	expenses: expenseRouter,
	users: userRouter,
	wallet: walletRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
