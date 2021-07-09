import { createContext, useState, useEffect, useCallback } from 'react';
import { database } from '../assets/firebase';
import { useAuth } from '../hooks/useAuth';

export const ListContext = createContext();

export function ListContextProvider({ children }) {

  const { loggedUser } = useAuth();

  const itemsStorage = JSON.parse(localStorage.getItem('items')) ?? [];
  const listStorage = loggedUser ? JSON.parse(localStorage.getItem(`list_${loggedUser.uid}`)) : [];
  const [list, setList] = useState(listStorage);
  const [items, setItems] = useState(itemsStorage);
  const [activePage, setActivePage] = useState('');

  const getList = useCallback(
    async () => {
      if (!loggedUser) return;

      const userList = [];
      await database.collection('lists').doc(`${loggedUser.uid}`).collection('list').get()
        .then((querySnapshot) => {
          console.log('get list')
          querySnapshot.forEach((doc) => {
            userList.push(doc.data());
          })
        })
        .catch((error) => console.log(error.message));
        userList.sort((a, b) => {
          return a.category.localeCompare(b.category);
        });
      setList(userList);
    },
    [loggedUser],
  );

  useEffect(() => {
    if (loggedUser) localStorage.setItem(`list_${loggedUser.uid}`, JSON.stringify(list));
    return () => { }
  }, [list, loggedUser]);

  useEffect(() => {
    localStorage.setItem(`items`, JSON.stringify(items));
    return () => { }
  }, [items]);

  useEffect(() => {
    getList();
    return () => { }
  }, [getList]);

  useEffect(() => {
    getAllItems();
    return () => { }
  }, []);

  function getAllItems() {
    const storage = JSON.parse(localStorage.getItem('items')) ?? [];
    if (storage.length === 0) {
      const allItems = [];
      database.collection('items').get()
        .then((querySnapshot) => {
          console.log(querySnapshot.forEach((doc) => {
            console.log(doc.data());
            allItems.push({ id: doc.id, ...doc.data() });
          }));
          allItems.sort((a, b) => {
            return a.description.localeCompare(b.description);
          });
          console.log('pegou os dados do banco');
          localStorage.setItem('items', JSON.stringify(allItems));
          setItems(allItems);
        })
        .catch((error) => console.log(error.message));
    }
  }

  function generateId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function addSubtotal(index, item) {
    const newList = [...list];
    database.collection('lists').doc(`${loggedUser.uid}`).collection('list').doc(`${item.id}`).set(item)
      .then(() => console.log('Item updated'))
      .catch((error) => console.log(error.message));

    newList[index].price = item.price;
    setList(newList);
  }

  function insertItemIntoList(item) {
    if (!loggedUser) return;

    const index = items.findIndex(val => val.description === item.description);

    database.collection('lists').doc(`${loggedUser.uid}`).collection('list').doc(`${item.id}`).set(item)
      .then(() => console.log('Item added to user list/items'))
      .catch((error) => console.log(error.message));
      
    if (index < 0) {
      setItems([...items, item]);
    }
    setList([...list, item]);
  }

  function updateItemOfList(item) {
    if (!loggedUser) return;

    const index = list.findIndex(val => val.id === item.id);
    const newList = [...list];

    newList[index] = item;
    newList[index].price = item.price

    database.collection('lists').doc(`${loggedUser.uid}`).collection('list').doc(`${item.id}`).update({
      quantity: item.quantity,
      price: item.price
    })
      .then(() => console.log('Item updated'))
      .catch((error) => console.log(error.message));
    setList(newList);
  }

  function removeFromList(item) {
    if (!loggedUser) return;

    const index = list.findIndex(val => val.id === item.id);
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    database.collection('lists').doc(`${loggedUser.uid}`).collection('list').doc(`${item.id}`).delete()
      .then(() => console.log('Item removed from list'))
      .catch((error) => console.error(error));
  }

  function updateList(item) {
    const index = list.findIndex(val => val.description === item.description);

    if (index < 0) insertItemIntoList(item);
    else updateItemOfList(item);
  }

  function handleActivePage(url) {
    setActivePage(url);
  }

  function clearList() {
    list.forEach((item) => {
      database.collection('lists').doc(`${loggedUser.uid}`).collection('list').doc(`${item.id}`).delete()
        .then(() => console.log('Clearing list'))
        .catch((error) => console.error(error));
    })
    setList([]);
  }

  return (
    <ListContext.Provider
      value={{
        list,
        items,
        activePage,
        handleActivePage,
        updateList,
        generateId,
        removeFromList,
        addSubtotal,
        clearList
      }}>
      {children}
    </ListContext.Provider>
  )
}