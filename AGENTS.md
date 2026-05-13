# AGENTS.md

## Project

Pronoun Forge — German Case Trainer is a vanilla HTML/CSS/JavaScript single-page app for German pronoun transformation practice.

Learners see a sentence with nouns and choose the correct pronoun-based sentence. The app focuses on Nominativ, Akkusativ, Dativ, formal Sie/Ihnen, informal du/dich/dir, plural forms, two-object sentences, prepositional phrases, and basic Wechselpräpositionen.

## Rules For Future AI Coding Agents

- No frameworks.
- No dependencies.
- No backend.
- No build tools.
- Keep it single-page.
- Keep data in `script.js` unless the project grows significantly.
- Prioritize correct German grammar over fancy UI.
- Do not remove existing tasks unless explicitly asked.
- When adding tasks, preserve the task object format.
- Every task must have exactly 4 answer options.
- Every task must have exactly one correct option.
- Wrong answers should be realistic and useful for learning.
- Explanations should be short and learner-friendly.
- Prefer simple sentences with common nouns.
- Avoid advanced literary German or ambiguous poetic phrasing.
- Keep mobile usability strong: large buttons, readable text, no hover-only controls.
- Test keyboard controls: A/B/C/D answer, Enter advances after feedback.
- Test localStorage behavior after scoring, mistakes, resets, and mode changes.

## Task Format

Each task should include:

- `id`
- `level`
- `modeTags`
- `original`
- `translation`
- `correct`
- `options`
- `explanation`
- `replacements`
- `hint`

Every `options` array must contain exactly four strings, and exactly one must match `correct`.
