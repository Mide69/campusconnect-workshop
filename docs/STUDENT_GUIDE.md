# Build CampusConnect with an AI assistant

Start with `npm run dev:starter` and work in `src/Starter.jsx`. Use `src/data.js` for the fictional listings and category names. The complete version lives in `src/App.jsx`.

Before accepting generated code, ask the assistant what it changes and why. Run the app after each change. Use Git to save a working checkpoint before the next exercise.

## Exercise 1 · Display the board

Prompt:
> Inspect src/Starter.jsx, src/data.js and src/style.css. Help me display all opportunities as responsive cards in Starter.jsx. Show the title, organisation, category, location and deadline. Explain React's map function and stable keys. Keep changes within the starter.

Check that all 12 examples appear and that the cards fit on a narrow screen.

## Exercise 2 · Search and filter

Prompt:
> Add a labelled keyword search and category buttons to Starter.jsx. Search titles, organisations, descriptions and locations without case sensitivity. Combine search and category filters. Explain useState and derived data. Show a helpful empty state and a clear filters button.

Check a keyword, switch categories and try a phrase with zero matches. Clearing the filters should restore every listing.

## Exercise 3 · Save favourites

Prompt:
> Add a bookmark button and a saved-only view. Give each button a descriptive accessible name and aria-pressed. Persist favourites in localStorage, recover from corrupted JSON and show feedback if storage is unavailable. Explain why another browser will have separate data.

Save an item, reload, then unsave it from the saved view. Confirm the count and results change.

## Exercise 4 · Create an opportunity

Prompt:
> Add a keyboard-accessible dialog and a form for fictional opportunities. Require title, organisation, category, location, deadline, description and commitment. Reject blank or whitespace-only fields and past deadlines. Store custom listings alongside favourites. Show field errors and ensure user-entered content is rendered safely as text.

Check an incomplete form, a past deadline, a valid listing and persistence after refresh. Escape should close the dialog and return focus to the opening button.

## Exercise 5 · Ship it

Run `npm test`, then `npm run build:starter` to build your own starter work.

Package the current dist directory with `node scripts/package.mjs`. This preserves your exercise build. In contrast, `npm run package` rebuilds and packages the complete reference application.

Follow AWS_DEPLOYMENT.md to upload the ZIP. Open the public URL on a second device. Explain why browser-local listings differ between the two devices.

## Explain your work

Be ready to explain which file contains the data, how filters combine, what localStorage stores, what build produces and what Amplify hosts. Ask the AI to explain any part you cannot yet describe yourself.
