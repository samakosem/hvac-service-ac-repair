# Phase 2.3 data inputs: exact export formats

Put the exports in this folder with **exactly these file names**, then run:

```
python3 scripts/seo-audit/phase23_decide.py docs/seo-phase-2/phase23-metrics.json docs/seo-phase-2 --inputs docs/seo-phase-2/gsc-input
```

The script fills every `N/A` column in `PHASE_2_3_PAGE_DECISIONS.csv`, applies gate G1 to every paused candidate, writes `PHASE_2_3_QUERY_OVERLAP.csv` and reports what it loaded in `PHASE_2_3_DATA_STATUS.md`. It changes nothing on the site.

Nothing in `templates/` is read; those files only show the header row.

**Privacy:** GSC, Ads and analytics exports are business data. A `.gitignore` in this folder keeps every CSV here out of Git (except `templates/`), so the exports can sit in the folder for the script without being committed. Remove that rule only if you want the data in the repository.

---

## Date ranges

Use two **custom** ranges of exactly 90 days each, ending yesterday, and use the same dates in every export:

| Name in file | Range (example if run on 2026-10-19) |
|---|---|
| `last_90d` | 2026-07-20 to 2026-10-17 |
| `prev_90d` | 2026-04-21 to 2026-07-19 |

Do not use the "Compare" mode in the GSC interface. Export each range separately: compare-mode exports use different column names.

## Which GSC property

Use the **Domain property** (`hvacserviceacrepair.com`) if it exists: it covers www and non-www together. If only URL-prefix properties exist, export from `https://www.hvacserviceacrepair.com/` and also provide file 9 from `https://hvacserviceacrepair.com/`.

## Search type and filters

Search type **Web**. No query, page, country or device filters.

---

## Required files

### 1. `gsc_pages_last_90d.csv` and 2. `gsc_pages_prev_90d.csv` (required)

GSC > Performance > Search results > date range > **Pages** tab > Export > Download CSV. The download is a ZIP; use the file named `Pages.csv` inside it, renamed.

```
Top pages,Clicks,Impressions,CTR,Position
https://www.hvacserviceacrepair.com/,40,2310,1.73%,12.4
https://www.hvacserviceacrepair.com/air-conditioning/ac-repair/yorba-linda,6,512,1.17%,15.2
```

- One row per URL. Full URLs as GSC gives them (either host, with or without trailing slash; the script normalizes).
- `Clicks` and `Impressions` integers (thousands separators are fine); `CTR` with or without `%`; `Position` decimal.
- **Row limit:** the interface exports at most 1,000 rows. The site has 461 URLs, so this should be complete; if the file has 1,000 rows the script warns, because a page missing from a capped export cannot be read as zero impressions.

### 3. `gsc_query_page_last_90d.csv` (required for the cannibalization test)

The GSC interface cannot export query and page together. Use **one** of:

- **Search Console API** (`searchanalytics.query`, `dimensions: ["query","page"]`, `searchType: "web"`, `rowLimit: 25000`, paging with `startRow`).
- **Looker Studio** with the Search Console connector, table type "URL Impression", dimensions *Query* and *Landing Page*, metrics *Url Clicks*, *Impressions*, *Average Position*; export the table to CSV.
- **Google Sheets add-on "Search Analytics for Sheets"**, grouped by Query and Page.

Exact header (lowercase is fine; the order does not matter):

```
query,page,clicks,impressions,ctr,position
ac repair yorba linda,https://www.hvacserviceacrepair.com/,5,300,1.67%,8.2
ac repair yorba linda,https://www.hvacserviceacrepair.com/air-conditioning/ac-repair/yorba-linda,1,120,0.83%,14.0
```

GSC hides anonymized queries; totals here will be lower than in file 1. That is expected.

### 4. `gsc_links_top_pages.csv` (required to clear any candidate)

GSC > Links > External links > **Top linked pages** > More > Export > CSV.

```
Top target pages,Incoming links,Linking sites
https://www.hvacserviceacrepair.com/,54,12
```

Without this file every candidate stays PAUSED, because G1 protects any page with external links.

### 5. `ads_landing_pages_last_90d.csv` (required to clear any Google Ads page)

Google Ads > Campaigns > Insights and reports > **Landing pages** (or Reports > Predefined > Landing page) > range `last_90d` > Download CSV. Columns needed: *Landing page* (or *Expanded landing page*), *Clicks*, *Impr.*; *Conversions* if present. The two title rows and the `Total:` rows Google Ads adds are skipped automatically.

```
Landing page report
"July 20, 2026 - October 17, 2026"
Landing page,Clicks,Impr.,Cost,Conversions
https://www.hvacserviceacrepair.com/ac-repair/anaheim,25,900,$210.00,3.00
```

Without this file the 175 generated Ads pages stay PROTECTED. Please also send the list of **final URLs of all enabled ads** (Ads > Ads > columns: Final URL, Status; filter Status = Enabled): a page that is a final URL but received no impressions in the period does not appear in the landing-page report.

---

## Recommended files

### 6. `gsc_queries_last_90d.csv` and 7. `gsc_queries_prev_90d.csv`

Same as files 1 and 2 but the **Queries** tab (`Queries.csv` inside the ZIP).

```
Top queries,Clicks,Impressions,CTR,Position
ac repair yorba linda,6,420,1.43%,9.8
```

### 8. Index coverage: `gsc_indexing.csv` **or** the folder `gsc_indexing/`

Either one combined file:

```
url,status,reason,last_crawled
https://www.hvacserviceacrepair.com/hvac-repair/brea,Not indexed,Crawled - currently not indexed,2026-09-01
https://www.hvacserviceacrepair.com/,Indexed,,2026-10-15
```

or the raw GSC exports: Indexing > Pages > click each reason in "Why pages aren't indexed" > Export; plus "View data about indexed pages" > Export. Save each ZIP's `Table.csv` into `gsc_indexing/` named after the reason, e.g. `gsc_indexing/Crawled - currently not indexed.csv`, `gsc_indexing/Duplicate, Google chose different canonical than user.csv`, and `gsc_indexing/Indexed.csv` for the indexed list. Header as GSC exports it:

```
URL,Last crawled
https://www.hvacserviceacrepair.com/hvac-repair/brea,2026-09-01
```

GSC lists at most 1,000 example URLs per reason.

### 9. `gsc_pages_nonwww_last_90d.csv` (only if a separate non-www URL-prefix property exists)

Same format as file 1, exported from `https://hvacserviceacrepair.com/`. Used for the www vs non-www history (audit section 7).

### 10. `conversions_by_landing_page_last_90d.csv`

GA4 > Reports > Engagement > **Landing page** > range `last_90d` > Share > Download CSV (the `#` comment lines GA4 adds are skipped). Or a call-tracking export with the same two columns.

```
Landing page + query string,Sessions,Key events
/,500,30
/air-conditioning/ac-repair/yorba-linda,80,4
```

Any page with conversions is protected by G1.

---

## What the script does with the data (gate G1)

| Situation | Candidate status |
|---|---|
| Files 1, 2 or 4 missing | **PAUSED** (MERGE+301 candidates) or **PROTECTED** (Ads pages) |
| File 5 missing | Ads pages stay **PROTECTED** |
| 1+ click or 100+ impressions in either period, or any external link, or any conversion | **WITHDRAWN**: the page is improved instead |
| Ads page with paid clicks in the last 90 days | **PROTECTED** (organic noindex only with Ads manager sign-off) |
| Passes every check | **ELIGIBLE FOR REVIEW**: still needs your explicit approval before anything changes |

Column-name matching is case-insensitive and tolerant of the variants shown above. If a header is not recognised, the script stops and prints the first rows of the file so the problem is visible.
