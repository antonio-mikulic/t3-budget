// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { userRouter } from './users';
import { expenseRouter } from './expenses';
import { walletRouter } from './wallet';
import { categoryRouter } from './categories';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('category.', categoryRouter)
    .merge('expenses.', expenseRouter)
    .merge('wallet.', walletRouter)
    .merge('users.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
