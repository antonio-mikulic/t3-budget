import type { NextPage } from 'next';
import CustomError from '../../components/layout/Error';
import Heading from '../../components/layout/Heading';
import Spinner from '../../components/layout/Spinner';
import { trpc } from '../../utils/trpc';

const WalletPage: NextPage = () => {
    const { data, isLoading, error } = trpc.useQuery(['wallet.getAll', { name: '' }]);

    return (
        <section>
            <Heading>Wallets</Heading>
            <CustomError error={error?.message.toString()}></CustomError>
            <Spinner isLoading={isLoading}></Spinner>

            <div>{JSON.stringify(data)}</div>
        </section>
    );
};

export default WalletPage;
