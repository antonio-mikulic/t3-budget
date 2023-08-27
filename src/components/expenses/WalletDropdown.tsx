import { type Wallet } from '@prisma/client';
import { useState } from 'react';
import { api } from '~/utils/api';

export const WalletDropdown = (props: { onSelect: (wallet: string) => void }) => {
  const { data, isFetching } = api.wallet.getAll.useQuery( { name: '' });
  const wallets = data ?? [];
  const [selected, setSelected] = useState<Wallet | undefined>(undefined);

	const onSelect = (walletId: string) => {
    props.onSelect(walletId);
    setSelected(wallets.find((wallet) => wallet.id === walletId));
  };

  return (
    <div className="m-0.5 border border-hidden p-0.5 ">
      <select value={selected?.id} onChange={(e) => onSelect(e.target.value)} className="text-primary w-full rounded-md px-2 pb-1.5 text-base font-light text-black outline-none">
        {isFetching && <option>Loading...</option>}
        {!isFetching && !selected && <option>Select wallet</option>}

        {!isFetching &&
          wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.name}
            </option>
          ))}
      </select>
    </div>
  );
};
