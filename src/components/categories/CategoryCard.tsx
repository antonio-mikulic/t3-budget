import { Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { trpc } from '../../utils/trpc';
import Button, { ButtonType } from '../layout/Button';
import Card from '../layout/Card';
import Input from '../layout/Input';
import Spinner from '../layout/Spinner';

export enum CategoryMode {
  View,
  Create,
  Update,
}

export interface ICategoryCardProps {
  category?: Category;
  mode?: CategoryMode;
  className?: string;
  onCreate?: (category: Category) => void;
  onDelete?: (id: string) => void;
}

const CategoryCard = (props: ICategoryCardProps) => {
  const [viewMode, setViewMode] = useState(props.mode ?? CategoryMode.View);
  const [name, setName] = useState(props.category?.name ?? '');
  const [description, setDescription] = useState(props.category?.description ?? '');

  const create = trpc.useMutation(['category.create']);
  const update = trpc.useMutation(['category.update']);
  const remove = trpc.useMutation(['category.delete']);

  const isLoading = create.isLoading || update.isLoading || remove.isLoading;
  const isDisabled = !name || isLoading;
  const isForm = viewMode === CategoryMode.Create || viewMode === CategoryMode.Update;

  useEffect(() => {
    setName(props.category?.name ?? '');
    setDescription(props.category?.description ?? '');
  }, [props.category]);

  useEffect(() => {
    if (viewMode === CategoryMode.Create && create.status === 'success' && create.data) {
      props.onCreate?.(create.data);
      create.reset();
      setName('');
      setDescription('');
    }
  }, [create, viewMode, props]);

  useEffect(() => {
    if (viewMode === CategoryMode.Update && update.status === 'success') {
      update.reset();
      setViewMode(CategoryMode.View);
    }
  }, [update, viewMode]);

  const onDelete = async () => {
    if (props.category?.id) {
      await remove.mutateAsync({ id: props.category.id });
      props.onDelete?.(props.category.id);
    }
  };

  const onUpdate = async () => {
    if (!props.category) return;

    await update.mutateAsync({
      id: props.category.id,
      name,
      description,
    });
  };

  const onCreate = async () => {
    await create.mutateAsync({
      name,
      description,
    });
  };

  const onSave = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isDisabled || isLoading) {
      return;
    }

    if (viewMode === CategoryMode.Create) {
      onCreate();
    } else if (viewMode === CategoryMode.Update) {
      onUpdate();
    }
  };

  const startEdit = () => {
    if (viewMode === CategoryMode.View) {
      setViewMode(CategoryMode.Update);
    }
  };

  const stopEdit = () => {
    if (viewMode === CategoryMode.Update) {
      setViewMode(CategoryMode.View);
    }
  };

  return (
    <Card
      className={`${props.className} ${viewMode === CategoryMode.View ? 'hover:cursor-pointer' : ''}`}
      onClick={startEdit}
    >
      {isForm && (
        <form>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>

          <Input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input>

          <div className="flex w-full justify-between">
            <div>
              {props.category?.id && (
                <Button className="mr-2" onClick={stopEdit} role={ButtonType.Secondary} disabled={isDisabled}>
                  <FaTimes />
                </Button>
              )}

              <Button type="submit" onClick={onSave} role={ButtonType.Success} disabled={isDisabled}>
                <FaSave />
              </Button>
            </div>

            <Spinner removeWrapper={true} isLoading={isLoading} size={35}></Spinner>
            {props.category?.id && (
              <Button disabled={isLoading} onClick={onDelete} role={ButtonType.Error}>
                {remove.isLoading ? <Spinner isLoading={true} size={25} /> : <FaTrash />}
              </Button>
            )}
          </div>
        </form>
      )}

      {viewMode === CategoryMode.View && (
        <>
          <span>{name}</span>
          <span>{description}</span>
        </>
      )}
    </Card>
  );
};
export default CategoryCard;
