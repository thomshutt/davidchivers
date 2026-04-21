# Site Map

This file is the quick orientation note for the public website repo.

## Repo

- Local repo: `C:\Users\Dave_\AI\_playground\sandbox_repos\davidchivers_site`
- Remote: `https://github.com/thomshutt/davidchivers.git`
- Branch: `master`

## What This Repo Appears To Own

Confirmed from the local repo contents:

- `/` via `index.html`
- `/papers.html`
- `/results.html`
- `/alcohol.html`
- `/ai_install/`
- `/countdown/`
- `/drafter/`
- `/email_app/`
- `/metal_map/`
- `/wine_bar/`

Current inference:

- This repo appears to be the source for the root `davidchivers.co.uk` site and its project subpaths.
- The root homepage matches this repo much more closely than the newer `davidchivers` repo in OneDrive.

## Email Drafter

- Intended public route: `/email_drafter/`
- Public files for that route should live in `email_drafter/`
- Current files:
  - `email_drafter/index.html`
  - `email_drafter/responses.json`

## Canonical Source vs Publish Target

To avoid confusion:

- Canonical working source for the drafter lives in the AI workspace:
  - `C:\Users\Dave_\AI\other\email_app\email_drafter\`
- This website repo is the publish target copy for the public site:
  - `C:\Users\Dave_\AI\_playground\sandbox_repos\davidchivers_site\email_drafter\`

Recommended rule:

- Edit the drafter in `other/email_app/email_drafter`
- Mirror approved files into this repo when publishing

## Related Repo That Is Probably Different

There is another local repo at:

- `C:\Users\Dave_\OneDrive\Documents\GitHub\davidchivers`

Evidence from that repo:

- it has remote `https://github.com/davidchivers/davidchivers.git`
- it contains a small AI setup wizard shell (`index.html`, `apps.js`, `styles.css`)

Current inference:

- treat that repo as a separate microsite or newer experimental site area, not the authoritative root-site repo, unless deployment settings prove otherwise

## Before Pushing New Website Work

1. Confirm the route belongs in this repo.
2. Keep the canonical source in `other/email_app/email_drafter`.
3. Mirror only the files that should be public.
4. Then commit and push from this website repo, not from the shared `AI` checkout.
