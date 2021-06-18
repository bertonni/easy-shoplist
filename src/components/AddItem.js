import { useContext, useEffect } from "react";
import { ListContext } from "../contexts/ListContext";
import AllItems from "./AllItems";

export default function AddItem() {

  const { handleActivePage } = useContext(ListContext);

  useEffect(() => {
    handleActivePage('add');
  }, [handleActivePage])
  
  return (
    <div className="flex flex-col">
      <AllItems />
    </div>
  )
}
