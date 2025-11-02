/* AUTO-GENERATED. Do not edit by hand. */
import type { StoryNode } from './storyNodes';

export const generatedStoryNodes: Record<string, StoryNode> = {
  "challenge-maerwyn": {
    id: "What Do You Truly Believe?",
    text: "Sister Maerwyn stands motionless for a long moment. Around you, the chapel seems to hold its breath.\n\n\"You're not supposed to ask that,\" she finally whispers.\n\n\"But you've wondered,\" you say. It's not a question.\n\nHer reflection moves a half-second late, and you realize: it's not a reflection. It's something *wearing* her reflection, listening from that in-between space. The Veil-Touched begin to gather at the edges of the pyre fields, drawn by doubt like moths to a wavering flame.\n\n\"The pyres hold,\" Sister Maerwyn says, but the conviction is gone. \"They must hold. Because if they don't...\"\n\nShe doesn't finish. She doesn't need to. The implication hangs in the Chapel's dimness: if the pyres are faith without foundation, then everything built on that faith collapses. The villagers' safety, your purpose, the annual Hunt itself—all of it revealed as *negotiation with hunger* rather than *sacred protection*.\n\n\"The choice is still yours,\" she says finally. \"Light the pyres and let the machinery continue. Or refuse, and face what happens when the machine stops.\"\n\nShe steps back. The Veil-Touched press closer.\n\nYou hold the lens. Its three rings—Nèamh, Muir, Talamh—pulse with expectation.\n\nWhat do you choose: the faith that holds, or the truth that breaks it?\n",
    
    
    choices: [{"text":"Proceed with the pyres despite her doubt","next":"faith__village_at_dusk__faith_hardened_by_doubt"},{"text":"Refuse the pyres; speak the doubt aloud","next":"faith__village_at_dusk__refuse_pyres"}],
    imagePath: null,
  },
  "corruption__ashen_bride__accept_ring": {
    id: "Accept the Bride’s Ring",
    text: "Ash and lace tighten at your wrist. Two pulses in one vein.\n",
    
    diceCheck: {"stat":"will","target":14,"success":"corruption__ashen_bride__gnostic_wedding","fail":"corruption__ashen_bride__reflection_binds"},
    
    imagePath: null,
  },
  "corruption__ashen_bride__ashen_bride": {
    id: "The Ashen Bride",
    text: "She offers a ring braided from hair and wick‑thread. If worn, your reflection answers to her before it answers to you. The veil she wears is not cloth but breath: ash settling, rising, settling again.\n\nHer eyes are the color of extinguished incense. “This is not slavery,” she says, “it is grammar. We will decide together where the sentence ends.” When she smiles you feel your pulse double, as if your heart were practicing for a duet.\n",
    
    
    choices: [{"text":"Accept the Ring","next":"corruption__ashen_bride__accept_ring"},{"text":"Refuse the Ring","next":"corruption__ashen_bride__refuse_ring"},{"text":"Bargain the Terms","next":"corruption__ashen_bride__bargain_ring"}],
    imagePath: null,
  },
  "corruption__ashen_bride__bargain_ring": {
    id: "Bargain the Terms",
    text: "You name a price. She names a boundary. The mirror waits.\n",
    
    diceCheck: {"stat":"insight","target":15,"success":"corruption__ashen_bride__earned_balance","fail":"corruption__ashen_bride__refuse_ring"},
    
    imagePath: null,
  },
  "corruption__ashen_bride__earned_balance": {
    id: "Ending — Earned Balance (Integration without Surrender)",
    text: "You keep your name. The Bride nods once and looks away. Candles neither lean nor flee.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__ashen_bride__gnostic_wedding": {
    id: "Ending — Gnostic Wedding (Integration Variant)",
    text: "Union brings comprehension and constraint. The Veil rests; freedom narrows.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__ashen_bride__reflection_binds": {
    id: "Ending — Reflection Binds to Her (Loss of Autonomy)",
    text: "Your reflection looks to her before it looks to you.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__ashen_bride__refuse_ring": {
    id: "Ending — She Withholds Aid (Hard Path)",
    text: "You lower your hand. Frost forms on nearby glass.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__beneath_the_altar__abyssal_power": {
    id: "Ending — Gain Power, Lose Humanity (Abyssal)",
    text: "Light burns black‑violet. Doors open when you do not ask.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__beneath_the_altar__balance": {
    id: "Ending — Achieve Balance (True Victory)",
    text: "The triad holds. The world is safer. You are less yourself.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__beneath_the_altar__bind": {
    id: "Bind the Spirit",
    text: "You draw the circle twice and say the name once. The roots above you tense. The spirit tests the circle and finds it holds. “All right,” it whispers, almost relieved. “But you keep the key where I can see it.”\n",
    
    diceCheck: {"stat":"ritual","target":15,"success":"corruption__beneath_the_altar__balance","fail":"corruption__beneath_the_altar__inner_torment"},
    
    imagePath: "/backgrounds/soulLock.jpg",
  },
  "corruption__beneath_the_altar__bound_spirit": {
    id: "Beneath the Altar — The Bound Spirit",
    text: "A tarnished censer pulses with stolen breaths. Spirits circle it like moths to a wound. Each pass leaves a thread of light snagged on the brass like a web. The bindings are not only ritual — they are habit, the most dangerous kind.\n\nWhen you lift the lens, Talamh pulls at your wrist, eager to resolve the knot. Muir shows you the moment the spirit was taken — a hand you almost recognize, a debt you thought you’d paid. Nèamh brightens, promising a clean end that might not be the right one.\n",
    
    
    choices: [{"text":"Devour It","next":"corruption__beneath_the_altar__devour"},{"text":"Free It","next":"corruption__beneath_the_altar__free"},{"text":"Bind It","next":"corruption__beneath_the_altar__bind"}],
    imagePath: "/backgrounds/cellar.jpg",
  },
  "corruption__beneath_the_altar__devour": {
    id: "Devour the Spirit",
    text: "You open the inner ring. Hunger answers. The air snaps cold, then hot; the bindings twitch like veins waking from sleep. You taste iron and old prayers. If you keep going, there won’t be any left to say.\n",
    
    diceCheck: {"stat":"will","target":14,"success":"corruption__beneath_the_altar__new_god","fail":"corruption__beneath_the_altar__abyssal_power"},
    
    imagePath: null,
  },
  "corruption__beneath_the_altar__free": {
    id: "Free the Spirit",
    text: "You loosen the bindings. The censer sighs. The spirit expands like a breath held too long, touching every root, every stone. Gratitude brushes your cheek — and then something larger inhales from the dark beyond the wall.\n",
    
    diceCheck: {"stat":"mercy","target":12,"success":"corruption__beneath_the_altar__veil_weakens","fail":"corruption__beneath_the_altar__spirit_betrays"},
    
    imagePath: null,
  },
  "corruption__beneath_the_altar__inner_torment": {
    id: "Ending — It Whispers Madness (Inner Torment)",
    text: "Bound power bleeds into thought. Your shadow moves its lips when you don’t.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__beneath_the_altar__new_god": {
    id: "Ending — Merge With the Spirit (New God)",
    text: "You and the bound spirit share one will. Birds stop mid‑flight when you exhale.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__beneath_the_altar__spirit_betrays": {
    id: "Ending — The Spirit Betrays You (Despair)",
    text: "Kindness opens the door. Hunger walks through wearing your name.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__beneath_the_altar__veil_weakens": {
    id: "Ending — The Veil Weakens (World Fracture)",
    text: "Fractures spread moth‑quiet. Doors refuse to stay closed.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__descent_into_rootdeep__final_trial": {
    id: "The Descent into Rootdeep — Final Trial",
    text: "Steps echo in a throat that used to be a mine and is now a memory. Each breath you take here is borrowed from a version of you that will never leave. With every descent, your joints ache with a future that arrives too early. In a slick of black‑violet on the rock, you see your face older than it should be, and you do not blink.\n\nThe Cave Guardian waits where Elar’s fear still hangs like incense. It is the shape of everything you didn’t live — every kindness refused, every hunger you smothered until it learned your voice. When it inhales, your back hurts the way it will in twenty years. When it exhales, the lantern dims and memory goes with it.\n\n- Accept what is yours and what is not, and let the shadow stand beside you.\n- Or grind it under heel until only the light speaks.\n\nEither way, the year will end. Only you decide whether it ends with a whole self.\n",
    
    
    choices: [{"text":"Accept the Shadow (Integration)","next":"corruption__descent_into_rootdeep__guardian_transforms"},{"text":"Resist or Dominate the Shadow (Consumption)","next":"corruption__descent_into_rootdeep__guardian_consumes"}],
    imagePath: "/backgrounds/lanternTaken.jpg",
  },
  "corruption__descent_into_rootdeep__guardian_consumes": {
    id: "Ending — The Guardian Consumes (Hollow Escape)",
    text: "You press the shadow down until it slips your grip and takes the hand that held it. The cave exhales your name and keeps the breath.\n\nYou climb out lighter only where it matters; elsewhere, you are a husk packed with obligation. People are saved. You are not.\n\nThe cycle continues. The shadow is patient. It does not need to eat quickly to win.\n",
    
    
    choices: [],
    imagePath: "/backgrounds/staircase.jpg",
  },
  "corruption__descent_into_rootdeep__guardian_transforms": {
    id: "Ending — The Guardian Transforms (True Integration)",
    text: "You turn and let it turn with you. Where teeth waited, there are tools; where claws coiled, there are hands. The shadow steps forward and does not need to speak to be understood.\n\nYou emerge older than you entered — hair threaded with frost, breath quieter, eyes steady. The Veil mends along your fault lines. You carry both hunger and light without lying about either.\n\nThe cycle breaks here. Not through power, but through integration.\n\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__start": {
    id: "Corruption — The Root Flame",
    text: ((playerName) => "Roots seize stone; the old fire hums low. What you bind binds you back, PLAYERNAME.\n\nUnder the chapel, the air tastes of coins and wet dirt. Roots thread the vaulting like ribs. In the center, an altar‑stone veined with soot sleeps over a throat in the world. When you align Talamh with the others, the stone feels you like a tooth feels a tongue.\n\n“Name me,” whispers something patient and proud. Another voice — softer, nearer — promises vows in the language of ash and lace. Beneath them both, the bound spirit thrums, a knot that could be cut, devoured, or taught to hold.\n".replace(/PLAYERNAME/g, String(playerName))),
    
    
    choices: [{"text":"Descend to the Bound Spirit","next":"corruption__beneath_the_altar__bound_spirit"},{"text":"Listen to the Voice Beneath the Altar","next":"corruption__voice_beneath_the_altar__voice"},{"text":"Answer the Ashen Bride","next":"corruption__ashen_bride__ashen_bride"},{"text":"Descend into Rootdeep — Final Trial","next":"corruption__descent_into_rootdeep__final_trial"}],
    imagePath: "/backgrounds/talamh.jpg",
  },
  "corruption__voice_beneath_the_altar__condemn_voice": {
    id: "Ending — Condemn the Voice (Eternal Cycle)",
    text: "The altar seals. The next you will open it again.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__voice_beneath_the_altar__free_voice": {
    id: "Ending — Free the Voice (Collapse)",
    text: "Walls inhale. The world exhales.\n",
    
    
    choices: [],
    imagePath: "/backgrounds/secretPassage.jpg",
  },
  "corruption__voice_beneath_the_altar__merge_voice": {
    id: "Ending — Merge With the Voice (Omniscient)",
    text: "You speak with every voice and cannot stop hearing.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "corruption__voice_beneath_the_altar__voice": {
    id: "The Voice Beneath the Altar",
    text: "The cracks murmur in your childhood tone, then your mother’s, then your own: “I bear the name you buried.” The Voice carries three registers — judgment like sun‑heat on your scalp, reflection like cool riverwater in your mouth, and root‑flame like a coal under the tongue. Each offers a truth; each demands a price.\n\nYou feel the shape of yourself as the Voice understands it: Persona smoothed for strangers, Shadow heavy with appetite, Anima gloved in ash and lace. The Self waits at the center, patient as winter.\n",
    
    
    choices: [{"text":"Free the Voice","next":"corruption__voice_beneath_the_altar__free_voice"},{"text":"Merge With It","next":"corruption__voice_beneath_the_altar__merge_voice"},{"text":"Condemn It","next":"corruption__voice_beneath_the_altar__condemn_voice"}],
    imagePath: "/backgrounds/whisper.jpg",
  },
  "doubt-accepted": {
    id: "Faith Questioned",
    text: "You let the doubt step forward. It tastes like ash and salt—familiar, because it is *your* taste.\n\nThe lens cools further in your palm. Nèamh dims. Muir surfaces instead, the water-blue of reflection catching light from angles you didn't know existed. In it, you see not the Chapel but something *behind* the Chapel: a space where rituals go when they die. A graveyard of old faiths, old pyres, old certainties that someone once believed would save the world.\n\n\"What if,\" you ask quietly, \"the pyres are not salvation? What if they are simply *feeding*?\"\n\nThe doubt speaks in your voice, but it carries weight you didn't know you could hold.\n\nSister Maerwyn's composure flickers. For the first time, you see fear in her—not of the Veil, but of *you*, and the question you've just asked aloud.\n\nThe crowd murmurs. Some shuffle back. Some lean closer, desperate to hear an answer.\n\nYou have opened a door. The Veil watches. And now the question of what to do with doubt becomes *your* burden to carry.\n\nYour path has fractured. Time to walk the cracks.\n",
    
    
    choices: [{"text":"Ask Sister Maerwyn what she truly believes","next":"challenge-maerwyn"}],
    imagePath: null,
  },
  "doubt-rejected": {
    id: "Faith Reaffirmed",
    text: "You push the doubt down. It snarls and writhes, but you have been trained to burn away such things.\n\n\"The faith is not mine to question,\" you say aloud. \"It is the *structure that holds*. If I allow doubt to speak, the Veil widens. The people fall. That is not mercy—that is abdication.\"\n\nNèamh flares in your lens. Your veins brighten, the black‑gold burning toward pure white. The doubt doesn't vanish—it *sinks*, roots deep into your marrow, where it will feed on every sacrifice you make.\n\nSister Maerwyn nods with approval. The villagers relax.\n\nYou have chosen *to not choose*. You have chosen the role over the self. The doubt, unspeaking but alive, settles into your bones like ash that will never be cleaned.\n\nYour path is cleared. Time to light the pyres.\n",
    
    
    choices: [{"text":"Light the pyres with renewed conviction","next":"faith__village_at_dusk__rekindle_pyres"}],
    imagePath: null,
  },
  "faith__start": {
    id: "Faith — The Light That Burns",
    text: ((playerName) => "Smoke-sweet air and candle stubs in windows. Bells ring with no hands. Sister Maerwyn meets your gaze, PLAYERNAME, and does not look away.\n\nShe presses a taper into your palm. “The Year’s End isn’t a night,” she says, “it’s a decision that takes a year to pay for.” The pyre fields lie ready — circles of char and bone‑white stones, each labeled with a name that might yet be saved or surrendered. In the distance, children chalk mirrors; their parents pretend not to notice the way reflections arrive a blink late.\n\nYour lens warms at the prospect of order. The crowd, at the prospect of certainty. The Veil does not care how you choose, only that you understand the cost.\n".replace(/PLAYERNAME/g, String(playerName))),
    
    
    choices: [{"text":"Rekindle the Pyres with Sister Maerwyn","next":"faith__village_at_dusk__rekindle_pyres"},{"text":"Refuse to Light the Pyres","next":"faith__village_at_dusk__refuse_pyres"},{"text":"Confront your own doubt","next":"faith-own-faith-fractures"}],
    imagePath: "/backgrounds/lantern.jpg",
  },
  "faith__village_at_dusk__burn_both": {
    id: "Pyre Dilemma — Burn Both",
    text: "You steady the lens. Wheat and weeds together — mercy in the fire’s language. The crowd murmurs a prayer you don’t remember teaching them. Heat lifts the hair on your arms as Nèamh flares; the oil darkens to a mirror where faces blur, names thinning to smudges.\n\n“Do it,” says one voice. “Wait,” says another. They might be the same person. Muir shows you who begged, who stole, who carried grain to a hungry neighbor. Talamh drinks in their echoes. If you falter, the breeze will decide for you.\n",
    
    diceCheck: {"stat":"fortitude","target":12,"success":"faith__village_at_dusk__veil_holds","fail":"faith__village_at_dusk__martyr"},
    
    imagePath: null,
  },
  "faith__village_at_dusk__corruption_spreads": {
    id: "Ending — The Corruption Spreads (Despair)",
    text: "Mercy blooms into rot. Veil‑Touched sweep ashes that return as they breathe.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "faith__village_at_dusk__faith_hardened_by_doubt": {
    id: "Ending — Faith Hardened by Doubt",
    text: "You light the pyres, but something in you calcifies. The ritual holds; the village sleeps. Doubt sets like glass in your bones.\n\nSister Maerwyn thanks you with a voice that sounds like relief and pity braided together. Bells ring with no hands. Candles lean, but they do not warm you.\n\nYou have chosen safety over truth. The Veil holds — and so does the machinery.\n\n",
    
    
    choices: [],
    imagePath: null,
  },
  "faith__village_at_dusk__faithless_ending": {
    id: "Ending — The Gods Abandon the Faithful",
    text: "Candles stand upright. The Sun’s breath is silent. Prayers continue out of habit, like sweeping an empty room.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "faith__village_at_dusk__martyr": {
    id: "Ending — The Brichan Crumbles to Ash (Martyr)",
    text: "The alignment is perfect — and fatal. Villagers gather you in urns and whisper you as a prayer.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "faith__village_at_dusk__refuse_pyres": {
    id: "Refuse the Pyres",
    text: "You lower the torch. The murmurs sharpen. Somewhere, a mirror turns its face to the wall. You try to steady the gathering with your breath alone — but breath is a kind of wind, and wind loves to feed fires.\n\n“If not the pyres,” someone says, “then what?” Your veins answer with a warning pulse. The Veil leans closer to hear your reply.\n",
    
    diceCheck: {"stat":"presence","target":12,"success":"faith__village_at_dusk__veil_opens_early","fail":"faith__village_at_dusk__witch_trial"},
    
    imagePath: null,
  },
  "faith__village_at_dusk__rekindle_pyres": {
    id: "Village at Dusk — Rekindle the Pyres",
    text: "Sister Maerwyn’s hands smell of smoke and wax. “The pyres must burn,” she says, “even if the names do with them.” The fields beyond the hedge are a sheet of dark water; every breath raises a ripple of frost. Villagers stand in a wide crescent, their faces bright as coins in the firelight, their reflections wavering in the bowls of oil.\n\nYour lens hums in the palm of your hand. Nèamh warms your knuckles with the promise of clean endings. Muir cools your wrist with questions. Talamh thrums up your bones like a steady drum. Somewhere behind the crowd, a child counts the chimneys. The number changes each time.\n",
    
    
    choices: [{"text":"Burn both Innocent and Wicked","next":"faith__village_at_dusk__burn_both"},{"text":"Save the Innocent Spirit","next":"faith__village_at_dusk__save_innocent"}],
    imagePath: null,
  },
  "faith__village_at_dusk__save_innocent": {
    id: "Mercy Path — Save the Innocent",
    text: "You cut the chain before the flame takes it. The innocent breath fills the cold air — and something else inhales too. The bowl gutters; the saved spirit skims your cheek like a moth escaping a jar.\n\nSister Maerwyn says nothing. The villagers say everything with their eyes. Muir cools your palm with relief that feels untrustworthy. On the horizon, smoke uncoils from chimneys that were not there a moment ago. You have spared one — and invited consequence.\n",
    
    diceCheck: {"stat":"insight","target":13,"success":"faith__village_at_dusk__faithless_ending","fail":"faith__village_at_dusk__corruption_spreads"},
    
    imagePath: null,
  },
  "faith__village_at_dusk__veil_holds": {
    id: "Ending — The Veil Holds (Tragic Victory)",
    text: "The Veil steadies. Fields blacken. Names blur at their edges. Bells ring with no hands.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "faith__village_at_dusk__veil_opens_early": {
    id: "Ending — The Veil Opens Early (World Collapse)",
    text: "The sky tears along hairline cracks. Doors refuse to stay closed. The year ends before it begins.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "faith__village_at_dusk__witch_trial": {
    id: "Ending — You Burn Instead (Condemnation)",
    text: "Rope, wood, and certainty. Your reflection keeps talking when you cannot.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "faith-own-faith-fractures": {
    id: "Your Own Faith Fractures",
    text: "You stand in the Chapel of Sighing Stone. The pyres are ready. The villagers wait. Sister Maerwyn looks to you for certainty.\n\nAnd you realize: you have none.\n\nIt hits you like a bell rung in reverse—the sound of something *missing* rather than something *present*. All the rituals you've performed, all the oaths you've sworn in Nèamh's light, all the certainty you've inherited from Elar's teachings—suddenly they feel like *armor* rather than *belief*.\n\nThe candlelight leans toward you, but you notice: it leans in *request*, not in *answer*. As if the Veil itself is asking, \"Do you truly believe this will hold?\"\n\nIn your bones, you hear an echo of Elar's voice: \"The light consumes. Names slip. Faith hardens into something that protects nothing but itself.\"\n\nThe Veil does not thin because you have faith. The Veil thins because it *chooses* to. Every pyre, every prayer, every sacrifice—are these acts of salvation, or acts of *negotiation with hunger*?\n\nSister Maerwyn still watches you. The villagers begin to murmur. Your lens feels cold now, not warm.\n\nWhat do you choose: the faith you were given, or the doubt that grows from seeing too clearly?\n\n",
    
    
    choices: [{"text":"Defend your faith; push back against doubt","next":"doubt-rejected"},{"text":"Acknowledge the doubt; let it speak","next":"doubt-accepted"}],
    imagePath: null,
  },
  "prologue": {
    id: "Prologue — The Stirring",
    text: "You wake in the Chapel of Sighing Stone. Dust hangs. The lens in your palm is warm as a kept ember.\n\nYou stand in the hush between worlds, memory hanging just out of reach. The voice that calls you isn’t from above or below — it comes from within, threaded through the pulse of light under your skin. You remember the creed, the burden, the endless hunt… but not your name. That part was left behind in the last turning of the Veil.\n\nThe world will not know you until you speak it again. Who are you, Brichan?\n",
    requiresName: true,
    
    choices: [{"text":"Path of Faith — The Light That Burns","next":"faith__start"},{"text":"Path of Reflection — The Mirror's Truth","next":"reflection__start"},{"text":"Path of Corruption — The Root Flame","next":"corruption__start"}],
    imagePath: "/backgrounds/study.jpg",
  },
  "prologue-choice": {
    id: "Three Paths Open",
    text: "Three ways open:\n- Faith and flame, to steady what breaks.\n- Reflection and truth, to see what hides.\n- Root and hunger, to bind or be bound.\n\nAlderthorn waits for your decision — and for the cost you'll pay to see it through.\n\n",
    
    
    choices: [{"text":"Path of Faith — The Light That Burns","next":"faith__start"},{"text":"Path of Reflection — The Mirror's Truth","next":"reflection__start"},{"text":"Path of Corruption — The Root Flame","next":"corruption__start"}],
    imagePath: null,
  },
  "prologue-elar-warning": {
    id: "Elar's Last Counsel",
    text: "The vision releases you slowly, like water draining from lungs.\n\nIn the chapel's dimness, a voice—not quite Elar's, but carrying his weight—settles over you:\n\n\"I am not here to dissuade you. The Brichan's role is not optional; it simply *is*. But know this: every choice you make in the coming Hunt will age you in ways the mirror cannot explain. Not just your body—your *self*. Memories that belong to you will become memories of people you were.\n\nThe three paths you'll choose are not escapes. They are three ways of *accepting* the cost.\n\n- Light those who choose Faith understand sacrifice through ritual and community. They will burn, and you will burn with them.\n- Those who seek Reflection think understanding will save them. But mirrors remember what you forget, and reflection lag is the first sign of fracture.\n- Those who walk the Root Flame believe they can bargain with shadow. The shadow always wins the negotiation—it simply takes longer to show its victory.\n\nThe Veil does not care which path you take. It only cares that you *pay*.\n\nI paid. I am still paying, in the places you cannot yet see.\n\nYour turn begins now. Choose not the path that saves you. Choose the path that costs you something true.\"\n\nThe voice fades. You stand alone with the lens, warm as a heartbeat in your palm.\n\nThree ways open. Only one cost: everything.\n\n",
    
    
    choices: [{"text":"Acknowledge the warning; proceed to choose your path","next":"prologue"}],
    imagePath: null,
  },
  "prologue-vision": {
    id: "A Memory Surfaces",
    text: "As your fingers close around the lens, the chapel tilts. For a moment—or a year—you're not alone.\n\nA figure kneels before the altar, their veins black‑gold and pulsing visibly beneath translucent skin. Elar. Older than memory, younger than the stone around him. His lips move in a prayer you almost understand.\n\nThen he turns. His eyes are not his own—they're the lenses' eyes, seeing through you as if you're made of cracks.\n\n\"The light consumes,\" he whispers. \"Every Hunt leaves less of you behind. Names slip. Reflections argue. The body ages as the shadow grows—and shadow always grows.\"\n\nThe scene fractures. You see him at the altar's base, veins unraveling into threads of light that writhe like worms, whispering prayers backward. Around him, the chapel breathes in rhythm with something vast and hungry.\n\n\"The role is not a gift,\" he says, his voice now overlapping with something deeper. \"It is a rotation. Each Brichan believes they will be the one to break the cycle. None have. The unlived life of those before you lives in the dark places now.\"\n\nThe vision crumbles. You're back in the chapel. Your hands shake. The lens is warm.\n\nThe choice before you—Faith, Reflection, Corruption—suddenly feels less like a path and more like a way of *accepting* rather than *choosing*.\n",
    
    
    choices: [{"text":"Step into the vision fully","next":"prologue-elar-warning"},{"text":"Pull away; return to the chapel","next":"prologue"}],
    imagePath: null,
  },
  "reflection__archivist_of_ash__archivist": {
    id: "The Archivist of Ash",
    text: ((playerName) => "Shelves of candlelit skulls whisper fragments of your name as the Archivist passes, ledger open to a page not yet written. Soot falls like snow from a ceiling you cannot see. The Archivist does not look up. He never needs to — every story that ends here ends the same way: with a signature. Somewhere in the stacks, a skull exhales a single word: PLAYERNAME.\n\n“Truth is not a lantern,” he says, “it’s a ledger. The cost is the column beside it.” He turns the book so you can read a line where your name should be. The space hums.\n".replace(/PLAYERNAME/g, String(playerName))),
    
    
    choices: [{"text":"Bargain for Knowledge","next":"reflection__archivist_of_ash__bargain_for_knowledge"},{"text":"Refuse His Bargain","next":"reflection__archivist_of_ash__refuse_bargain"}],
    imagePath: null,
  },
  "reflection__archivist_of_ash__bargain_for_knowledge": {
    id: "Bargain for Knowledge",
    text: "Ink runs uphill. The Archivist’s quill waits above a line where your name should be. He dips it in a well of ash that never empties. “We can write the loss now,” he offers gently, “or let the Child do it later.” His smile is kind and exhausted.\n\nAround you, shelves breathe. The skulls on them are patient; they have time to hear you decide.\n",
    
    diceCheck: {"stat":"reason","target":15,"success":"reflection__archivist_of_ash__break_cycle","fail":"reflection__archivist_of_ash__madness"},
    
    imagePath: "/backgrounds/amulet.jpg",
  },
  "reflection__archivist_of_ash__break_cycle": {
    id: "Ending — Break the Cycle (Transcendent)",
    text: "Guided by the Record, you edit your reflection — not to erase, but to reconcile. The Veil mends along your fault lines.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "reflection__archivist_of_ash__madness": {
    id: "Ending — Learn Too Much (Madness)",
    text: "Shelves breathe with you. You alphabetize your screams.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "reflection__archivist_of_ash__refuse_bargain": {
    id: "Ending — History Repeats (Fated)",
    text: "You close the ledger. Another you will read it later.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "reflection__chamber_of_glass__destroy_mirror": {
    id: "Destroy the Mirror",
    text: "You lift the lens. Truth cuts before it cleanses; the room holds its breath. On the mirror’s surface, your mistakes line up like candles, some burned low, some never lit. Muir ripples, showing kindnesses you forgot to take credit for.\n\nSomewhere far away, glass hums in sympathy. You realize that if you shatter this one, somewhere, some version of you will have to keep singing to hold the seams together.\n",
    
    diceCheck: {"stat":"insight","target":14,"success":"reflection__chamber_of_glass__world_cracks","fail":"reflection__chamber_of_glass__mirror_consumes"},
    
    imagePath: null,
  },
  "reflection__chamber_of_glass__give_away_reflection": {
    id: "Ending — Save the Child, Forget Yourself",
    text: "The Child steps out. You remain, careful and bright, inside the glass.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "reflection__chamber_of_glass__mirror_child": {
    id: "Chamber of Glass — The Mirror Child",
    text: "In the glass, the child does not blink. Your lips press together; theirs part. It finishes the sentence you chose not to speak — not cruelly, not kindly, only precisely. When you lie, the fog on the glass writes the truth backward.\n\nEvery mirror in the chamber holds a different year of your face. Some have ash on the cheeks. Some are smiling and don’t know why. The Child stands in all of them at once, a patient axis, waiting to see which you will choose to keep.\n",
    
    
    choices: [{"text":"Give Away Your Reflection","next":"reflection__chamber_of_glass__give_away_reflection"},{"text":"Destroy the Mirror","next":"reflection__chamber_of_glass__destroy_mirror"}],
    imagePath: null,
  },
  "reflection__chamber_of_glass__mirror_consumes": {
    id: "Ending — The Mirror Consumes You",
    text: "You fall between images, a breath trapped forever in glass.\n",
    
    
    choices: [],
    imagePath: null,
  },
  "reflection__chamber_of_glass__world_cracks": {
    id: "Ending — The World Cracks but Survives",
    text: "Glass storms across the sky in hairline seams. Life continues, carefully.\n",
    
    
    choices: [],
    imagePath: "/backgrounds/moonDoor.jpg",
  },
  "reflection__start": {
    id: "Reflection — The Mirror’s Truth",
    text: ((playerName) => "Glass remembers everything, PLAYERNAME. When you breathe, the mirrors breathe back.\n\nThe Chamber of Glass rises like a grove of winter trees — tall panes, beveled edges catching candlelight in thin, cold lines. Every surface shows a true thing and a comforting lie, overlapping like ripples. Somewhere inside those echoing corridors, a child’s voice hums a tune whose words you can’t afford to recall. Further below, the Archivist catalogs choices you haven’t made yet.\n\nSomewhere on the road, a wayfaring thaumaturge fans a brazier. His glaze sings when heated; his smile does the same.\n".replace(/PLAYERNAME/g, String(playerName))),
    
    
    choices: [{"text":"Enter the Chamber of Glass","next":"reflection__chamber_of_glass__mirror_child"},{"text":"Seek the Archivist of Ash","next":"reflection__archivist_of_ash__archivist"},{"text":"Meet Mr. Harriot at the Wayfarer’s Fire","next":"reflection__wayfarers_fire__mr_harriot"}],
    imagePath: "/backgrounds/Muir.jpg",
  },
  "reflection__wayfarers_fire__accept_glaze": {
    id: "Harriot’s Mirror‑Glaze",
    text: "The glaze sings when heated, a thin, eager note that rings along your teeth. Your reflection lags a heartbeat behind and seems relieved to do so. When you look away, it keeps looking for a fraction too long, as if watching who you are when no one else is.\n",
    
    
    choices: [{"text":"Return to the Reflection Path","next":"reflection__start"},{"text":"Head for the Chamber of Glass","next":"reflection__chamber_of_glass__mirror_child"}],
    imagePath: null,
  },
  "reflection__wayfarers_fire__mr_harriot": {
    id: "Mr. Harriot at the Wayfarer’s Fire",
    text: ((playerName) => "By a roadside brazier, he paints a shimmering glaze over a cracked hand‑mirror. The brush leaves ripples that won’t settle, as if the glass were a pond with a memory. “Name for a recipe,” he smiles. “A nickname will do, PLAYERNAME.”\n\nHe warms the mirror over coals that smell faintly of rosemary and something sweet you can’t place. When the glaze sings, your reflection lags a heartbeat. The smile he gives you is friendly and not entirely for you.\n".replace(/PLAYERNAME/g, String(playerName))),
    
    
    choices: [{"text":"Trade a Name for Mirror‑Glaze","next":"reflection__wayfarers_fire__accept_glaze"},{"text":"Decline with Courtesy","next":"reflection__start"}],
    imagePath: null,
  }
};
