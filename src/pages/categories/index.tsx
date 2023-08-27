import type { NextPage } from 'next';
import { api } from '~/utils/api';
import CategoryList from '../../components/categories/CategoryList';
import Button from '../../components/layout/Button';
import Heading from '../../components/layout/Heading';

const CategoryPage: NextPage = () => {
  const { data, isFetching, error, refetch } = api.category.getAll.useQuery({ name: '' },  {
    refetchOnWindowFocus: false,
  });

  return (
    <section>
      <Heading isLoading={isFetching} error={error?.message.toString()} title="Categories">
        <Button type="button" onClick={() => void refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </Heading>
      {!data?.length && <div>No categories found</div>}
      {data && <CategoryList categories={data ?? []}></CategoryList>}
    </section>
  );
};

export default CategoryPage;
