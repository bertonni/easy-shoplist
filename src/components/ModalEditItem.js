import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useList } from "../hooks/useList";

export default function ModalEditItem({ item, updateList, closeModal }) {

  const [count, setCount] = useState(Number(item.quantity));
  const { removeFromList } = useList();

  
  function saveItem(e) {
    e.preventDefault();
    
    const newItem = {
      id: item.id,
      description: item.description,
      category: item.category,
      quantity: count,
      price: item.price
    }

    updateList(newItem);
    closeModal();
  }

  function updateItem(value) {
    if ((count + value) < 0) return;
    setCount(count + value);
  }

  function removeItem(e) {
    e.preventDefault();
    removeFromList(item);
    closeModal();
  }

  return (
    <>
      <div className="bg-black bg-opacity-50 z-20 absolute top-0 left-0 h-screen w-full sm:w-screen"
        onClick={() => closeModal()}
      />
      <div className="flex justify-center relative">
        <div className="flex flex-col z-30 bg-gray-50 absolute top-7 px-4 py-4 rounded">
          <h1 className="text-center text-xl font-medium my-2 text-gray-700">Editar Item</h1>
          <div className="flex flex-col gap-2">
            <div className={`pl-3 flex flex-col rounded h-full justify-center
              flex-grow truncate transition duration-300`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-gray-400 text-sm`}>{item.category}</span>
                <div className="flex items-center">
                  <span className={`text-gray-400 text-sm pr-2`}>Qnt</span>
                  <ChevronUpIcon className="text-gray-600 w-8 h-8" onClick={() => updateItem(1)} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-gray-600 font-medium text-xl overflow-hidden truncate`}>
                  {item.description}
                </span>
                <div className="flex items-center">
                  <span className={`text-gray-600 text-xl font-medium pr-2`}>{count}</span>
                  <ChevronDownIcon className="text-gray-600 w-8 h-8" onClick={() => updateItem(-1)} />
                </div>
              </div>
            </div>
            <form>
              <div className="flex items-center justify-center gap-4 mt-5">
                <button
                  type="submit"
                  className="rounded focus:outline-none border border-gray-500 text-gray-700 px-2 py-1"
                  onClick={(e) => saveItem(e)}
                >
                  Salvar
                </button>
                <a
                  href="#/"
                  className="rounded focus:outline-none border-red-400 border px-2 py-1
                    bg-red-400 text-gray-50 hover:bg-opacity-80"
                  onClick={(e) => { removeItem(e) }}
                >
                  Remover
                </a>
                <a
                  href="#/"
                  className="rounded focus:outline-none border border-gray-500 text-gray-700 px-2 py-1"
                  onClick={(e) => { e.preventDefault(); closeModal() }}
                >
                  Cancelar
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
