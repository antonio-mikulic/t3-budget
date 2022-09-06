import { Account, User } from '@prisma/client';
import { createRouter } from './context';

export interface UserData {
    user: User;
    account: Account;
}

export const userRouter = createRouter().query('getAll', {
    async resolve({ ctx }) {
        return await ctx.prisma.user.findMany({
            include: {
                accounts: true,
            },
        });
    },
});
