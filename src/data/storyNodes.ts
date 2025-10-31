export interface StoryChoice {
  text: string
  next: string
}

export interface StoryNode {
  id: string
  text: string
  choices?: StoryChoice[]
  diceCheck?: {
    stat: string
    target: number
    success: string
    fail: string
  }
}

export const storyNodes: Record<string, StoryNode> = {
  intro: {
    id: 'intro',
    text:
      'Mist coils around the wrought-iron gates of Blackwood Manor. A distant whistle, like a dying scream, rides the wind. Beyond the bars, the manor waits.',
    choices: [
      { text: 'Push open the creaking gate', next: 'foyer' },
      { text: 'Circle the manor for another way in', next: 'moonlitPath' },
    ],
  },
  foyer: {
    id: 'foyer',
    text:
      'Dust motes swirl in the foyer as the doors slam behind you. Portraits of stern ancestors seem to watch your every move.',
    choices: [
      { text: 'Inspect the flickering candelabra', next: 'secretPassage' },
      { text: 'Call out to see if anyone answers', next: 'whisper' },
    ],
  },
  moonlitPath: {
    id: 'moonlitPath',
    text:
      'A narrow path winds through overgrown hedges. Somewhere in the darkness, an eerie whistle echoes through the night.',
    choices: [
      { text: 'Follow the path toward a faint lantern glow', next: 'lantern' },
      { text: 'Return to the manor gate', next: 'intro' },
    ],
  },
  secretPassage: {
    id: 'secretPassage',
    text:
      'The candelabra clicks, and a hidden panel slides aside to reveal a stairway spiraling down into shadow.',
    diceCheck: {
      stat: 'courage',
      target: 12,
      success: 'cellar',
      fail: 'panic',
    },
  },
  panic: {
    id: 'panic',
    text:
      'Fear clenches your chest. You stumble backward, knocking over a suit of armor. When you catch your breath, the passage has slammed shut.',
    choices: [{ text: 'Gather yourself and explore the foyer again', next: 'foyer' }],
  },
  cellar: {
    id: 'cellar',
    text:
      'The staircase opens into a candlelit cellar lined with dusty bottles. Something glitters beneath an old crate.',
    choices: [
      { text: 'Examine the glittering object', next: 'amulet' },
      { text: 'Retreat back upstairs', next: 'foyer' },
    ],
  },
  amulet: {
    id: 'amulet',
    text:
      'You uncover an obsidian amulet etched with unfamiliar runes. It thrums with cold energy in your palm.',
    choices: [{ text: 'Slip the amulet into your pocket', next: 'cellarReturn' }],
  },
  cellarReturn: {
    id: 'cellarReturn',
    text:
      'The cellar seems darker now, but the amulet glows faintly, guiding your steps. Perhaps it will be useful later.',
    choices: [{ text: 'Head back to the foyer', next: 'foyer' }],
  },
  whisper: {
    id: 'whisper',
    text:
      'Your call echoes upward. For a heartbeat, there is silence—then a whisper answers from the landing: "Why have you come?"',
    choices: [
      { text: 'Dash up the stairs toward the voice', next: 'staircase' },
      { text: 'Flee back outside', next: 'intro' },
    ],
  },
  staircase: {
    id: 'staircase',
    text:
      'Each step groans as you ascend. The whisper curls around you like smoke, leading to a locked door etched with moonlight.',
    diceCheck: {
      stat: 'insight',
      target: 14,
      success: 'moonDoor',
      fail: 'soulLock',
    },
  },
  moonDoor: {
    id: 'moonDoor',
    text:
      'Your intuition guides your hand to a hidden latch. The door swings open, revealing a silver-lit study filled with arcane tomes.',
    choices: [{ text: 'Examine the ancient tomes', next: 'study' }],
  },
  soulLock: {
    id: 'soulLock',
    text:
      'You fumble with the lock, but a chilling force pushes you back. The whisper turns to mocking laughter, and the door seals shut.',
    choices: [{ text: 'Retreat down the stairs', next: 'foyer' }],
  },
  study: {
    id: 'study',
    text:
      'The study hums with power. One tome tells of a lantern that reveals the spirits bound to this manor.',
    choices: [{ text: 'Seek the lantern in the garden', next: 'lantern' }],
  },
  lantern: {
    id: 'lantern',
    text:
      'A lantern glows atop an old pedestal. Its flame burns without fuel, casting long, twisting shadows that drift like spirits.',
    choices: [
      { text: 'Take the lantern', next: 'lanternTaken' },
      { text: 'Leave it untouched and head back', next: 'moonlitPath' },
    ],
  },
  lanternTaken: {
    id: 'lanternTaken',
    text:
      'The lantern feels impossibly light in your hands. Footprints of pale light appear, guiding you back toward the manor doors.',
    choices: [{ text: 'Follow the spectral trail to the manor', next: 'foyer' }],
  },
}
