import type { NextPage } from 'next';
import CategoryTable from '../../components/categories/CategoryTable';
import CustomError from '../../components/layout/Error';
import Heading from '../../components/layout/Heading';
import Spinner from '../../components/layout/Spinner';
import { trpc } from '../../utils/trpc';

const CategoryPage: NextPage = () => {
    const { data, isLoading, error } = trpc.useQuery(['category.getAll', { name: '' }]);

    return (
        <section>
            <Heading>Categories</Heading>
            <CustomError error={error?.message.toString()}></CustomError>
            <Spinner isLoading={isLoading}></Spinner>
            {!data && <div>No categories found</div>}
            {data && <CategoryTable categories={data}></CategoryTable>}
        </section>
    );
};

export default CategoryPage;
