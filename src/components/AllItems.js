// import { PlusIcon } from "@heroicons/react/outline";
import { MinusIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import { useContext, useRef, useState } from "react";
import { ListContext } from "../contexts/ListContext";

export default function AllItems() {
  const searchInput = useRef();
  const categorySelect = useRef();

  const [notFound, setNotFound] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');
  const [category, setCategory] = useState('');

  const { items, list, updateList, clearList } = useContext(ListContext);
  
  const categories = ["Fruits", "Vegetables", "Health & Beauty/Personal Care", "Bread & Bakery", "Beverages", "Grains, Pasta & Sides", "Breakfast & Cereal", "Cleaning Supplies", "Condiments/Spices & Bake", "Canned Goods", "Miscellaneous", "Cookies, Snacks & Candy", "Meat & Seafood", "Sauce", "Beer, Wine & Spirits", "Baby", "Dairy, Eggs & Cheese", "Pet Care"];
  
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
    const result = items.filter(item => item.description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);

    if (result.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }

  function clearSearchInput() {
    setSearchedValue('');
    searchInput.current.value = '';
  }

  return (
    <div className="px-4 flex flex-col justify-center mt-3">
      <div className="flex flex-col my-2">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div className="flex flex-col">
            <label htmlFor="category" className="text-gray-500">Select the Category</label>
            <select
              ref={categorySelect}
              name="category"
              id="category"
              className="h-10 rounded w-full border pl-2 text-gray-500"
              onChange={() => handleCategory()}
            >
              <option value="default">Select</option>
              <option value="All">All Categories</option>
              {categories.map((category, index) => {
                return (
                  <option className="h-8 text-gray-500" key={index + 1234} value={category}>{category}</option>
                )
              })}
            </select>
          </div>
          <button className="text-sm px-4 py-1 border rounded focus:outline-none 
          bg-red-600 text-white hover:opacity-80"
            onClick={() => clearList()}
          >
            Clear List
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Total items in your list:</span>
          <span className="font-semibold text-lg text-gray-600">{list.length}</span>
        </div>
        <div className="flex items-center mt-1 mb-3 w-full relative">
          <input
            ref={searchInput}
            type="text"
            autoComplete="off"
            placeholder="Search for an item"
            className="focus:outline-none h-10 pl-2 border rounded w-full"
            onKeyUp={() => handleSearch()}
          />
          <XIcon
            className="absolute right-3 h-6 w-6 text-gray-600"
            onClick={() => clearSearchInput()}
          />
        </div>
        {notFound && searchedValue.length !== 0 &&
          <span className="mb-2 text-sm text-center text-gray-400">Item not found</span>
        } 
        <div id="items" className="max-h-120 overflow-auto rounded border-b-4 border-t-4">
          {items.map((item, index) => {

            const itemDescription = item.description;
            const itemCategory = item.category;

            const idx = list.findIndex(val => val.description === itemDescription);

            const icon = idx !== -1 ? true : false;
            const bg = idx !== -1 ? "bg-gray-500 text-white" : "text-gray-600";
            const textCategory = idx !== -1 ? "text-gray-100" : "text-gray-400";
            const bgIcon = idx !== -1 ? "bg-red-300" : "bg-green-300";
            const newItem = {...item, quantity: 0, subtotal: 0};

            if ((itemCategory === category && searchedValue.length === 0) ||
                (category === "All" && searchedValue.length === 0) ||
              (itemDescription.toLowerCase().indexOf(searchedValue) !== -1 && searchedValue.length !== 0)
            ) {
              return (
                <div key={index} className="flex h-14 gap-2">
                  <div className={`pl-2 flex flex-col justify-center border rounded flex-grow ${bg} transition duration-300`}>
                    <span className={`text-sm ${textCategory}`}>{itemCategory}</span>
                    <span className="font-medium">{itemDescription}</span>
                  </div>
                  <div className={`flex items-center justify-center px-3 cursor-pointer
                    ${bgIcon} rounded border`}
                    onClick={() => updateList(newItem)}
                  >
                    {icon &&
                      <MinusIcon className="animate-rotate-180 h-6 w-6" />
                    }
                    {!icon &&
                      <PlusIcon className="animate-rotate-90 h-6 w-6" />
                    }
                  </div>
                </div>
              )
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  )
}
