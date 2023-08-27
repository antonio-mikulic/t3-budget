import { type Wallet } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { api } from '~/utils/api';
import Button, { ButtonType } from '../layout/Button';
import Card from '../layout/Card';
import Input from '../layout/Input';
import Spinner from '../layout/Spinner';

export enum WalletMode {
  View,
  Create,
  Update,
}

export interface IWalletCardProps {
  wallet?: Wallet;
  mode?: WalletMode;
  className?: string;
  onCreate?: (wallet: Wallet) => void;
  onDelete?: (id: string) => void;
}

const WalletCard = (props: IWalletCardProps) => {
  const [viewMode, setViewMode] = useState(props.mode ?? WalletMode.View);
  const [name, setName] = useState(props.wallet?.name ?? '');
  const [description, setDescription] = useState(props.wallet?.description ?? '');
  const [total, setTotal] = useState(props.wallet?.total.toString() ?? '');

  const create = api.wallet.create.useMutation();
  const update = api.wallet.update.useMutation();
  const remove = api.wallet.delete.useMutation();

  const isLoading = create.isLoading || update.isLoading || remove.isLoading;
  const isDisabled = !name || isLoading;
  const isForm = viewMode === WalletMode.Create || viewMode === WalletMode.Update;

  useEffect(() => {
    setName(props.wallet?.name ?? '');
    setDescription(props.wallet?.description ?? '');
    setTotal(props.wallet?.total.toString() ?? '');
  }, [props.wallet]);

  useEffect(() => {
    if (viewMode === WalletMode.Create && create.status === 'success' && create.data) {
      props.onCreate?.(create.data);
      create.reset();
      setName('');
      setDescription('');
      setTotal('');
    }
  }, [create, viewMode, props]);

  useEffect(() => {
    if (viewMode === WalletMode.Update && update.status === 'success') {
      update.reset();
      setViewMode(WalletMode.View);
    }
  }, [update, viewMode]);

  const onDelete = async () => {
    if (props.wallet?.id) {
      await remove.mutateAsync({ id: props.wallet.id });
      props.onDelete?.(props.wallet.id);
    }
  };

  const onUpdate = async () => {
    if (!props.wallet) return;

    await update.mutateAsync({
      id: props.wallet.id,
      name,
      description,
    });
  };

  const onCreate = async () => {
    await create.mutateAsync({
      name,
      description,
    });
  };

  const onSave = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isDisabled || isLoading) {
      return;
    }

    if (viewMode === WalletMode.Create) {
      await onCreate();
    } else if (viewMode === WalletMode.Update) {
      await onUpdate();
    }
  };

  const startEdit = () => {
    if (viewMode === WalletMode.View) {
      setViewMode(WalletMode.Update);
    }
  };

  const stopEdit = () => {
    if (viewMode === WalletMode.Update) {
      setViewMode(WalletMode.View);
    }
  };

  return (
    <Card
      className={`${props.className} ${viewMode === WalletMode.View ? 'hover:cursor-pointer' : ''}`}
      onClick={startEdit}
    >
      {isForm && (
        <form>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>

          <Input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input>

          <div className="flex w-full justify-between">
            <div>
              {props.wallet?.id && (
                <Button className="mr-2" onClick={stopEdit} role={ButtonType.Secondary} disabled={isDisabled}>
                  <FaTimes />
                </Button>
              )}

              <Button type="submit" onClick={(e) => void onSave(e)} role={ButtonType.Success} disabled={isDisabled}>
                <FaSave />
              </Button>
            </div>

            <Spinner removeWrapper={true} isLoading={isLoading} size={35}></Spinner>
            {props.wallet?.id && (
              <Button disabled={isLoading} onClick={() => void onDelete()} role={ButtonType.Error}>
                {remove.isLoading ? <Spinner isLoading={true} size={25} /> : <FaTrash />}
              </Button>
            )}
          </div>
        </form>
      )}

      {viewMode === WalletMode.View && (
        <>
          <span>{name}</span>
          <span>{total}€</span>
          <span>{description}</span>
        </>
      )}
    </Card>
  );
};
export default WalletCard;
