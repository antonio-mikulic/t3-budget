import UserIcon from '../../components/layout/UserIcon';
import { trpc } from '../../utils/trpc';
import Image from 'next/image';

function UsersPage() {
    const { data, isLoading, error } = trpc.useQuery(['users.getAll']);

    return (
        <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <section>{error && <p>Error: {error.toString()}</p>}</section>

            <section className="w-full overflow-hidden rounded-t-xl p-5">
                <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Provider</th>
                        </tr>
                    </thead>

                    {isLoading && <Image src="/assets/images/spinner.svg" alt="Loading" width="350px" height="300px" />}

                    {!data && !isLoading && <p>No users found</p>}

                    {data && (
                        <tbody>
                            {data.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">
                                        <UserIcon img={user.image}></UserIcon>
                                    </td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{user.name}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">{user.email}</td>
                                    <td className="border border-indigo-500 px-4 py-2 font-medium">
                                        {user.accounts.map((account) => (
                                            <span key={account.id}>
                                                {account.provider?.charAt(0).toUpperCase() + account.provider?.slice(1)}
                                            </span>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </section>
        </div>
    );
}

export default UsersPage;
