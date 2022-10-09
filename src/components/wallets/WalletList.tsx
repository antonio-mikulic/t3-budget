import { Wallet } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import CardWrapper from '../layout/CardWrapper';
import WalletCard, { WalletMode } from './WalletCard';

const WalletList = (props: { wallets: Wallet[] }) => {
    const [wallets, setWalletes] = useState(props.wallets);

    const onCreate = (wallet: Wallet) => {
        setWalletes([...wallets, wallet]);
    };

    const onDelete = (id: string) => {
        setWalletes([...wallets.filter((c) => c.id !== id)]);
    };

    useEffect(() => {
        setWalletes(props.wallets);
    }, [props.wallets]);

    return (
        <CardWrapper>
            <WalletCard mode={WalletMode.Create} onCreate={onCreate}></WalletCard>
            {wallets &&
                wallets.map((wallet) => (
                    <WalletCard mode={WalletMode.View} onDelete={onDelete} wallet={wallet} key={wallet.id}></WalletCard>
                ))}
        </CardWrapper>
    );
};
export default WalletList;
