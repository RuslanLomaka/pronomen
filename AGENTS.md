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
- `correct`
- `options`
- `explanation`
- `replacements`
- `hint`

Every `options` array must contain exactly four strings, and exactly one must match `correct`.

## Appendix: Context Pronouns

Gemini CLI review was requested for this feature, but it could not complete because browser authentication was required and timed out. The following plan is the local working guideline.

Add context-sensitive pronoun practice as a separate learning block and mode, not as hidden behavior inside normal tasks.

- Use clear labels: `Kontext`, `Siezen`, `Plural`, `Akkusativ`, `Dativ`, `uns`.
- Do not ask learners to infer formal address from a name alone. Mark formal tasks with `(formell)` or the `Siezen` tag.
- Use minimal pairs to show why the same surface form can have different grammar.
- For `uns`, teach that Akkusativ and Dativ share the same form: `sehen Anna und mich -> sieht uns`, but `helfen Anna und mir -> hilft uns`.
- For formal address, contrast `Sie` and `Ihnen`: `sieht Herrn Bauer (formell) -> sieht Sie`, but `hilft Herrn Bauer (formell) -> hilft Ihnen`.
- For plural third person, contrast lowercase `sie/ihnen` with formal uppercase `Sie/Ihnen`.
- Include capitalization traps in wrong answers: `Ihnen` vs `ihnen`, `Sie` vs `sie`.
- Keep explanations short: name the context, name the case trigger, give the pronoun.
- Avoid ambiguous tasks such as `Er hilft Ihnen` without a context label.
