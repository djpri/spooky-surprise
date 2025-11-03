# Spooky Surprise

An immersive, interactive Halloween adventure game featuring branching narratives, atmospheric audio, and sophisticated visual effects.

## Overview

Spooky Surprise is a text-based interactive fiction experience where players assume the role of a Brichan (guardian/hunter) navigating through a dark fantasy narrative. The game features three distinct story paths (Faith, Reflection, and Corruption), each with unique scenarios, moral dilemmas, dice-based skill checks, and multiple endings determined by player choices.

## Features

### Interactive Story System
- Branching narrative with over 40 story nodes across three main paths
- Dynamic text rendering with personalized player name integration
- Dice-based skill check system (D20 rolls) for critical decisions
- Multiple endings based on player choices and dice outcomes
- Node tracking to prevent circular navigation
- Typewriter text effect for immersive reading experience

### Audio System
- Sophisticated crossfading background music system
- Path-specific musical themes (Faith, Reflection, Corruption)
- Scene-specific audio effects for key story moments
- Typewriter click sounds with randomized pitch variation
- Volume control with real-time adjustment
- Graceful handling of browser autoplay restrictions

### Visual Features

#### Custom Ghost Cursor
- Animated Halloween-themed cursor with smooth following behavior
- Fading trail particle effects
- Hover detection with transparency changes over interactive elements
- Floating and blinking animations
- Automatic adaptation to light and dark themes

#### Dynamic Backgrounds
- 14+ atmospheric background images tied to story progression
- Video background support for menu screens
- Responsive full-screen scaling

#### Theme System
- Light and dark mode support
- System preference detection and auto-switching
- Persistent theme selection via localStorage
- CSS custom properties for consistent theming

### Settings and Persistence
- Sound on/off toggle
- Music volume slider with precise control
- Game reset functionality (preserves user settings)
- localStorage integration for settings persistence

### Hidden Features

#### Maze Mini-Game
- Five progressively difficult maze levels
- Mouse-following gameplay with pixel-perfect collision detection
- Canvas-based rendering
- Desktop-only (requires mouse input and minimum screen size)
- Accessible by clicking "Spooky" in the main title

#### Blue Screen of Death Easter Egg
- Realistic PC crash simulation
- RGB color split glitch effect
- Fullscreen mode with input blocking
- Jump-scare sequence with visual effects
- Accessible by clicking "Surprise" in the main title

## Technology Stack

### Core
- **React 19** - UI framework
- **TypeScript 5** - Type-safe development
- **Vite 7** - Build tool and development server

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **clsx** - Conditional class name utility
- Custom CSS animations for cursor, typewriter, and transitions

### State Management
- **Zustand** - Lightweight state management with localStorage persistence

### Audio
- Web Audio API for advanced audio processing
- Custom audio context management
- Dual-buffer crossfading system for seamless music loops

## Project Structure

```
spooky-surprise/
├── public/
│   └── audio/                    # Public audio assets
├── src/
│   ├── assets/                   # Static resources (audio, fonts, images, videos)
│   ├── components/               # React components (UI, overlays, effects)
│   ├── data/                     # Story content and narrative nodes
│   ├── game/                     # Game logic (maze engine and levels)
│   ├── store/                    # Global state management
│   ├── utils/                    # Helper functions and utilities
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML entry point
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # Documentation
```

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or pnpm package manager
- Modern web browser with Web Audio API support

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

Create a production build:
```bash
npm run build
```

The optimized build will be output to the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Architecture

### State Management

The application uses Zustand for global state management with the following structure:

- `currentNode` - Current story node identifier
- `visited` - Array of visited node identifiers
- `lastRoll` - Most recent dice roll result
- `soundEnabled` - Audio toggle state
- `playerName` - Player's chosen character name
- `volume` - Audio volume level (0-1)
- `currentPath` - Active story path (faith/reflection/corruption)
- `gameStarted` - Game initialization state

State is persisted to localStorage for settings preservation across sessions.

### Story Data Structure

Story nodes follow this structure:

```typescript
interface StoryNode {
  id: string                      // Node identifier and display title
  text: string | ((playerName: string) => string)
  choices?: StoryChoice[]         // Available player actions
  diceCheck?: {                   // Optional skill check
    stat: string                  // Skill being tested
    target: number                // Difficulty class
    success: string               // Node ID on success
    fail: string                  // Node ID on failure
  }
  requiresName?: boolean          // Show name input before choices
  imagePath: string | null        // Background image path
  audioPath?: string              // Scene-specific audio
}
```

### Audio System Architecture

The audio system uses a shared Web Audio API context with:

- **Dual-buffer crossfading** for seamless background music loops
- **Path-specific track switching** based on story progression
- **Separate audio graphs** for background music, scene audio, and sound effects
- **Autoplay policy handling** with user gesture detection

## Browser Compatibility

The application requires a modern browser with support for:
- ES2020+
- Web Audio API
- CSS Grid and Flexbox
- localStorage
- Optional: Fullscreen API (for BSOD Easter egg)

Tested and verified on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Cursor animations** use `requestAnimationFrame` for 60fps performance
- **Trail particles** are created sparingly and auto-removed after 1 second
- **Audio buffers** are reused to minimize memory allocation
- **Canvas rendering** for maze game uses efficient pixel-based collision detection
- **Component memoization** prevents unnecessary re-renders

## Contributing

This project was developed as part of a Halloween hackathon. Contributions, bug reports, and feature requests are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Custom font: Weiss Initialen
- Icon library: FontAwesome
- Audio effects and background music are original compositions
- Background artwork created specifically for this project
