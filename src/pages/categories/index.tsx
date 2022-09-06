import type { NextPage } from 'next';
import CategoryList from '../../components/categories/CategoryList';
import CreateCategory from '../../components/categories/CreateCategory';

const Categories: NextPage = () => {
    return (
        <section>
            <CreateCategory />
            <CategoryList />
        </section>
    );
};

export default Categories;
