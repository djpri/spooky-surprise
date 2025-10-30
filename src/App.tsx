import { useState } from 'react'
import reactLogo from './assets/images/react.svg'
import viteLogo from '/vite.svg'
import TestComponents from "./components/ComponentShowcase"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex items-center gap-10">
          <a href="https://vite.dev" target="_blank">
            <img
              src={viteLogo}
              className="logo h-24 w-24 transition-transform hover:-translate-y-1"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="logo react h-24 w-24 transition-transform hover:-translate-y-1"
              alt="React logo"
            />
          </a>
        </div>
        <h2 className="font-heading text-center text-7xl font-semibold tracking-widest">
          Spooky <span className="text-red-700">Surprise</span>
        </h2>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 px-10 py-8 shadow-lg shadow-emerald-500/10">
          <button
            className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-medium text-slate-950 shadow transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p className="text-sm text-slate-400">
            Edit <code className="font-mono text-emerald-400">src/App.tsx</code>{' '}
            and save to test HMR
          </p>
        </div>
        <TestComponents />
      </main>
    </div>
  )
}

export default App
