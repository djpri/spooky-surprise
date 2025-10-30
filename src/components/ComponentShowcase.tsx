import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import { Textarea } from './ui/Textarea'

/**
 * A temporary component to showcase and test UI components from `src/components/ui`.
 * Add it to a page to check styles across multiple components, then remove it.
 */
export function TestComponents() {
  return (
    <div className="container mx-auto max-w-xl space-y-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-8 shadow-lg shadow-emerald-500/10">
      <header className="space-y-2 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-widest text-slate-100">
          UI Component Preview
        </h2>
        <p className="text-sm text-slate-400">
          Temporarily add this component to a page to see component styles from <code>src/components/ui</code>.
        </p>
        <p className="text-xs text-slate-500">
          Located at <code>src/components/ComponentShowcase.tsx</code>. It
          renders sample instances of components from <code>src/components/ui</code>{' '}
          so you can quickly verify their default appearance and theming overrides.
        </p>
      </header>

      <section className="space-y-4">
        <div className="space-x-3">
          <Button>Primary Button</Button>
          <Button className="bg-slate-700 text-slate-100 hover:bg-slate-600">
            Muted Button
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="test-input">Input</Label>
          <Input id="test-input" placeholder="Type something…" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="test-textarea">Textarea</Label>
          <Textarea id="test-textarea" placeholder="Add longer notes…" />
        </div>
      </section>
    </div>
  )
}

export default TestComponents
