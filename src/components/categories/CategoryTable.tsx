import Table from 'rc-table';
import React from 'react';
import { Category } from '@prisma/client';

const CategoryTable = (props: { categories: Category[] }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'description',
            width: '40%',
            render: () => <a href="#">Delete</a>,
        },
    ];

    return (
        <section className="w-full">
            <Table columns={columns} data={props.categories} />
        </section>
    );
};
export default CategoryTable;
