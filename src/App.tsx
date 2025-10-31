import ThemeToggle from './components/ThemeToggle'
import StoryRenderer from './components/StoryRenderer'
import { Button } from './components/ui/Button'
import { useStoryStore } from './store/storyStore'
import MenuAudioLoop from './components/MenuAudioLoop'

function App() {
  const { currentNode, inventory, visited, reset } = useStoryStore()
  const visitedCount = visited.length

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MenuAudioLoop />
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="font-heading text-center text-7xl font-semibold tracking-widest">
          Spooky <span className="text-secondary">Surprise</span>
        </h2>

        <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[2fr_1fr]">
          <StoryRenderer />

          <aside className="space-y-6 rounded-2xl border border-border/80 bg-surface/60 p-6 shadow-inner">
            <section className="space-y-2 text-center">
              <p className="text-xs uppercase tracking-wide text-foreground/60">Current Node</p>
              <p className="font-heading text-2xl text-secondary">{currentNode}</p>
              <Button className="mt-4 w-full py-3 text-base" onClick={reset}>
                Restart Adventure
              </Button>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg uppercase tracking-wide text-foreground/70">Visited</h3>
              <p className="text-sm text-foreground/60">{visitedCount} locations explored</p>
              <ul className="space-y-1 text-sm text-foreground/80">
                {visited.map((nodeId) => (
                  <li key={nodeId} className="rounded bg-background/50 px-3 py-1">
                    {nodeId}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-heading text-lg uppercase tracking-wide text-foreground/70">Inventory</h3>
              {inventory.length === 0 ? (
                <p className="text-sm text-foreground/60">Your pockets are empty—for now.</p>
              ) : (
                <ul className="space-y-1 text-sm text-foreground/80">
                  {inventory.map((item) => (
                    <li key={item} className="rounded bg-background/50 px-3 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </aside>
        </div>

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
