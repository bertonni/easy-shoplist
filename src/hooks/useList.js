import { useContext } from 'react';
import { ListContext } from '../contexts/ListContext';

export function useList() {
  const value = useContext(ListContext);

  return value;
}