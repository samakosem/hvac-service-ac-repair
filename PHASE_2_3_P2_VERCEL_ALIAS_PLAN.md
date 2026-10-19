# Phase 2.3 P2: Vercel Alias Duplication Audit and Plan

Site: https://www.hvacserviceacrepair.com/ (canonical). Alias under review: https://hvac-service-ac-repair.vercel.app
Audit date: 2026-10-19
Status: **audit and plan only.** No code, Vercel setting, DNS or content was changed. Nothing is approved for implementation.

---

## 1. What the alias serves today (live, read-only)

GitHub Actions run 39217603588 fetched every sitemap path on the alias with GET requests only (no form submissions):

| Check | Result |
|---|---|
| All 456 sitemap paths on `hvac-service-ac-repair.vercel.app` | **456 of 456 return 200**: a full public copy of production |
| Page titles vs www | 456 of 456 identical |
| `X-Robots-Tag` header | none on all 456 |
| Robots meta | `index, follow` on all 456 |
| Canonical tag | 456 of 456 point to the **exact www URL** |
| `robots.txt`, `sitemap.xml` on the alias | 200; Sitemap line and every `<loc>` point to `https://www.hvacserviceacrepair.com` |
| Structured data on the alias homepage | 13 URLs, all on www; 0 on vercel.app |
| Internal links on the alias homepage | 96 relative (keep visitors on the alias), 7 absolute www, 0 absolute vercel.app |
| GTM container and phone links on the alias | Present (GTM `GTM-TRVN8GDR`, 21 `tel:` links on the homepage) |
| Tracking parameters (`?gclid=...&utm_source=...`) | 200, canonical to the clean www URL |
| `/api/contact` (GET) | 405 (POST only); not exercised with a POST |
| `/thank-you`, unknown path | `noindex, nofollow`; 404 with `noindex` |

Other Vercel hostnames for the project (unchanged by either option below):

| Hostname | Today |
|---|---|
| `hvac-service-ac-repair-sams-projects-4743330d.vercel.app` (team-scoped production alias) | 302 to Vercel SSO login, `X-Robots-Tag: noindex` |
| `hvac-service-ac-repair-git-main-sams-projects-4743330d.vercel.app` (branch URL) | 302 to Vercel SSO login, `X-Robots-Tag: noindex` |
| `hvac-service-ac-repair-<hash>-sams-projects-4743330d.vercel.app` (deployment URL) | 302 to Vercel SSO login, `X-Robots-Tag: noindex` |

**Verdict:** the alias is an indexable, publicly reachable duplicate of all 456 pages. The damage is limited because every page declares the www URL as canonical and robots.txt and the sitemap point to www, so Google should fold any alias URLs into www. It is still a duplicate host that Google can crawl. It also splits analytics by hostname, and visitors who land on it stay on it through relative links. Only `hvac-service-ac-repair.vercel.app` is public; every other Vercel URL for the project is already protected and noindexed.

---

## 2. Options, safest first

### Option A (recommended): Vercel domain setting, no code

Vercel's documentation (fetched from vercel.com on the runner): *"To add a redirect, open **Domains** in the sidebar within **Project Settings**, then select **Edit** on the domain you want to redirect from. Use the **Redirect to** dropdown to select the domain you want to redirect to."* This is the same mechanism you used for P0 on the apex domain.

**Open point to confirm in the dashboard first:** Vercel's documentation does not say whether the automatically assigned `*.vercel.app` production domain can be edited this way. A third-party guide says the `vercel.app` entry in Settings > Domains can be edited and redirected like any other domain. If the `hvac-service-ac-repair.vercel.app` row has **Edit** with a **Redirect to** option and a status-code choice, use Option A. If it doesn't, use Option B. Do not delete the domain instead: the alias would start returning errors rather than sending visitors and crawlers to www.

What it does and doesn't affect:

| Area | Effect |
|---|---|
| Exact host `hvac-service-ac-repair.vercel.app` | 308 to the same path on `www.hvacserviceacrepair.com` |
| Paths and query strings | Domain redirects keep the path; P0 showed this on all 456 apex URLs. Query-string pass-through is checked in verification step 3. |
| Preview, branch and deployment URLs | Not affected: different hostnames, and the setting applies only to the edited domain row |
| `www` production domain, apex 308 (P0), DNS | Not touched |
| Code, deployment | None needed; takes effect at Vercel's edge |

### Option B (fallback if A is not available): exact-host redirect in `next.config.ts`

One rule placed first in `redirects()`, following the pattern of the existing apex rule:

```ts
{
  source: "/:path*",
  has: [{ type: "host", value: "hvac-service-ac-repair.vercel.app" }],
  destination: "https://www.hvacserviceacrepair.com/:path*",
  permanent: true, // 308
},
```

- Confirmed against the Next.js 16 docs in this repo (`node_modules/next/dist/docs/.../redirects.md`): `has` with `type: "host"` is supported, `permanent: true` gives 308, query values are passed through to the destination automatically, and redirects are checked before pages and `/public` files.
- The exact host value means preview, branch and deployment URLs (`hvac-service-ac-repair-<hash>-...`, `hvac-service-ac-repair-git-...`) never match, so Vercel previews and the verification workflows keep working.
- Needs a small PR, a preview check (the rule cannot fire on a preview host by design, so the preview proves no other host is affected) and a production deploy.

---

## 3. Risks checked

| Area | Finding | Risk |
|---|---|---|
| **Google Ads** | No ad URL can be verified here (no Ads access). If any ad's final URL uses `hvac-service-ac-repair.vercel.app`, redirecting it to another domain can cause a destination mismatch disapproval. Ads should all use www. | **Check before implementing:** export Final URLs of enabled ads and confirm none contains `vercel.app`. |
| **Tracking (GTM/GA4)** | GTM fires on the alias today, so any alias visits are recorded under hostname `hvac-service-ac-repair.vercel.app`. After the redirect, those visits move to www. | Low and positive. If GA4 has a hostname filter, nothing to change. |
| **Forms** | Forms post to the relative `/api/contact`, so they always post to the host the visitor is on. www forms are unaffected. Alias visitors will be on www after the redirect and post there. | Low |
| **API routes** | `/api/contact` is the only route. A 308 keeps the method, but not every non-browser client follows a redirect on POST. Nothing in the repository calls the alias. | **Confirm** no external service (webhook, Zapier, Twilio, form tool) posts to `https://hvac-service-ac-repair.vercel.app/api/...`. |
| **Deployments and previews** | Preview, branch and deployment URLs are separate hostnames behind Vercel SSO; neither option touches them. No code, `vercel.json` or workflow in the repository uses the alias. The CI verification workflows use deployment or branch URLs or production. | None found |
| **Development workflow** | The dashboard's "Visit" link may still point at the alias and will then redirect to www. Cosmetic. | None |
| **Browser caching** | A 308 is cached by browsers that see it, so a rollback won't reach those browsers immediately. Only visitors who opened the alias are affected. | Low |
| **SEO** | The alias already canonicalizes to www, so the redirect only reinforces what the pages already declare. It does not touch the www site. | Low |

---

## 4. Implementation plan (for approval)

**Before:**

1. Owner: export Google Ads Final URLs of enabled ads and confirm none contains `vercel.app`. Confirm no external integration posts to the alias.
2. I re-run the read-only alias audit as the "before" baseline (456 of 456 currently 200).

**Option A steps (owner, in Vercel):**

1. vercel.com > team > project **hvac-service-ac-repair** > **Settings > Domains**.
2. Find the row **`hvac-service-ac-repair.vercel.app`**. Do not touch `www.hvacserviceacrepair.com` or `hvacserviceacrepair.com`.
3. **Edit** > **Redirect to** `www.hvacserviceacrepair.com` > status **308 Permanent Redirect** > **Save**.
4. If there is no Edit/Redirect option, stop and send a screenshot; switch to Option B.

**Option B steps (me, only if A is unavailable and you approve):** a branch with the single rule above, PR, Vercel preview check, standard checks, merge only with your approval, then the same verification.

**Verification (GitHub Actions, read-only), with expected results:**

1. `https://hvac-service-ac-repair.vercel.app/{path}` for all 456 sitemap paths: **one 308** to the exact `https://www.hvacserviceacrepair.com/{path}`, final 200.
2. www: 456 of 456 return 200 with self-canonicals (unchanged).
3. Query strings: `/?gclid=test123&utm_source=google` and `/ac-repair/anaheim?gclid=test123` on the alias redirect with the query intact.
4. Preview, branch and deployment URLs: still 302 to Vercel SSO with `noindex` (unchanged).
5. Apex: still one 308 to www (P0 unchanged).
6. All 181 Google Ads pages on www: 200 with GTM, `tel:` link and lead form; the standard 10 checks pass; no redirect loops.

**Rollback:**

- Option A: Settings > Domains > `hvac-service-ac-repair.vercel.app` > Edit > connect it back to Production (no redirect) > Save. Takes effect in minutes.
- Option B: revert the PR and redeploy.

Nothing has been implemented; this waits for your approval.
