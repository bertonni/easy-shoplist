import { useEffect } from 'react';
import { useList } from '../hooks/useList';
import { useAuth } from '../hooks/useAuth';
import AllItems from "./AllItems";
import { Redirect } from 'react-router-dom';

export default function AddItem() {

  const { handleActivePage } = useList();
  const { loggedUser } = useAuth();

  console.log('user_id', loggedUser.uid);
  useEffect(() => {
    handleActivePage('add');
  }, [handleActivePage]);

  if(!loggedUser) return <Redirect to='/' />

  return (
    <div className="flex flex-col">
      <AllItems />
    </div>
  )
}
