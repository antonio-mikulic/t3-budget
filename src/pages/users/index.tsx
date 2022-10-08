import UserIcon from '../../components/layout/UserIcon';
import { trpc } from '../../utils/trpc';
import Heading from '../../components/layout/Heading';
import CustomError from '../../components/layout/Error';
import Spinner from '../../components/layout/Spinner';

function UsersPage() {
    const { data, isLoading, error } = trpc.useQuery(['users.getAll']);

    return (
        <div>
            <Heading>Users</Heading>
            <CustomError error={error?.message.toString()}></CustomError>
            <Spinner isLoading={isLoading}></Spinner>

            <section className="flex w-full flex-wrap">
                {!data && !isLoading && <p>No users found</p>}

                {data &&
                    data.map((user) => (
                        <article
                            key={user.id}
                            className="m-1 flex w-1/3 flex-col items-center justify-center truncate rounded border border-indigo-500 p-5 backdrop-brightness-110 lg:w-1/5"
                        >
                            <UserIcon img={user.image}></UserIcon>
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                            {user.accounts.map((account) => (
                                <span key={account.id}>
                                    {account.provider?.charAt(0).toUpperCase() + account.provider?.slice(1)}
                                </span>
                            ))}
                        </article>
                    ))}
            </section>
        </div>
    );
}

export default UsersPage;
