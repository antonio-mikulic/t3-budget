import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import Button from '../layout/Button';
import Input from '../layout/Input';

const CreateExpense = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const mutation = trpc.useMutation(['category.create']);

    const isDisabled = () => {
        return mutation.isLoading || !name;
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        await mutation.mutate({
            name,
            description,
        });

        if (!mutation.error) {
            setName('');
            setDescription('');
        }
    };

    return (
        <div>
            <section className="w-full overflow-hidden rounded-t-xl p-5">
                <form>
                    <Input
                        type="text"
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Input>
                    <Input
                        type="text"
                        id="description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Input>

                    <Button type="submit" className="mt-2" onClick={handleSubmit} disabled={isDisabled()}>
                        Create
                    </Button>

                    {mutation.error && <p>Something went wrong while saving expense {mutation.error.message}</p>}
                </form>
            </section>
        </div>
    );
};
export default CreateExpense;
