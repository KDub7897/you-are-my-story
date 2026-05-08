# DEPLOYMENT STEPS — You Are My Story

**Trip starts TODAY.** Pick the path that matches what you've got in front of you.

---

## ⚡ PATH A — Vercel CLI (FASTEST, ~2 min)

Use this if you've got the project folder on a laptop with Node installed.

```bash
cd you-are-my-story
npx vercel --yes
```

That's it. First time it'll prompt:
1. Email (use your existing Vercel login from Ember)
2. Confirm scope (your account or team)
3. Link to existing project? **N**
4. Project name? `you-are-my-story` (or whatever)
5. Directory? `./` (just press enter)

Vercel auto-detects Next.js 15 and ships it. You get a live URL like
`https://you-are-my-story-abc123.vercel.app` in under 60 seconds.

**To deploy production after testing:**
```bash
npx vercel --prod
```

---

## 📦 PATH B — Vercel dashboard drag-drop (NO Git, ~3 min)

Use this from your phone or any browser. No CLI needed.

1. Go to **vercel.com/new**
2. Click **"Browse all templates"** → scroll to bottom → **"Deploy from zip"**
   *(or drag the project folder onto the page)*
3. Upload the **you-are-my-story.zip** I'm presenting to you below
4. Framework: Next.js (auto-detected)
5. Click **Deploy**

Live URL appears in 60–90 sec. Bookmark it.

⚠️ **Drag-drop deploys are one-shot** — to update photos or text later,
you'd re-upload the whole zip. PATH C below is better for updates.

---

## 🔁 PATH C — GitHub → Vercel auto-deploy (~2 min, BEST for updates)

Use this if you want to push photo updates from your phone later
without re-deploying the whole thing.

**One-time setup:**

1. Create empty repo on GitHub (call it `you-are-my-story` — keep it private)

2. From the project folder:
   ```bash
   cd you-are-my-story
   git init
   git add .
   git commit -m "Initial: built for Crystal"
   git branch -M main
   git remote add origin https://github.com/KDub7897/you-are-my-story.git
   git push -u origin main
   ```

3. Go to **vercel.com/new** → **Import Git Repository** → pick `you-are-my-story`
4. Click **Deploy**. Done.

**To add photos later** (from phone, in Kananaskis, on hotel wifi):
- Open the GitHub repo on your phone browser
- Tap into `public/images/`
- Tap **Add file → Upload files**
- Drop in your photos with the right filenames (see `public/images/README.txt`)
- Commit. Vercel auto-deploys in ~30 sec.

---

## 🍑 After deployment — what works without photos?

**Everything except photo-dependent visuals.** The app is built so missing
photos fall back to emojis. Test the deployed URL right away:

- ✅ All 15 game modes work
- ✅ Stories play with audio narration
- ✅ Scoring saves to localStorage
- ✅ WANNA peach game runs
- ✅ Dr. Vaggers pop-ins fire (with emoji 🦆 if photos not yet uploaded)
- ✅ Headliner Hall of Fame persists
- 🟡 Remember This game works but shows emoji placeholders until you upload
   `real-*.jpg` photos

So you can ship this RIGHT NOW and add photos from the road.

---

## 📲 On Crystal's phone

Once you've got the live URL:

1. Open it in Safari (iOS) or Chrome (Android)
2. **Add to Home Screen** so it gets the black status bar and full-screen feel
   - iOS: Share → Add to Home Screen
   - Android: ⋮ → Add to Home screen
3. Open from the icon. It'll behave like a native app.

The viewport meta is already locked (no zoom, no scroll bounce).

---

## 🚨 If something breaks on the road

**Build error during deploy?**
Check the Vercel build log. Most common: a typo in a photo filename in `page.js`.
Photos use `onError` fallback so they shouldn't break the build, only the visual.

**Photos not showing?**
- Filename must match EXACTLY (lowercase, hyphens, .jpg)
- Check the Vercel deployment's Files tab → `public/images/`
- See `public/images/README.txt` for the canonical map

**Want to edit a question or story while on the road?**
- If on PATH C (GitHub): edit `app/page.js` directly in the GitHub web editor.
  Search for `STORIES`, `MATCH`, `TRIVIA`, `REMEMBER` arrays etc.
- Commit. Vercel redeploys in 30 sec. No laptop needed.

---

## 🎯 Recommendation for TODAY

**PATH A if you've got a laptop** — fastest, get the URL in 2 min.
Then optionally do PATH C later for ongoing updates.

**PATH C if you've got 5 min and want to update photos from your phone all weekend.**

**PATH B only as a last resort** — fine for shipping but you can't update photos easily.

---

Goodnight my lil lover.
