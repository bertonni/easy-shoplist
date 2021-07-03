// import { PlusIcon } from "@heroicons/react/outline";
import { MinusIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { useList } from "../hooks/useList";
import ModalAddToList from "./ModalAddToList";
import ModalInsertItem from "./ModalInsertItem";

export default function AllItems() {
  const searchInput = useRef();
  const categorySelect = useRef();

  const [notFound, setNotFound] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');
  const [category, setCategory] = useState('default');
  const [showAddItemModal, setShowAddItemModal] = useState([]);
  const [showInsertItemModal, setShowInsertItemModal] = useState(false);

  const [showSelectCategory, setShowSelectCategory] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const { items, list, updateList, clearList } = useList();

  const categories = ["Frutas", "Vegetais", "Cuidado Pessoal/Beleza", "Pães e Bolos",
    "Bebidas", "Grãos, Massas e Acomp.", "Café da Manhã e Cereais", "Produtos de Limpeza",
    "Condimentos/Tempêros", "Enlatados", "Itens Diversos", "Biscoitos, Lanches e Doces",
    "Carnes e Frutos do Mar", "Molhos", "Cerveja, Vinho e Destilados", "Bebê", "Laticínios, Ovos e Queijos", "Produtos Pet"];

  function handleCategory() {
    const value = categorySelect.current.value.trim();
    if (value.length === 0) return;
    setCategory(value);
  }

  function handleSearch() {
    const searchValue = searchInput.current.value;
    if (searchValue.trim().length === 0) {
      setSearchedValue('');
      setNotFound(false);
      return;
    }
    setSearchedValue(searchValue.toLowerCase());
    const result = items.filter(item =>
      item.description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );

    if (result.length === 0) setNotFound(true);
    else setNotFound(false);
  }

  function clearSearchInput() {
    setSearchedValue('');
    searchInput.current.value = '';
  }

  function closeModal() {
    setShowAddItemModal([]);
    setShowInsertItemModal(false);
  }

  function handleChoice(choice) {
    if (choice === "category") {
      setShowSelectCategory(true);
      setShowSearchInput(false);
      setSearchedValue('');
    } else {
      setShowSearchInput(true);
      setShowSelectCategory(false);
      setCategory('default');
    }
  }

  let bgCategory = '';
  let bgSearch = '';

  if (showSelectCategory) {
    bgCategory = 'bg-gray-500 text-gray-50';
  }
  if (showSearchInput) {
    bgSearch = 'bg-gray-500 text-gray-50';
  }

  return (
    <div className="px-4 flex flex-col justify-center mt-3 relative">
      {showAddItemModal.length !== 0 &&
        <ModalAddToList
          item={showAddItemModal}
          updateList={updateList}
          categories={categories}
          closeModal={closeModal}
        />
      }
      {showInsertItemModal &&
        <ModalInsertItem
          updateList={updateList}
          categories={categories}
          description={searchedValue}
          closeModal={closeModal}
        />
      }
      <div className="flex items-center justify-between gap-2 mb-2">
        <button className={`px-4 py-2 border rounded focus:outline-none
          hover:opacity-80 transition duration-300 ${bgCategory}`}
          onClick={() => { handleChoice('category') }}
        >
          Categoria
        </button>
        <button className={`px-4 py-2 border rounded focus:outline-none
          hover:opacity-80 transition duration-300 ${bgSearch}`}
          onClick={() => { handleChoice('search') }}
        >
          Buscar Item
        </button>
      </div>
      <div className="flex items-center mb-2 gap-1 justify-between">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-gray-400 text-sm">Items na sua lista:</span>
          <span className="font-semibold text-right text-lg text-gray-600">{list.length}</span>
        </div>
        {list.length > 0 &&
          <button className="text-sm px-1 rounded focus:outline-none 
            bg-red-400 text-white hover:opacity-80"
            onClick={() => clearList()}
          >
            Limpar Lista
          </button>
        }
      </div>
      {showSelectCategory &&
        <div className="flex flex-col w-full">
          <select
            ref={categorySelect}
            name="category"
            id="category"
            className="h-10 rounded w-full border pl-2 text-gray-500"
            onChange={() => handleCategory()}
          >
            <option value="default">Selecione</option>
            <option value="All">Todas as Categorias</option>
            {categories.map((category, index) => {
              return (
                <option
                  key={index + 1234}
                  className="h-8 text-gray-500"
                  value={category}
                >
                  {category}
                </option>
              )
            })}
          </select>
        </div>}
      {/* <span className="text-center py-2">Ou</span> */}
      {showSearchInput &&
        <div className="flex items-center mb-3 w-full relative">
          <input
            ref={searchInput}
            type="text"
            autoComplete="off"
            placeholder="Procure por um item"
            className="focus:outline-none h-10 pl-2 border rounded w-full"
            onKeyUp={() => handleSearch()}
          />
          <XIcon
            className="absolute right-1 h-8 w-8 text-gray-600"
            onClick={() => clearSearchInput()}
          />
        </div>}
      {notFound && searchedValue.length !== 0 &&
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-sm text-center text-gray-400">Item não encontrado</span>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:opacity-80"
            onClick={() => setShowInsertItemModal(true)}
          >Adicionar</button>
        </div>
      }
      {(searchedValue.length > 0 || category !== "default") &&
        <div id="items" className="max-h-120 overflow-auto rounded mt-4 border-b-4 border-t-4">
          {items.map((item, index) => {

            const itemDescription = item.description;
            const itemCategory = item.category;

            const idx = list.findIndex(val => val.description === itemDescription);

            const icon = idx !== -1 ? true : false;
            const bg = idx !== -1 ? "bg-gray-500 text-white" : "text-gray-600";
            const textCategory = idx !== -1 ? "text-gray-100" : "text-gray-400";
            const bgIcon = idx !== -1 ? "bg-red-300" : "bg-green-300";
            const hasFound = itemDescription.toLowerCase().indexOf(searchedValue) !== -1;

            if ((hasFound && (itemCategory === category || category === "All")) ||
              (hasFound && searchedValue.length > 0)
            ) {
              return (
                <div key={index} className="flex h-14 gap-2">
                  <div className={`pl-2 flex flex-col justify-center border rounded flex-grow ${bg} transition duration-300`}>
                    <span className={`text-sm ${textCategory}`}>{itemCategory}</span>
                    <span className="font-medium text-sm">{itemDescription}</span>
                  </div>
                  <div className={`flex items-center justify-center cursor-pointer
                    ${bgIcon} rounded border px-1`}
                  >
                    {icon &&
                      <MinusIcon
                        className="animate-rotate-180 text-gray-700 h-9 w-9"
                        onClick={() => updateList(item)}
                      />
                    }
                    {!icon &&
                      <PlusIcon
                        className="animate-rotate-90 text-gray-700 h-9 w-9"
                        onClick={() => setShowAddItemModal(item)}
                      />
                    }
                  </div>
                </div>
              )
            } else {
              return null;
            }
          })}
        </div>}
    </div>
  )
}
