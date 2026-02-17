# YoloCalc — Retire with memories, not just money.

The experience-first retirement calculator that shows which life experiences have closing windows — and what it costs to keep them open.

## Deploy to Render

### Option 1: Deploy via GitHub

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: YoloCalc landing page"
   git remote add origin https://github.com/YOUR_USERNAME/yolocalc.git
   git push -u origin main
   ```

2. Go to [render.com](https://render.com) → **New** → **Web Service**

3. Connect your GitHub repo

4. Settings will auto-populate from `render.yaml`, but verify:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

5. Click **Create Web Service** — your site will be live at `https://yolocalc.onrender.com`

### Option 2: Deploy via Render Blueprint

1. Push to GitHub (see above)
2. Go to: `https://render.com/deploy?repo=https://github.com/YOUR_USERNAME/yolocalc`
3. Click **Deploy**

## Local Development

```bash
npm install
npm start
# Open http://localhost:3000
```

## Architecture

- **Express** static server (for Render compatibility)
- **Single HTML file** with embedded CSS/JS (zero build step)
- **No database, no backend, no tracking** — pure static site
- **Fonts:** Instrument Serif + Outfit (Google Fonts)
- **Design:** Inspired by Squero/Nest — editorial, clean, confident whitespace
