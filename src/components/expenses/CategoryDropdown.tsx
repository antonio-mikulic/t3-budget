import { type Category } from '@prisma/client';
import { useState } from 'react';
import { api } from '~/utils/api';

export const CategorytDropdown = (props: { onSelect: (category: string) => void }) => {
	const { data, isFetching } = api.category.getAll.useQuery({ name: '' });
  const categories = data ?? [];
  const [selected, setSelected] = useState<Category | undefined>(undefined);

  const onSelect = (categoryId: string) => {
    props.onSelect(categoryId);
    setSelected((categories.find((category) => category.id === categoryId)));
  };

  return (
    <div className="m-0.5 border border-hidden p-0.5 ">
      <select value={selected?.id}  onChange={(e) => onSelect(e.target.value)} className="text-primary w-full rounded-md px-2 pb-1.5 text-base font-light text-black outline-none">
        {isFetching && <option>Loading...</option>}
        {!isFetching && !selected && <option>Select category</option>}

        {!isFetching &&
          categories.map((category) => (
            <option key={category.id} value={category.id} >
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
};
