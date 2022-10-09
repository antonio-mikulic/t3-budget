import type { NextPage } from 'next';
import CustomError from '../../components/layout/Error';
import Heading1 from '../../components/layout/Heading1';
import Spinner from '../../components/layout/Spinner';
import { trpc } from '../../utils/trpc';

const WalletPage: NextPage = () => {
    const { data, isLoading, error } = trpc.useQuery(['wallet.getAll', { name: '' }]);

    return (
        <section>
            <Heading1>Wallets</Heading1>
            <CustomError error={error?.message.toString()}></CustomError>
            <Spinner isLoading={isLoading}></Spinner>

            <div>{JSON.stringify(data)}</div>
        </section>
    );
};

export default WalletPage;
