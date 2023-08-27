import { type Wallet } from '@prisma/client';
import { useEffect, useState } from 'react';
import CardWrapper from '../layout/CardWrapper';
import WalletCard, { WalletMode } from './WalletCard';

const WalletList = (props: { wallets: Wallet[] }) => {
  const [wallets, setWallets] = useState(props.wallets);

  const onCreate = (wallet: Wallet) => {
    setWallets([...wallets, wallet]);
  };

  const onDelete = (id: string) => {
    setWallets([...wallets.filter((c) => c.id !== id)]);
  };

  useEffect(() => {
    setWallets(props.wallets);
  }, [props.wallets]);

  return (
    <CardWrapper>
      <WalletCard mode={WalletMode.Create} onCreate={onCreate}></WalletCard>
      {wallets?.map((wallet) => (
          <WalletCard mode={WalletMode.View} onDelete={onDelete} wallet={wallet} key={wallet.id}></WalletCard>
        ))}
    </CardWrapper>
  );
};
export default WalletList;
