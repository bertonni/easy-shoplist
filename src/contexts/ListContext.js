import { createContext, useState, useEffect } from 'react';
import { database } from '../assets/firebase';

export const ListContext = createContext();

export function ListContextProvider({ children }) {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) ?? []);
  const [items, setItems] = useState([]);

  function getAllItems() {
    database.collection('items').onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
      const newItems = [];
      if (snapshot.metadata.fromCache) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let newItem = { id: change.doc.id, ...change.doc.data() }
            newItems.push(newItem);
          }
        });
      }

      if (!snapshot.metadata.fromCache) {
        snapshot.forEach((doc) => {
          let newItem = { id: doc.id, ...doc.data() }
          newItems.push(newItem);
        })
      }
      setItems(newItems);
    });
  }

  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
    return () => { }
  }, [list]);

  useEffect(() => {
    getAllItems();
    return () => { }
  }, []);


  function addSubtotal(index, item) {
    const newList = [...list];
    newList[index].price = item.price;
    setList(newList);
  }
  
  function insertItem(item, newItem) {
    setList([...list, item]);
    if (newItem) {
      const itemToAdd = {
        category: item.category,
        description: item.description
      }
      setItems([...items, itemToAdd]);

      database.collection('items').add(itemToAdd)
        .then(() => console.log('Item added to firebase'))
        .catch((error) => console.log(error.message));
    }
  }

  // function updateItem(item) {

  // }

  // function removeItem(item) {

  // }

  function updateList(item, newItem = null) {
    // verify if the item already exists in the list
    const index = list.findIndex(val => val.description === item.description);
    // if doesn't exists, add the item in the list
    if (index < 0) insertItem(item, newItem);
    else {
      const newList = [...list];
      // if the item wasn't changed, remove from the list
      if (newList[index].quantity === item.quantity) {
        newList.splice(index, 1);
        setList(newList);
        return;
      }
      // if the item has changed, update the list
      newList[index] = item;
      newList[index].price = item.price
      setList(newList);
    }
  }

  function handleActivePage(url) {
    setActivePage(url);
  }

  function clearList() {
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
        addSubtotal,
        clearList
      }}>
      {children}
    </ListContext.Provider>
  )
}