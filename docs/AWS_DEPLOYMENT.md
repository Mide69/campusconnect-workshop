# Deploy CampusConnect to AWS Amplify

## Choose the access model

The facilitator can deploy team ZIPs from an AWS account owned by the organiser. Students build in their individual Codespaces. This is the simplest classroom workflow.

For students to operate AWS themselves, the organiser must supply suitable lab accounts or scoped temporary access beforehand. This repository does not create AWS accounts or issue credentials. Keep AWS credentials in the authorised AWS tools, outside the frontend source.

Confirm hosting charges and quotas with the account owner. Set a budget alert and an agreed cleanup date. A budget alert does not enforce a hard spending cap.

## Prepare the deployment

For the complete reference app:
```bash
npm ci
npm test
npm run package
```

For a student's Starter.jsx exercise:
```bash
npm run build:starter
node scripts/package.mjs
```

Both routes produce `campusconnect.zip` in the repository root. Download it from the Codespaces explorer using the file context menu. The archive contains index.html at its root. Keep node_modules and source code outside the deployment ZIP.

## Manual AWS deployment

1. Sign into the agreed AWS account and open Amplify Hosting.
2. Choose **Create new app**, then **Deploy without Git**.
3. Enter a unique app name such as `campusconnect-team-01` and branch `workshop`.
4. Choose the drag-and-drop upload method and upload campusconnect.zip.
5. Choose **Save and deploy**.
6. When deployment succeeds, open the assigned HTTPS URL.

Rebuild and upload another ZIP to update the app. Verify index.html and assets are at the archive root if the site returns a missing-page error.

## Git-connected alternative

Connect your own copy of the repository through Amplify's supported GitHub flow. Select main and review amplify.yml. It installs Node 24, restores the locked dependencies, runs tests and builds dist. Review the access requested by the Amplify GitHub integration with the account owner before granting it.

## Verify

Search for a listing, filter a category, open details and use Escape to close. Save an item and reload. Add a fictional listing and reload. Open on a phone and check the layout.

Each browser and origin has separate localStorage. Added listings and favourites on a Codespaces preview do not transfer automatically to the AWS URL.

## Cleanup

On the agreed date, delete the team's Amplify app through its console settings. Confirm the account and app name before deleting. A deleted hosting app no longer serves its URL. Stop or delete unused Codespaces after pushing student work.

## References

- https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html
- https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html
- https://aws.amazon.com/aws-cost-management/aws-budgets/faqs/
