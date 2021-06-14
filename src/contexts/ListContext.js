import { createContext, useState, useEffect } from 'react';
import allItems from '../assets/allItems.json';

export const ListContext = createContext();

export function ListProvider({ children }) {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) ?? []);
  const [items] = useState(allItems);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
    return () => {}
  }, [list]);

  function updateQuantity(index, value) {
    if (list[index].quantity <= 0 && value < 0) return;
    const newList = [...list];
    newList[index].quantity += value;
    setList(newList);
  }

  function addSubtotal(index, item) {
    const newList = [...list];
    newList[index].subtotal = item.subtotal;
    setList(newList);
  }

  function updateList(item) {
    const index = list.findIndex(val => val.description === item.description);
    if (index < 0) setList([...list, item]);
    else {
      const newArr = [...list];
      newArr.splice(index, 1);
      setList(newArr);
    }
  }

  function clearList() {
    setList([]);
  }

  return (
    <ListContext.Provider
      value={{
        list,
        items,
        updateList,
        addSubtotal,
        updateQuantity,
        clearList
      }}>
      { children }
    </ListContext.Provider>
  )
}