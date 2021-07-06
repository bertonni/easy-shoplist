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
          querySnapshot.forEach((doc) => {
            userList.push(doc.data());
          })
        })
        .catch((error) => console.log(error.message));
      setList(userList);
    },
    [loggedUser],
  )

  function getAllItems() {
    const storage = JSON.parse(localStorage.getItem('items'));
    if (!storage) {
      database.collection('items').onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
        const newItems = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let newItem = { id: change.doc.id, ...change.doc.data() }
            newItems.push(newItem);
          }
        });

        newItems.sort((a, b) => {
          return a.description.localeCompare(b.description);
        })

        localStorage.setItem('items', JSON.stringify(newItems));
        setItems(newItems);
      });
    }
  }

  useEffect(() => {
    if (loggedUser) localStorage.setItem(`list_${loggedUser.uid}`, JSON.stringify(list));
    return () => { }
  }, [list, loggedUser]);

  useEffect(() => {
    getList();
    return () => { }
  }, [getList]);

  useEffect(() => {
    getAllItems();
    return () => { }
  }, []);

  function addSubtotal(index, item) {
    const newList = [...list];
    database.collection('lists').doc(`${loggedUser.uid}`).collection('list').doc(`${item.id}`).set(item)
      .then(() => console.log('Item updated'))
      .catch((error) => console.log(error.message));

    newList[index].price = item.price;
    setList(newList);
  }

  function insertItemIntoList(item, newItem) {
    if (loggedUser) {
      database.collection('lists').doc(`${loggedUser.uid}`).collection('list').doc(`${item.id}`).set(item)
        .then(() => console.log('Item added to user list'))
        .catch((error) => console.log(error.message));
    }
    setList([...list, item]);
    if (newItem) {
      const itemToAdd = {
        category: item.category,
        description: item.description
      }
      const newItems = [...items, itemToAdd];
      localStorage.setItem('items', JSON.stringify(newItems));
      setItems([...items, itemToAdd]);

      database.collection('items').add(itemToAdd)
        .then(() => console.log('Item added to firebase'))
        .catch((error) => console.log(error.message));
    }
  }

  function updateItemOfList(item) {
    if (!loggedUser) return;

    const index = list.findIndex(val => val.id === item.id);
    const newList = [...list];

    newList[index] = item;
    newList[index].price = item.price

    console.log(item);
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

  function updateList(item, newItem = null) {
    const index = list.findIndex(val => val.description === item.description);

    if (index < 0) insertItemIntoList(item, newItem);
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
        removeFromList,
        addSubtotal,
        clearList
      }}>
      {children}
    </ListContext.Provider>
  )
}