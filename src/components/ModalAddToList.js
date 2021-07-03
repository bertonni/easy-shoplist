import { useState } from "react"

export default function ModalAddToList({ item, updateList, closeModal }) {
  const [count, setCount] = useState(0);

  function saveItem(e) {
    e.preventDefault();
    item['quantity'] = Number(count);
    item['price'] = 0;
    updateList(item);
    closeModal();
  }

  return (
    <>
      <div className="bg-black bg-opacity-50 z-20 absolute -top-20 -left-0 h-screen w-screen"
        onClick={() => closeModal()}
      />
      <div className="flex justify-center">
        <div className="flex flex-col z-30 bg-gray-50 absolute top-7 px-4 py-4 rounded w-11/12">
          <h1 className="text-center text-xl font-medium my-2 text-gray-700">Selecione a quantidade</h1>
          <div className="flex flex-col gap-2">
            <form>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Item:</span>
                <span className="">{item.description}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Categoria:</span>
                <span className="">{item.category}</span>
              </div>
              <input
                type="number"
                autoFocus
                className="rounded px-2 border h-10 w-full"
                placeholder="Digite a quantidade"
                onChange={(e) => setCount(e.target.value)}
              />
              <div className="flex items-center justify-center gap-4 mt-3">
                <button
                  type="submit"
                  className="rounded focus:outline-none border border-gray-500 text-gray-700 px-4 py-2"
                  onClick={(e) => saveItem(e)}
                >
                  Salvar
                </button>
                <a
                  href="#/"
                  className="rounded focus:outline-none border border-gray-500 text-gray-700 px-4 py-2"
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
