export default function ModalInsertItem({ updateList, categories, description, closeModal }) {

  let desc = description.charAt(0).toUpperCase() + description.slice(1);

  function handleSubmit(e) {
    e.preventDefault();
    
    const newItem = {
      description: e.target.description.value,
      category: e.target.category.value,
      quantity: Number(e.target.quantity.value),
      price: 0,
    }

    updateList(newItem, 'newItem');
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
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500">Item:</label>
                  <input type="text"
                    defaultValue={desc}
                    name="description"
                    className="rounded px-2 border h-10 w-full"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm text-gray-500">Quantidade:</label>
                  <input type="number"
                    name="quantity"
                    required
                    className="rounded px-2 border h-10 w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full mt-2">
                <label className="text-sm text-gray-500">Categoria:</label>
                <select
                  name="category"
                  id="category"
                  className="h-10 rounded w-full border pl-2 text-gray-500"
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
              </div>
              <div className="flex items-center justify-center gap-4 mt-3">
                <button
                  type="submit"
                  className="rounded focus:outline-none border border-gray-500 text-gray-700 px-4 py-2"
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
