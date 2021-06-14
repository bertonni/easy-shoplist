export default function List({ list, handleCurrList, index, currList }) {

  const bg = list[1] === currList ? "bg-yellow-400 hover:bg-opacity-70" : "hover:bg-gray-50";
  return (
    <div
      className={`flex items-center justify-center h-11 border rounded w-20 px-3 
        flex-grow cursor-pointer ${bg}`}
      onClick={() => handleCurrList(index)}
    >
      {list[1]}
    </div>
  )
}
