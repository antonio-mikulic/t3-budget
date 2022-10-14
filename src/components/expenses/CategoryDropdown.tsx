import { Category } from '@prisma/client';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';

export const CategorytDropdown = (props: { onSelect: (category: string) => void }) => {
  const { data, isFetching } = trpc.useQuery(['category.getAll', { name: '' }]);
  const categorys = data ?? [];
  const [selected, setSelected] = useState<Category | undefined>(undefined);

  const onSelect = (category: Category) => {
    props.onSelect(category.id);
    setSelected(category);
  };

  return (
    <div className="m-0.5 border border-hidden p-0.5 ">
      <select className="text-primary w-full rounded-md px-2 pb-1.5 text-base font-light text-black outline-none">
        {isFetching && <option>Loading...</option>}
        {!isFetching && !selected && <option>Select category</option>}

        {!isFetching &&
          categorys.map((category) => (
            <option key={category.id} value={category.id} onClick={() => onSelect(category)}>
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
};
