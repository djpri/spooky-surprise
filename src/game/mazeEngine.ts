import { LevelColors } from './mazeLevels'
import type { MazeLevel } from './mazeLevels'

export type MazeEvent =
  | { type: 'start' }
  | { type: 'fail' }
  | { type: 'level-complete'; levelIndex: number }
  | { type: 'game-complete' }

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

export class MazeGameEngine {
  private ctx: CanvasRenderingContext2D
  private levels: MazeLevel[]
  private _current = 0
  private started = false
  private announcedStart = false
  private onEvent?: (ev: MazeEvent) => void

  constructor(ctx: CanvasRenderingContext2D, levels: MazeLevel[], onEvent?: (ev: MazeEvent) => void) {
    this.ctx = ctx
    this.levels = levels
    this.onEvent = onEvent
    this.draw()
  }

  get currentLevelIndex() {
    return this._current
  }

  setLevel(index: number) {
    if (index < 0 || index >= this.levels.length) return
    this._current = index
    this.started = false
    this.announcedStart = false
    this.draw()
  }

  resetLevel() {
    this.started = false
    this.announcedStart = false
    this.draw()
  }

  private draw() {
    const level = this.levels[this._current]
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    level.draw(this.ctx)
  }

  private inRect(x: number, y: number, r: { x: number; y: number; w: number; h: number }) {
    return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h
  }

  private pixelColorAt(x: number, y: number) {
    const d = this.ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data
    return rgbToHex(d[0], d[1], d[2])
  }

  handleMouseMove(x: number, y: number) {
    const level = this.levels[this._current]
    // Set started when cursor is inside start
    if (!this.started && this.inRect(x, y, level.start)) {
      this.started = true
      if (!this.announcedStart) {
        this.announcedStart = true
        this.onEvent?.({ type: 'start' })
      }
    }

    if (!this.started) return

    const color = this.pixelColorAt(x, y)
    if (color === LevelColors.wall) {
      this.started = false
      this.announcedStart = false
      this.onEvent?.({ type: 'fail' })
      return
    }

    if (this.inRect(x, y, level.goal)) {
      if (this._current < this.levels.length - 1) {
        this._current += 1
        this.started = false
        this.announcedStart = false
        this.onEvent?.({ type: 'level-complete', levelIndex: this._current - 1 })
        this.draw()
      } else {
        this.onEvent?.({ type: 'game-complete' })
      }
    }
  }
}
