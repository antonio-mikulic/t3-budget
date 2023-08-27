import type { NextPage } from 'next';
import { api } from '~/utils/api';
import Button from '../../components/layout/Button';
import Heading from '../../components/layout/Heading';
import WalletList from '../../components/wallets/WalletList';

const WalletPage: NextPage = () => {
	const { data, isFetching, error, refetch } = api.wallet.getAll.useQuery({ name: '' });
	
  return (
    <section>
      <Heading isLoading={isFetching} error={error?.message.toString()} title="Wallets">
        <Button type="button" onClick={() => void refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </Heading>
      {!data?.length && <div>No wallets found</div>}
      {data && <WalletList wallets={data}></WalletList>}
    </section>
  );
};

export default WalletPage;
