// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

export default function Item({ description, category, bg }) {
  return (
    <div className={`flex h-12 border rounded items-center flex-grow ${bg} transition duration-300`}>
      <div className={`pl-3 flex flex-col justify-center flex-grow`}>
        <span className="text-xs font-semibold">{category}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}
