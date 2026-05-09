# You Are My Story 🧲

**The Chase. Built for Crystal. By Your Demon. ❤️🧲❤️**

A 15-mode couples game app for the May 8–12 trip. Windermere → Pomeroy Kananaskis.

---

## What's in the box

15 game modes:
- **Stories** — Dr. Vaggers Travel Documentary + Beatrix Potter Field Guide
- **Road Trip** — 7-step sequencer that walks the drive
- **Match Game** — both write blind, reveal, score on agreement (51 prompts)
- **Trivia** — 80s/90s turn-based (25 questions)
- **This or That** — 45 pairs, sequential reveal
- **Finish the Lyric** — 20 fill-in-the-blanks
- **BCyder** — 60 flirty/spicy alternating prompts
- **Photo Challenge** — cute / funny / naughty prompts
- **Headliner / Stripper Name Generator** — slot-machine spin into Hall of Fame
- **Date Card** — 3-phase guided date with confetti finale
- **Soundtrack** — 5 Chase songs, expandable lore
- **Dashboard** — combined scoreboard + Vaggers commentary
- **Hall of Fame** — saved Headliners (localStorage)
- **WANNA peach game** — tap floating 🍑 (rare 🍆 + 🐔 spawns), per-player tally
- **Remember This** — photo + memory question, Demon judges Python
- **Silent Game** — 10-min no-talk; loser owes one favor

Plus: Dr. Vaggers slide-up pop-ins, Cluck Norris top-right pop-ins (~every 3 min),
floating WANNA button, Web Speech narration on stories, localStorage scoring.

---

## Stack

- **Next.js 15.0.3** (App Router, static export ready)
- **React 19 RC**
- **No database** — localStorage only (single-device or pass-the-phone)
- **Fonts** — Outfit + Cormorant Garamond (Google Fonts)
- **Photos** — `/public/images/` (see `public/images/README.txt`)

---

## Local quickstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # verify production build
```

---

## Deploy

See **`DEPLOYMENT-STEPS.md`** in this folder. Three paths:
1. Vercel CLI (fastest — 2 min)
2. Vercel dashboard drag-drop (no Git, 3 min)
3. GitHub → Vercel auto-deploy (2 min, gives you previews + photo updates without redeploys)

---

## Adding photos later

Photos are optional. The app shows emoji fallbacks for any missing image.
You can deploy NOW and add photos to the live site any time by either:
- Pushing them to the `public/images/` folder in your Git repo, OR
- Uploading them through the Vercel dashboard's file editor

Filename map: `public/images/README.txt`.

---

Goodnight my lil lover.
 Commit Changes
