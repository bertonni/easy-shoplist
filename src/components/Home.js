// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";
import { ListContext } from "../contexts/ListContext";

export default function Home() {

  const { list, addSubtotal } = useContext(ListContext);
  const [started, setStarted] = useState(false);
  const [subtotal, setSubtotal] = useState(getSubtotal());

  const buttonBg = started ? 'bg-red-400' : 'bg-blue-400';

  const toggleStartShopping = () => {
    setStarted(!started);
  }

  function getSubtotal() {
    let total = 0;
    list.forEach(item => {
      total += item.subtotal;
    });
    return total;
  }

  function formatValue(value) {
    let val;
    switch(value.length) {
      case 1:
        val = `0,0${value}`;
        break;
      case 2:
        val = `0,${value}`;
        break;
      case 3:
        val = `${value[0]},${value[1]}${value[2]}`;
        break;
        default:
        val = `${value[0]}${value[1]},${value[2]}${value[3]}`;
        break;
    }
    
    return val;
  }

  function calculateSubtotal(e, item) {
    const value = e.target.value;
    const index = list.findIndex(val => val.description === item.description);
    if (value.length === 0) return;
    
    let onlyNumbers = value;
    if (value.indexOf(',') !== -1) {
      const [real, cent] = value.split(',');
      onlyNumbers = real + cent;
    }

    const formattedValue = formatValue(onlyNumbers);

    const [real, cents] = formattedValue.split(',');

    const val = Number(real) + Number(cents)/100;

    item.subtotal = val;
    addSubtotal(index, item);

    setSubtotal(getSubtotal());
    e.target.value = formattedValue;
  }
  
  return (
    <nav className="flex flex-col gap-2 items-center justify-center">
      {/* <h1>Home page</h1> */}
      <button className={`rounded border-none text-white px-4 py-2
        ${buttonBg} hover:opacity-80 focus:outline-none mt-6`}
        onClick={toggleStartShopping}
      >
        {started &&
          <>Finish Shopping</>
        }
        {!started &&
          <>Start Shopping</>
        }
      </button>

      {started &&
        <>
          <div className="max-h-116 w-full px-4 overflow-auto rounded border-b-4 border-t-4">
            {list.map((item, index) => {
              return (
                <div key={index} className="flex items-center h-14 gap-2">
                  <div className="pl-3 flex flex-col border rounded h-full justify-center flex-grow truncate">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">{item.category}</span>
                      <span className="text-gray-400 text-sm pr-2">Qnt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">{item.description}</span>
                      <span className="text-gray-600 font-medium pr-2 text-lg">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex border rounded h-full w-14 items-center flex-row-reverse">
                    <input
                      type="text"
                      placeholder="Price"
                      defaultValue={item.subtotal === 0 ? "" : item.subtotal.toFixed(2).toString().replace('.', ',')}
                      className="w-full h-full px-2"
                      onBlur={(e) => calculateSubtotal(e, item)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center mt-2 gap-3">
            <span className="font-medium">SubTotal:</span>
            <span className="text-gray-400 font-semibold">R$ {subtotal.toFixed(2)}</span>
          </div>
        </>
      }
    </nav>
  )
}
