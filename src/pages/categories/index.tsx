import type { NextPage } from 'next';
import CategoryList from '../../components/categories/CategoryList';
import Button from '../../components/layout/Button';
import Heading from '../../components/layout/Heading';
import { trpc } from '../../utils/trpc';

const CategoryPage: NextPage = () => {
    const { data, isFetching, error, refetch } = trpc.useQuery(['category.getAll', { name: '' }], {
        refetchOnWindowFocus: false,
    });

    return (
        <section>
            <Heading isLoading={isFetching} error={error?.message.toString()} title="Categories">
                <Button type="button" onClick={() => refetch()} disabled={isFetching}>
                    Refresh
                </Button>
            </Heading>
            {!data?.length && <div>No categories found</div>}
            {data && <CategoryList categories={data ?? []}></CategoryList>}
        </section>
    );
};

export default CategoryPage;
