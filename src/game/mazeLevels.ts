export type Rect = { x: number; y: number; w: number; h: number }

export type MazeLevel = {
  width: number
  height: number
  start: Rect
  goal: Rect
  // Draws the level. White is wall, black is path.
  draw: (ctx: CanvasRenderingContext2D) => void
}

const COLORS = {
  wall: '#ffffff',
  path: '#000000',
  start: '#00e676',
  goal: '#ff1744',
}

export const LEVEL_SIZE = { width: 800, height: 600 }

function clearAndFill(ctx: CanvasRenderingContext2D, color: string) {
  ctx.save()
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.restore()
}

function drawRects(ctx: CanvasRenderingContext2D, rects: Rect[], color: string) {
  ctx.save()
  ctx.fillStyle = color
  rects.forEach((r) => ctx.fillRect(r.x, r.y, r.w, r.h))
  ctx.restore()
}

// Level definitions: background = wall (white), corridors = path (black)
export const levels: MazeLevel[] = [
  {
    width: LEVEL_SIZE.width,
    height: LEVEL_SIZE.height,
    start: { x: 20, y: 260, w: 80, h: 80 },
    goal: { x: 700, y: 260, w: 80, h: 80 },
    draw: (ctx) => {
      clearAndFill(ctx, COLORS.wall)
      drawRects(
        ctx,
        [
          { x: 0, y: 280, w: 800, h: 40 },
          { x: 600, y: 200, w: 40, h: 120 },
          { x: 400, y: 200, w: 200, h: 40 },
          { x: 400, y: 200, w: 40, h: 200 },
          { x: 440, y: 360, w: 260, h: 40 },
        ],
        COLORS.path
      )
      drawRects(ctx, [{ x: 20, y: 260, w: 80, h: 80 }], COLORS.start)
      drawRects(ctx, [{ x: 700, y: 260, w: 80, h: 80 }], COLORS.goal)
    },
  },
  {
    width: LEVEL_SIZE.width,
    height: LEVEL_SIZE.height,
    start: { x: 30, y: 500, w: 80, h: 70 },
    goal: { x: 690, y: 120, w: 80, h: 30 },
    draw: (ctx) => {
      clearAndFill(ctx, COLORS.wall)
      drawRects(
        ctx,
        [
          { x: 0, y: 520, w: 760, h: 30 },
          { x: 730, y: 120, w: 30, h: 430 },
          { x: 200, y: 120, w: 560, h: 30 },
          { x: 200, y: 120, w: 30, h: 360 },
          { x: 200, y: 450, w: 400, h: 30 },
          { x: 570, y: 280, w: 30, h: 200 },
          { x: 400, y: 280, w: 200, h: 30 },
          { x: 400, y: 150, w: 30, h: 160 },
        ],
        COLORS.path
      )
      drawRects(ctx, [{ x: 30, y: 500, w: 80, h: 70 }], COLORS.start)
      drawRects(ctx, [{ x: 690, y: 40, w: 80, h: 70 }], COLORS.goal)
    },
  },
  {
    width: LEVEL_SIZE.width,
    height: LEVEL_SIZE.height,
    start: { x: 30, y: 40, w: 80, h: 70 },
    goal: { x: 690, y: 500, w: 80, h: 70 },
    draw: (ctx) => {
      clearAndFill(ctx, COLORS.wall)
      drawRects(
        ctx,
        [
          { x: 0, y: 60, w: 760, h: 20 },
          { x: 740, y: 60, w: 20, h: 480 },
          { x: 100, y: 520, w: 660, h: 20 },
          { x: 100, y: 140, w: 20, h: 400 },
          { x: 100, y: 140, w: 540, h: 20 },
          { x: 620, y: 140, w: 20, h: 300 },
          { x: 260, y: 420, w: 380, h: 20 },
          { x: 260, y: 220, w: 20, h: 200 },
          { x: 260, y: 220, w: 260, h: 20 },
          { x: 500, y: 220, w: 20, h: 120 },
        ],
        COLORS.path
      )
      drawRects(ctx, [{ x: 30, y: 40, w: 80, h: 70 }], COLORS.start)
      drawRects(ctx, [{ x: 690, y: 500, w: 80, h: 70 }], COLORS.goal)
    },
  },
  {
    width: LEVEL_SIZE.width,
    height: LEVEL_SIZE.height,
    start: { x: 360, y: 520, w: 80, h: 60 },
    goal: { x: 360, y: 20, w: 80, h: 60 },
    draw: (ctx) => {
      clearAndFill(ctx, COLORS.wall)
      drawRects(
        ctx,
        [
          { x: 380, y: 0, w: 40, h: 540 },
          { x: 140, y: 500, w: 520, h: 40 },
          { x: 140, y: 160, w: 40, h: 380 },
          { x: 140, y: 160, w: 520, h: 40 },
          { x: 620, y: 160, w: 40, h: 260 },
          { x: 300, y: 380, w: 360, h: 40 },
          { x: 300, y: 240, w: 40, h: 140 },
        ],
        COLORS.path
      )
      drawRects(ctx, [{ x: 360, y: 520, w: 80, h: 60 }], COLORS.start)
      drawRects(ctx, [{ x: 360, y: 20, w: 80, h: 60 }], COLORS.goal)
    },
  },
  {
    width: LEVEL_SIZE.width,
    height: LEVEL_SIZE.height,
    start: { x: 20, y: 280, w: 80, h: 40 },
    goal: { x: 700, y: 280, w: 80, h: 40 },
    draw: (ctx) => {
      clearAndFill(ctx, COLORS.wall)
      // Zig-zag thin corridor for precision
      drawRects(
        ctx,
        [
          { x: 0, y: 290, w: 180, h: 20 },
          { x: 160, y: 220, w: 20, h: 90 },
          { x: 160, y: 220, w: 200, h: 20 },
          { x: 340, y: 220, w: 20, h: 120 },
          { x: 200, y: 320, w: 160, h: 20 },
          { x: 200, y: 320, w: 20, h: 120 },
          { x: 200, y: 420, w: 260, h: 20 },
          { x: 440, y: 280, w: 20, h: 160 },
          { x: 440, y: 280, w: 200, h: 20 },
          { x: 620, y: 200, w: 20, h: 100 },
          { x: 520, y: 200, w: 120, h: 20 },
          { x: 520, y: 200, w: 20, h: 110 },
          { x: 520, y: 290, w: 260, h: 20 },
        ],
        COLORS.path
      )
      drawRects(ctx, [{ x: 20, y: 280, w: 80, h: 40 }], COLORS.start)
      drawRects(ctx, [{ x: 700, y: 280, w: 80, h: 40 }], COLORS.goal)
    },
  },
]

export const LevelColors = COLORS
