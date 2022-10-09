import UserIcon from '../../components/layout/UserIcon';
import { trpc } from '../../utils/trpc';
import Heading1 from '../../components/layout/Heading1';
import CustomError from '../../components/layout/Error';
import Spinner from '../../components/layout/Spinner';
import Card from '../../components/layout/Card';
import CardWrapper from '../../components/layout/CardWrapper';

function UsersPage() {
    const { data, isLoading, error } = trpc.useQuery(['users.getAll']);

    return (
        <div>
            <Heading1>Users</Heading1>
            <CustomError error={error?.message.toString()}></CustomError>
            <Spinner isLoading={isLoading}></Spinner>

            <CardWrapper>
                {!data && !isLoading && <p>No users found</p>}

                {data &&
                    data.map((user) => (
                        <Card key={user.id}>
                            <UserIcon img={user.image}></UserIcon>
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                            {user.accounts.map((account) => (
                                <span key={account.id}>
                                    {account.provider?.charAt(0).toUpperCase() + account.provider?.slice(1)}
                                </span>
                            ))}
                        </Card>
                    ))}
            </CardWrapper>
        </div>
    );
}

export default UsersPage;
