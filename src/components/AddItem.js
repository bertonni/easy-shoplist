import { useEffect } from 'react';
import { useList } from '../hooks/useList';
import AllItems from "./AllItems";

export default function AddItem() {

  const { handleActivePage } = useList();

  useEffect(() => {
    handleActivePage('add');
  }, [handleActivePage]);

  return (
    <div className="flex flex-col sm:items-center">
      <AllItems />
    </div>
  )
}
