# CampusConnect

A complete student opportunities board and a two-hour AI-assisted coding workshop by Olamide Kosile, founder of Tek Tribe.

Explore fictional internships, scholarships, events and volunteering. Search and filter opportunities, save favourites, read details and add your own sample listings. A responsive interface and keyboard-accessible dialogs support desktop and mobile learning.

## Start

Use **Use this template → Create a new repository** on GitHub. Open your copy with **Code → Codespaces → Create codespace on main**. The dev container installs the locked dependencies.

```bash
npm run dev
```

Open port 5173 from the Ports panel. For your own machine, install Node.js 24 LTS, clone your copy, run `npm ci`, then `npm run dev`.

## Learn by building

```bash
npm run dev:starter
```

The starter uses `src/Starter.jsx`. It displays one opportunity, giving students a small starting point for AI-assisted exercises. The complete reference app is `src/App.jsx`. Stop one server before running the other because both use port 5173.

- [Student exercises and AI prompts](docs/STUDENT_GUIDE.md)
- [Facilitator run sheet](docs/FACILITATOR_GUIDE.md)
- [Student sandbox setup](docs/SANDBOX_GUIDE.md)
- [AWS deployment and cleanup](docs/AWS_DEPLOYMENT.md)

## Verify and deploy

```bash
npm test
npm run package
```

The packaging command builds the application and creates `campusconnect.zip`, ready for AWS Amplify manual deployment. `index.html` sits at the archive root. The included `amplify.yml` also supports an Amplify Git-connected build.

## Data and architecture

React + Vite produce a static website. `src/data.js` contains 12 fictional examples. Search, filtering and validation are in `src/model.js`. Custom listings and bookmarks persist in localStorage under `campusconnect.v1`. Browser storage failures produce feedback while changes remain in memory for the current visit.

Data belongs to the current browser and site origin. Different devices and deployment URLs have separate data. All sample listings are fictional and there is no application submission service. AI is used as a development assistant during the workshop. This project does not call an AI model at runtime.

The app needs no environment variables, AWS credentials or API keys. The AWS account owner handles hosting charges. Codespaces and the AI coding assistant each have separate usage allowances.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Complete application |
| `npm run dev:starter` | Beginner exercise |
| `npm test` | Filtering, persistence and validation checks |
| `npm run build` | Production app in dist |
| `npm run build:starter` | Starter app in dist |
| `npm run preview` | Preview the most recent production build |
| `npm run package` | Rebuild complete app and create deployment ZIP |

## Workshop use

You can adapt the sample content, styling and exercises for your class. Review dependencies and service charges before a live event. The repository provides a coding sandbox definition and deployment instructions. It does not provision AWS accounts.
