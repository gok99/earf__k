import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    alert(value)
  }

  return (
    <>
      <header className="bg-gray-100 px-6 py-4 items-center justify-between">
        <h1 className="text-red-500 font-medium text-lg">EARFUCK</h1>
      </header>
      <div className="flex flex-col gap-6 p-6 items-center flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="instructions" className="font-medium text-gray-800">
            Enter your instructions in brainfuck:
          </label>
          <input
            name="instructions"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded"
          />
          <input
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-color"
          />
        </form>
      </div>
      <footer className="flex bg-gray-100 p-6 sm:justify-between justify-end">
        <p className="text-gray-400 hidden sm:block">
          Built by Gokul, Hyung Woon, Shem and Vignesh for Hack&Roll2022.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-github"
          viewBox="0 0 16 16"
          className="text-gray-400 flex-none hover:text-gray-500 cursor-pointer transition-colors"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </footer>
    </>
  )
}

export default App
