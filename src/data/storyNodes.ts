export interface StoryChoice {
  text: string;
  next: string;
}

export interface StoryNode {
  id: string;
  text: string | ((playerName: string) => string);
  choices?: StoryChoice[];
  diceCheck?: {
    stat: string;
    target: number;
    success: string;
    fail: string;
  };
  requiresName?: boolean;
  imagePath: string | null;
}

const bgImages = import.meta.glob("../assets/images/background/*", { eager: true, import: "default" }) as Record<string, string>;
console.log("bgImages:", bgImages)
export const storyNodes: Record<string, StoryNode> = {
  Neamh: {
    id: "Prologue 1 - The Chapel",
    text: "You wake to the creak of settling stone. The chapel breathes — a long, slow inhale as dust drifts through angled light. Moss has claimed the pews; candles gutter in half-melted sconces, their flames trembling as the dimensions slide into alignment.",
    choices: [
      {
        text: "Gather yourself and inhale the quiet",
        next: "Muir",
      },
    ],
    imagePath: null,
  },
  Muir: {
    id: "Prologue 2 - Their Name",
    text: "You stand in the hush between worlds, memory hanging just out of reach. The voice that calls you isn’t from above or below — it comes from within, threaded through the pulse of light under your skin. You remember the creed, the burden, the endless hunt… but not your name. That part was left behind in the last turning of the Veil. The world will not know you until you speak it again. Who are you, Brichan?",
    requiresName: true,
    choices: [
      {
        text: "Align the lenses and sweep for the anchor",
        next: "Talamh",
      },
    ],
    // SAMPLE TEST IMAGE
    // imagePath: null, 
    imagePath: bgImages["../assets/images/background/Muir.jpg"],
  },
  Talamh: {
    id: "moonlitPath",
    text: "The whisper fades, I am PLAYERNAME, leaving only the sound of stone settling and the pulse in your veins. Something tugs at you — faint, magnetic, inevitable. Beneath the altar, half-buried in moss and wax, lies the shape you’ve known longer than your own face.",
    choices: [
      {
        text: "Answer the whispers and bargain for knowledge",
        next: "lantern",
      },
      { text: "Shake free of the voices and refocus", next: "intro" },
    ],
    imagePath: null,
  },
  secretPassage: {
    id: "secretPassage",
    text: "The aligned lenses flare. Neamh burns bright, Muir ripples, and Talamh drinks in the dark. A stained altar cracks open, revealing a stair that descends into the ossuary beneath. The corruption recoils, but it clings to something below.",
    diceCheck: {
      stat: "fortitude",
      target: 12,
      success: "cellar",
      fail: "panic",
    },
    imagePath: null,
  },
  panic: {
    id: "panic",
    text: "The lens flares sear across your palm. The veins beneath your skin blaze too hot, and the corruption surges toward your heart. You stagger back, the stair sealing with a slam. You cannot descend until you master the burning light.",
    choices: [
      {
        text: "Steady your breath and survey the narthex once more",
        next: "foyer",
      },
    ],
    imagePath: null,
  },
  cellar: {
    id: "cellar",
    text: "Bones of alder roots twist through the ceiling, dripping with crimson resin. The air is wet and electric. An anchor hangs above a pyre basin: a tarnished censer, pulsing with stolen breaths. Spirits circle it like moths to a wound.",
    choices: [
      { text: "Focus the lenses on the censer", next: "amulet" },
      {
        text: "Retreat and regroup before confronting it",
        next: "foyer",
      },
    ],
    imagePath: null,
  },
  amulet: {
    id: "amulet",
    text: "Neamh strikes first, searing the outer shell. Muir follows, revealing faces trapped within the smoke. Talamh clamps shut, devouring the corruption and channeling it into your veins. It leaves behind a shard of tempered glass etched with the three rings--a token of service and a warning of your limits.",
    choices: [
      {
        text: "Absorb the shard and prepare to ascend",
        next: "cellarReturn",
      },
    ],
    imagePath: null,
  },
  cellarReturn: {
    id: "cellarReturn",
    text: "The censer is silent, yet the shard hums in your grasp. Each pulse tightens the web of dark lines beneath your skin. Above, the chapel waits with more anchors to break.",
    choices: [{ text: "Return to the narthex", next: "foyer" }],
    imagePath: null,
  },
  whisper: {
    id: "whisper",
    text: 'Your voice echoes through the vaulted ceiling, and the answer comes at once: a chorus of former Brichan, their words carried on candle smoke. "Neamh begins. Muir reveals. Talamh ends. Remember the order or be devoured." A final whisper adds, almost kindly, "The lens remembers your first failure."',
    choices: [
      {
        text: "Sprint toward the bell tower to confront the echo",
        next: "staircase",
      },
      { text: "Bow in thanks and steady your focus", next: "intro" },
    ],
    imagePath: null,
  },
  staircase: {
    id: "staircase",
    text: "You ascend the spiral stairs, mirrors flashing with fragments of other worlds. At the top stands the bell tower door, sealed by strands of shadow silk. The corruption here is clever, mimicking the motions of the lens.",
    diceCheck: {
      stat: "insight",
      target: 14,
      success: "moonDoor",
      fail: "soulLock",
    },
    imagePath: null,
  },
  moonDoor: {
    id: "moonDoor",
    text: "You align the rings in perfect rhythm. Neamh, Muir, Talamh. The strands shriek and dissolve, revealing a bell chamber washed in lunar light. An altar holds a ledger of Brichan vows, and beside it lies a mirror draped in pyre ash.",
    choices: [
      { text: "Read the ledger and heed its warning", next: "study" },
    ],
    imagePath: null,
  },
  soulLock: {
    id: "soulLock",
    text: "The strands lash your arm. The corruption flares past your control, and for a heartbeat you see the hellscape pressing against Alderthorn--a sky of teeth, a field of broken mirrors. The door seals, saving you from being pulled across the Veil.",
    choices: [
      {
        text: "Retreat before the corruption consumes you",
        next: "foyer",
      },
    ],
    imagePath: null,
  },
  study: {
    id: "study",
    text: "The ledger lists names burned away by duty. Margins describe the lens rings: Neamh the Breath of Heaven, Muir the Mirror Sea, Talamh the Root Flame. A final entry speaks of a lantern forged from three mirrors--your next anchor to sever.",
    choices: [
      {
        text: "Follow the ledger's guidance toward the garden pyres",
        next: "lantern",
      },
    ],
    imagePath: null,
  },
  lantern: {
    id: "lantern",
    text: "In the garden cloister, a lantern formed of concentric mirrors floats above a cold brazier. Pyre mirrors around it have gone dark--no candles remain to hold the Veil at bay. The lantern flickers with stolen souls.",
    choices: [
      {
        text: "Align the lenses and draw the corruption into yourself",
        next: "lanternTaken",
      },
      {
        text: "Step away and let the lantern hang for now",
        next: "intro",
      },
    ],
    imagePath: null,
  },
  lanternTaken: {
    id: "lanternTaken",
    text: "The three rings harmonize. Neamh blazes, Muir reveals the faces trapped within, and Talamh devours the remainder. The lantern collapses into a single ember that brands your palm. Alderthorn is safer--for this night. The veins beneath your skin darken, a reminder of how close you stand to the abyss.",
    choices: [
      { text: "Let the ember guide you back inside", next: "foyer" },
    ],
    imagePath: null,
  },
};
