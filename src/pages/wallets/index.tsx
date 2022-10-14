import type { NextPage } from 'next';
import Button from '../../components/layout/Button';
import Heading from '../../components/layout/Heading';
import WalletList from '../../components/wallets/WalletList';
import { trpc } from '../../utils/trpc';

const WalletPage: NextPage = () => {
  const { data, isFetching, error, refetch } = trpc.useQuery(['wallet.getAll', { name: '' }]);

  return (
    <section>
      <Heading isLoading={isFetching} error={error?.message.toString()} title="Wallets">
        <Button type="button" onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </Heading>
      {!data?.length && <div>No wallets found</div>}
      {data && <WalletList wallets={data}></WalletList>}
    </section>
  );
};

export default WalletPage;
