# Facilitate the two-hour session

## Outcome

Students build and publish a responsive opportunities board using an AI coding assistant. Use fictional listings. Explain the storage model before teaching favourites.

The complete app on main is your reference. Students run `npm run dev:starter` and work in Starter.jsx. No branch changes are required to compare the two modes.

## Run sheet

| Minutes | Facilitation |
| --- | --- |
| 0–10 | Demonstrate the complete app, including saving and creating a listing |
| 10–25 | Open Codespaces, run the starter, explain files and preview |
| 25–60 | Build cards, search and filters with short AI prompts |
| 60–80 | Add favourites and a form |
| 80–95 | Pair review, keyboard navigation, mobile layout and error checks |
| 95–115 | Build, package and deploy on Amplify |
| 115–120 | Share a URL and explain one change |

For beginners, prioritise cards, search and favourites. Students can inspect the reference form if they need more time. Prepare classroom pairs and deployment support before the session.

## Teaching prompts

Ask where the data lives after saving. Ask what happens if storage is blocked. Ask whether an AI-generated feature behaves correctly when given an empty input. Ask students to explain a generated line before accepting another large change.

## Preflight

Run `npm ci`, `npm test`, `npm run package` and a real Codespaces rehearsal. Confirm every student can access their chosen AI assistant. Arrange AWS access and budget ownership with the university.

For 15 teams, allocate a helper and pre-create uniquely named Amplify apps where appropriate. Rehearse the manual upload workflow in the event account and check account quotas. A deployment queue may exceed the session if one facilitator handles every team.

## Completion

Each team should show a working URL, a successful search, a persisted favourite and a short explanation of how their code works. Commit student work before deleting Codespaces.

The project uses AI during development. A shared backend or runtime AI feature is a separate extension requiring additional architecture, access and cost planning.
