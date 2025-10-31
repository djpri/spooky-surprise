import TestComponents from './components/ComponentShowcase'
import ThemeToggle from './components/ThemeToggle'

function App() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="font-heading text-center text-7xl font-semibold tracking-widest">
          Spooky <span className="text-secondary">Surprise</span>
        </h2>

        <TestComponents />
        <div className="mt-auto w-full pb-8 pt-12">
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
