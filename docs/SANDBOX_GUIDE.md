# Prepare the student sandbox

## Before the workshop

Allow one GitHub account and one two-core Codespace per student or pair. Check that students can sign in and have remaining Codespaces usage. AI assistant access is separate. Sign in to the chosen tool and try one coding prompt before the day.

Students need an internet connection, a laptop and a modern browser. Codespaces supplies the terminal and Node runtime. For local work, install Node.js 24 LTS and Git.

## Make a student copy

1. Open https://github.com/Mide69/campusconnect-workshop.
2. Select **Use this template → Create a new repository**.
3. Choose your own account and a repository name.
4. Open the copy, then **Code → Codespaces → Create codespace on main**.
5. Wait for the dev container's `npm ci` step to finish.
6. In the terminal run `npm run dev:starter`.
7. Open the Ports panel and choose **Open in Browser** for port 5173. Keep port visibility private.

You should see a CampusConnect starter with one opportunity. A forwarded preview is available while the development server and Codespace run. AWS deployment provides the separately hosted website.

## Instructor rehearsal

Create a fresh copy and repeat every step using the actual classroom network. Test both `npm run dev:starter` and `npm run dev`, stopping the first server with Ctrl+C before switching.

The configuration uses a Node 24 dev container, a committed package lock and a private forwarded preview port. Copilot is suggested as an extension. Its availability depends on the student's account and allowance. A separate AI chat tool can also suggest changes that students paste into their own files.

## Recovery

- Port in use: stop the other Vite server with Ctrl+C.
- Installation failed: check the connection and run `npm ci` again.
- Blank preview: open port 5173 through Codespaces rather than typing localhost in a separate device.
- No AI allowance: use the documented prompts with another available tool or inspect the reference app.
- Blocked Codespaces or exhausted quota: clone the repository locally, install Node 24, then run `npm ci` and `npm run dev:starter`.
- Lost browser data: bookmarks and added listings belong to that browser and origin. Use the same preview URL to see them.

## End the lab

Commit and push student work. Stop the Codespace, then delete it after confirming the work is saved in GitHub. Stopped Codespaces still consume storage. Check account billing and remaining allowances.

Official references:
- https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-from-a-template
- https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/setting-up-your-nodejs-project-for-codespaces
- https://docs.github.com/en/billing/concepts/product-billing/github-codespaces
