# Pronoun Forge — German Case Trainer

Pronoun Forge is a single-page German pronoun transformation trainer. It shows a noun-based sentence and asks you to choose the correct pronoun version.

Example:

```text
Der Lehrer hilft der Schülerin.
-> Er hilft ihr.
```

The app trains Nominativ, Akkusativ, Dativ, formal and informal pronouns, plural pronouns, two-object sentences, prepositions, and basic Wechselpräpositionen.

## How To Open

Open `index.html` directly in a browser. No server, install step, build tool, or internet connection is required.

## File Structure

```text
index.html   Main single-page app markup
styles.css   Responsive styling and visual states
script.js    Task data, game modes, scoring, localStorage, keyboard controls
AGENTS.md    Instructions for future AI coding agents
README.md    Project overview and editing guide
```

## Game Modes

- Classic: choose the correct full pronoun sentence.
- Speed: answer as many as possible in 60 seconds.
- Minimal Pairs: practice similar sentences where case changes the pronoun.
- Boss: hard mixed tasks with traps, two objects, prepositions, formal/informal forms, and plurals.
- Mistake Review: practice tasks previously answered incorrectly.

## How To Add New Tasks

Add task objects to the `tasks` array in `script.js`. Keep sentences short, clear, and grammatically correct. Each task must have exactly four options and only one correct answer.

Example task:

```js
{
  id: "l1-001",
  level: 1,
  modeTags: ["classic", "akkusativ"],
  original: "Der Mann sieht den Hund.",
  correct: "Er sieht ihn.",
  options: [
    "Er sieht ihn.",
    "Ihn sieht er.",
    "Er sieht ihm.",
    "Sie sieht ihn."
  ],
  explanation: "Der Mann is masculine nominative -> er. Den Hund is masculine accusative -> ihn. The verb sehen takes accusative.",
  replacements: [
    {
      noun: "Der Mann",
      pronoun: "er",
      case: "Nominativ",
      gender: "maskulin",
      number: "singular"
    },
    {
      noun: "den Hund",
      pronoun: "ihn",
      case: "Akkusativ",
      gender: "maskulin",
      number: "singular"
    }
  ],
  hint: "sehen + Akkusativ"
}
```

## Future Ideas

- Add audio prompts.
- Add typed-answer mode.
- Add teacher-created custom sets.
- Add import/export for classroom progress.
- Add a focused drill mode for one weak spot at a time.
