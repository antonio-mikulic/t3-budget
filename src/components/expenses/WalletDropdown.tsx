import { Wallet } from '@prisma/client';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';

export const WalletDropdown = (props: { onSelect: (wallet: string) => void }) => {
  const { data, isFetching } = trpc.useQuery(['wallet.getAll', { name: '' }]);
  const wallets = data ?? [];
  const [selected, setSelected] = useState<Wallet | undefined>(undefined);

  const onSelect = (wallet: Wallet) => {
    props.onSelect(wallet.id);
    setSelected(wallet);
  };

  return (
    <div className="m-0.5 border border-hidden p-0.5 ">
      <select className="text-primary w-full rounded-md px-2 pb-1.5 text-base font-light text-black outline-none">
        {isFetching && <option>Loading...</option>}
        {!isFetching && !selected && <option>Select wallet</option>}

        {!isFetching &&
          wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id} onClick={() => onSelect(wallet)}>
              {wallet.name}
            </option>
          ))}
      </select>
    </div>
  );
};
