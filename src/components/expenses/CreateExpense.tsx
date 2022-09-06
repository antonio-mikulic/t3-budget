import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import DatePicker from 'react-datepicker';

const CreateExpense = () => {
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('EUR');
    const [walletId, setWallet] = useState('');
    const [categoryId, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const mutation = trpc.useMutation(['expenses.create']);

    const isDisabled = () => {
        return mutation.isLoading || !date || !amount || !currency || !walletId || !categoryId || !location;
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(date, amount, currency, walletId, categoryId, location, description);
        mutation.mutate({
            date,
            expense: amount,
            currency,
            walletId,
            categoryId,
            location,
            description,
        });
    };

    return (
        <div>
            <section className="w-full overflow-hidden rounded-t-xl p-5">
                <form>
                    <div className="flex flex-row flex-wrap justify-between">
                        <div className="m-2 flex w-1/4 flex-col">
                            <label htmlFor="date">Date</label>
                            <DatePicker
                                className="w-full text-black"
                                selected={date}
                                onChange={(newDate: Date) => setDate(newDate)}
                            />
                        </div>
                        <div className="m-2 flex w-1/4 flex-col">
                            <label htmlFor="amount">Amount</label>
                            <div className="">
                                <input
                                    className="text-black"
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                                />
                                <select
                                    className="p-0.5 text-black"
                                    name="currency"
                                    id="currency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="EUR">EUR</option>
                                    <option value="HRK">HRK</option>
                                </select>
                            </div>
                        </div>
                        <div className="m-2 flex w-1/4 flex-col">
                            <label htmlFor="location">Location</label>
                            <input
                                placeholder="Location of purchase"
                                className="w-full text-black"
                                type="text"
                                name="location"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="m-2 flex w-1/4 flex-col">
                            <label htmlFor="description">Description</label>
                            <input
                                placeholder="Description of purchase"
                                className="w-full text-black"
                                type="text"
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="m-2 flex w-1/4 flex-col">
                        <label htmlFor="wallet">Wallet</label>
                        <select
                            className="text-black"
                            name="wallet"
                            id="wallet"
                            value={walletId}
                            onChange={(e) => setWallet(e.target.value)}
                        >
                            <option value="0">Cash</option>
                            <option value="1">Debit Card</option>
                            <option value="2">Credit Card</option>
                        </select>
                    </div>

                    <div className="m-2 flex w-1/4 flex-col">
                        <label htmlFor="category">Category</label>
                        <select
                            className="text-black"
                            name="category"
                            id="category"
                            value={categoryId}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="0">Food</option>
                            <option value="1">Travel</option>
                            <option value="2">Entertainment</option>
                        </select>
                    </div>

                    <button type="submit" onClick={handleSubmit} disabled={isDisabled()}>
                        Create
                    </button>

                    {mutation.error && <p>Something went wrong while saving expense {mutation.error.message}</p>}
                </form>
            </section>
        </div>
    );
};
export default CreateExpense;
