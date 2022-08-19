import { Category, Expense, Wallet } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';

const expenses = async (req: NextApiRequest, res: NextApiResponse) => {
    const expenses = await prisma.expense.findMany();

    await prisma.category.delete({
        where: {
            id: '',
        },
    });

    if (!expenses?.length) {
        let wallet: Wallet = {
            id: '5',
            name: 'Main',
            description: 'Default Wallet',
            total: 50,
        };

        wallet = await prisma.wallet.create({ data: wallet });

        let category: Category = {
            id: '5',
            name: 'Food',
            description: 'Food expenses',
        };

        category = await prisma.category.create({ data: category });

        // Create a list of 10 expenses
        const seed: Expense[] = Array.from({ length: 10 }, (_, i) => ({
            id: i.toString(),
            date: new Date(),
            expense: i * 50,
            description: `Expense ${i}`,
            location: `Konzum ${i}`,
            currency: 'EUR',
            expenseEuro: i * 50,
            walletId: wallet.id,
            categoryId: category.id,
        }));

        for (const expense of seed) {
            await prisma.expense.create({
                data: expense,
            });
        }
        res.status(200).json(seed);
    }

    res.status(200).json(expenses);
};

export default expenses;
