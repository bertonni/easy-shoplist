export default function ModalAddItem({ searchedValue, categories }) {

  function handleSubmit(e) {

  }
  return (
    <>
      <div className="bg-black bg-opacity-50 z-20 absolute -top-20 -left-0 h-screen w-screen" />
      <div className="flex justify-center">
        <div className="z-30 bg-gray-50 absolute top-7 px-4 py-4 rounded">
          <h1 className="text-center text-xl font-medium">Novo Item</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
            <label htmlFor="description" className="text-gray-500">Item</label>
            <input
              type="text"
              id="description"
              name="description"
              className="focus:outline-none h-10 pl-2 border rounded w-full"
              defaultValue={searchedValue}
            />
            <div className="flex flex-col w-full">
              <label htmlFor="category" className="text-gray-500">
                Selecione a Categoria
              </label>
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
            <input
              type="submit"
              value="Adicionar"
              className="px-4 py-2 bg-green-500 text-white hover:opacity-80 rounded"
            />
          </form>
        </div>
      </div>
    </>
  )
}
