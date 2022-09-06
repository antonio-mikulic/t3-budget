import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import React from 'react';
import CategoryTable from './CategoryTable';

const CreateExpense = () => {
    const [name, setName] = useState('');
    const { data, isLoading, error } = trpc.useQuery(['category.getAll', { name: name }]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong while loading categories {error.message}</div>;
    }

    if (!data) {
        return <div>No categories found</div>;
    }

    return <CategoryTable categories={data}></CategoryTable>;
};
export default CreateExpense;
