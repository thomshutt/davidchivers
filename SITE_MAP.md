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

Current role:

- This repo is only a temporary GitHub Pages bridge for the custom domain while the site is being moved.
- It should not be treated as the canonical website repo.

## Email Drafter

- Intended public route: `/drafter/`
- Public files for that route should live in `drafter/`
- `/email_drafter/` should only be a compatibility redirect to `/drafter/`
- Current files:
  - `drafter/index.html`
  - `drafter/responses.json`
  - `drafter/save-config.js`

## Canonical Source vs Publish Target

To avoid confusion:

- Canonical working source for the drafter lives in the AI workspace:
  - `C:\Users\Dave_\AI\other\email_app\email_drafter\`
- This website repo is the publish target copy for the public site:
  - `C:\Users\Dave_\AI\_playground\sandbox_repos\davidchivers_site\drafter\`

Recommended rule:

- Edit the drafter in `other/email_app/email_drafter`
- Mirror approved files into this repo when publishing

## Related Repo That Is Probably Different

There is another local repo at:

- `C:\Users\Dave_\OneDrive\Documents\GitHub\davidchivers`

Evidence from that repo:

- it has remote `https://github.com/davidchivers/davidchivers.git`
- it contains a small AI setup wizard shell (`index.html`, `apps.js`, `styles.css`)

Current rule:

- treat `C:\Users\Dave_\OneDrive\Documents\GitHub\davidchivers.co.uk` as the canonical website repo
- treat this sandbox repo as legacy bridge/history only

## Before Pushing New Website Work

1. Confirm the route belongs in this repo.
2. Keep the canonical source in `other/email_app/email_drafter`.
3. Mirror only the files that should be public.
4. Then commit and push from this website repo, not from the shared `AI` checkout.
