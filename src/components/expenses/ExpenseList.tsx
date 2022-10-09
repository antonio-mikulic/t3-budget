import { trpc } from '../../utils/trpc';
import Spinner from '../layout/Spinner';

const ExpenseList = () => {
    const { data, isLoading, error } = trpc.useQuery(['expenses.getAll', {}]);

    return (
        <div>
            <section>{error && <p>Error: {error.toString()}</p>}</section>
            <Spinner isLoading={false}></Spinner>

            <section className="w-full overflow-hidden rounded-t-xl p-5">
                <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Expense</th>
                            <th className="px-4 py-2">Currency</th>
                            <th className="px-4 py-2">Expense (€)</th>
                            <th className="px-4 py-2">Wallet</th>
                            <th className="px-4 py-2">Categories</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>

                    {!data && !isLoading && <p>No expenses found</p>}

                    {data && (
                        <tbody>
                            {data.map((e) => (
                                <tr key={e.id}>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">
                                        {e.date.toLocaleDateString()}
                                    </td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{e.expense}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{e.expense}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{e.currency}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{e.expenseEuro}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{e.Wallet.name}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">
                                        {e.Category.name}
                                    </td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{e.location}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{e.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </section>
        </div>
    );
};

export default ExpenseList;
