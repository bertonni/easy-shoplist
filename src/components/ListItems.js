import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useContext, useRef, useState } from "react";
import { ListContext } from "../contexts/ListContext";

export default function ListItems() {

  const { list, updateQuantity } = useContext(ListContext);
  const categorySelect = useRef();
  const [category, setCategory] = useState();

  function getCategoriesOfList() {
    const allCategories = []

    list.forEach((item) => {
      if (allCategories.indexOf(item.category) < 0) allCategories.push(item.category);
    });
    return allCategories;
  }

  function handleCategory() {
    const value = categorySelect.current.value.trim();
    if (value.length === 0) return;
    setCategory(value);
  }


  const categories = getCategoriesOfList();

  return (
    <div className="flex flex-col w-screen px-4">
      <div className="flex flex-col mb-2">
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
      <div className="max-h-116 overflow-auto rounded border-b-4 border-t-4">
        {list.map((item, index) => {
          if (item.category === category || category === "All") {
            return (
              <div key={index} className="flex items-center h-14 gap-2">
                <div className="pl-3 flex flex-col border rounded h-full justify-center flex-grow truncate">
                  <span className="text-gray-400 text-sm">{item.category}</span>
                  <span className="text-gray-600 font-medium">{item.description}</span>
                </div>
                <div className="flex border rounded h-full w-16 items-center flex-row-reverse">
                  <div className="flex flex-col justify-center items-center pr-1">
                    <ChevronUpIcon
                      className="text-gray-500 h-6 w-6"
                      onClick={() => updateQuantity(index, 1)}
                    />
                    <ChevronDownIcon
                      className="text-gray-500 h-6 w-6"
                      onClick={() => updateQuantity(index, (-1))}
                    />
                  </div>
                  <span className="text-2xl px-1 text-gray-500">{item.quantity}</span>
                </div>
              </div>
            )
          } else {
            return null;
          }
        })}
      </div>
    </div>
  )
}
