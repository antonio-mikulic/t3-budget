import { Expense } from '@prisma/client';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaSave } from 'react-icons/fa';
import { trpc } from '../../utils/trpc';
import Button, { ButtonType } from '../layout/Button';
import Input from '../layout/Input';
import Spinner from '../layout/Spinner';
import { CategorytDropdown } from './CategoryDropdown';
import { CurrencyDropdown } from './CurrencyDropdown';
import { WalletDropdown } from './WalletDropdown';

const CreateExpense = (props: { onAdd: (expense: Expense) => void }) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const [walletId, setWallet] = useState('');
  const [categoryId, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const mutation = trpc.useMutation(['expenses.create']);

  const isDisabled = mutation.isLoading || !date || !amount || !currency || !walletId || !categoryId || !location;

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await mutation.mutateAsync({
      date,
      expense: amount,
      currency,
      walletId,
      categoryId,
      location,
      description,
    });
  };

  useEffect(() => {
    if (mutation.status === 'success') {
      props.onAdd?.(mutation.data);
      mutation.reset();
    }
  }, [mutation, props]);

  return (
    <form className="flex w-full flex-wrap overflow-hidden rounded-t-xl p-5">
      <div className="text-black">
        <DatePicker className="m-1 rounded p-1" selected={date} onChange={(newDate: Date) => setDate(newDate)} />
      </div>

      <div className="flex">
        <Input
          wrapperClassName="w-4/5"
          type="number"
          id="amount"
          placeholder="Amount (kn)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <CurrencyDropdown onSelect={(currency) => setCurrency(currency)} />
      </div>

      <WalletDropdown onSelect={(wallet) => setWallet(wallet)} />

      <CategorytDropdown onSelect={(category) => setCategory(category)} />

      <Input
        type="text"
        id="location"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Input
        type="text"
        id="desc"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button disabled={isDisabled} onClick={handleSubmit} role={ButtonType.Success}>
        {mutation.isLoading ? <Spinner isLoading={true} size={25} /> : <FaSave />}
      </Button>
    </form>
  );
};
export default CreateExpense;
