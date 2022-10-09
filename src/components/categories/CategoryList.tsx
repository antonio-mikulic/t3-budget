import React, { useEffect, useState } from 'react';
import { Category } from '@prisma/client';
import CardWrapper from '../layout/CardWrapper';
import CategoryCard, { CategoryMode } from './CategoryCard';

const CategoryList = (props: { categories: Category[] }) => {
    const [categories, setCategories] = useState(props.categories);

    const onCreate = (category: Category) => {
        setCategories([...categories, category]);
    };

    const onDelete = (id: string) => {
        setCategories([...categories.filter((c) => c.id !== id)]);
    };

    useEffect(() => {
        setCategories(props.categories);
    }, [props.categories]);

    return (
        <CardWrapper>
            <CategoryCard mode={CategoryMode.Create} onCreate={onCreate}></CategoryCard>
            {categories &&
                categories.map((category) => (
                    <CategoryCard
                        mode={CategoryMode.View}
                        onDelete={onDelete}
                        category={category}
                        key={category.id}
                    ></CategoryCard>
                ))}
        </CardWrapper>
    );
};
export default CategoryList;
