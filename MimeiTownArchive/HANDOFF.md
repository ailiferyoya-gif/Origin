# Handoff

## Current State

Project: 未明町アーカイブ / Mimei Town Archive
Working path target: `D:\Codex\MimeiTownArchive`
Direction: A案, quiet realistic regional websites, Booth ZIP sale.

The brief is locked around an inherited investigation:
the player receives a deceased grandmother's archive and follows her unfinished inquiry
into Amamiya Mio's disappearance in the fictional seaside town of Mimei.

The first playable slice is implemented. Open `start.html` in a browser.
It includes the archive index, grandmother letter, investigation notebook,
and five distinct sites: town hall, newspaper archive, high school alumni page,
library OPAC, and folk museum archive. The first three sites were expanded with
ordinary non-critical content so the clues sit inside more believable pages.
The latest pass added many internal pages, a LINE-like recovered message log,
and a phone/voicemail gimmick. The phone answer is `2300918`, derived from
23:00 and the repeated 0918 suffix.
An iPhone support pass added safe-area handling, stabilized viewport height,
larger tap targets, table overflow handling, and a web manifest.
The latest expansion doubled the page count from 29 to 59 HTML pages by adding
six more site families: radio, weather, bus, tourism, blog, and forum logs.

## Created Documents

- `README.md`
- `docs/BRIEF.md`
- `docs/STORY_ENTRY.md`
- `docs/SITE_MAP.md`
- `docs/PUZZLE_FLOW.md`
- `docs/BOOTH_PACKAGE.md`
- `HANDOFF.md`

## Implemented Prototype Files

- `start.html`
- `read_me_first.html`
- `grandmother_letter.html`
- `notebook/index.html`
- `sites/town/index.html`
- `sites/town/notice-2006-0918.html`
- `sites/town/services.html`
- `sites/town/minutes-2006.html`
- `sites/town/road-closure-2006.html`
- `sites/town/guest-list-2006.html`
- `sites/newspaper/index.html`
- `sites/newspaper/local-200609.html`
- `sites/newspaper/classifieds.html`
- `sites/newspaper/weather-fog-20060915.html`
- `sites/newspaper/personnel-20060914.html`
- `sites/newspaper/article-traffic-20060917.html`
- `sites/newspaper/article-night-market.html`
- `sites/school/index.html`
- `sites/school/alumni-office.html`
- `sites/school/culture-festival-2006.html`
- `sites/school/history-club.html`
- `sites/library/index.html`
- `sites/library/record-k29.html`
- `sites/library/reference-2006.html`
- `sites/museum/index.html`
- `sites/museum/exhibit-third.html`
- `sites/museum/collection-m071.html`
- `messages/index.html`
- `phone/index.html`
- `sites/radio/index.html`
- `sites/radio/program-20060917.html`
- `sites/radio/voicemail-policy.html`
- `sites/radio/letters.html`
- `sites/radio/timetable.html`
- `sites/weather/index.html`
- `sites/weather/log-20060917.html`
- `sites/weather/fog-advisory.html`
- `sites/weather/tide-table.html`
- `sites/weather/observatory-notes.html`
- `sites/bus/index.html`
- `sites/bus/route-harbor.html`
- `sites/bus/timetable-20060917.html`
- `sites/bus/stop-library.html`
- `sites/bus/notice-detour.html`
- `sites/tourism/index.html`
- `sites/tourism/harbor-walk.html`
- `sites/tourism/festival.html`
- `sites/tourism/old-map.html`
- `sites/tourism/faq.html`
- `sites/blog/index.html`
- `sites/blog/post-20060910.html`
- `sites/blog/post-20060917.html`
- `sites/blog/comments-archive.html`
- `sites/blog/profile.html`
- `sites/forum/index.html`
- `sites/forum/thread-124.html`
- `sites/forum/thread-131.html`
- `sites/forum/user-mio.html`
- `sites/forum/rules.html`
- `assets/ui/styles.css`
- `assets/ui/notebook.css`
- `assets/ui/town.css`
- `assets/ui/newspaper.css`
- `assets/ui/school.css`
- `assets/ui/library.css`
- `assets/ui/museum.css`
- `assets/ui/messages.css`
- `assets/ui/iphone.css`
- `assets/ui/radio.css`
- `assets/ui/weather.css`
- `assets/ui/bus.css`
- `assets/ui/tourism.css`
- `assets/ui/blog.css`
- `assets/ui/forum.css`
- `assets/ui/app.js`
- `assets/ui/phone.js`
- `assets/ui/iphone.js`
- `manifest.webmanifest`
- `assets/generated/mimei-town-hall.png`
- `assets/generated/newspaper-archive-desk.png`
- `assets/generated/mimei-high-school-gate.png`
- `assets/generated/library-local-history-shelf.png`
- `assets/generated/museum-exhibit-room.png`

## Important Constraints

- Prefer `D:\Codex` for project work and backups.
- Backup before modifying existing files.
- Use ChatGPT-generated image assets.
- Character images must be transparent.
- No sprite sheets unless the user approves first.

## Next Work

1. Add the search-like page that discovers later sites from keywords.
2. Add a radio site for `灯台波` and connect it to the voicemail reveal.
3. Add weather and bus timetable sites for the disappearance timeline.
4. Expand Chapter 2 answer checks around K-29, M-071, and `明けない灯`.
5. Build staged hints as separate buyer-support pages.
6. Verify offline opening and mobile readability in browser.

## Open Design Decisions

- Exact final title may remain `未明町アーカイブ` or change after visual exploration.
- Final price should be decided after page count and art volume are known.
- Ending count is drafted as three, but can be reduced if production scope gets tight.
