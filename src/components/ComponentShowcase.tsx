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
    <div className="container mx-auto max-w-xl space-y-8 rounded-2xl border border-border/80 bg-surface/80 p-8 shadow-lg shadow-primary/15">
      <header className="space-y-2 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-widest text-foreground">
          UI Component Preview
        </h2>
        <p className="text-sm text-foreground/80">
          Temporarily add this component to a page to see component styles from <code>src/components/ui</code>.
        </p>
        <p className="text-xs text-foreground/70">
          Located at <code>src/components/ComponentShowcase.tsx</code>. It
          renders sample instances of components from <code>src/components/ui</code>{' '}
          so you can quickly verify their default appearance and theming overrides.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button>Primary Button</Button>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Secondary Button
          </Button>
          <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
            Tertiary Button
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
