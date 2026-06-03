# myGENE

> *Huwag matakot sa inyong karapatan.*

Friendly chat interface that makes Philippine law approachable. Powered by Batasko (bettergov.ph). Deployed for DMCV Law × DMCV Advisory.

## What it does

- Chat with myGENE in Filipino, English, or Taglish — auto-detected
- Structured legal answers: **Sitwasyon → Batas → Karapatan → Susunod na hakbang → Disclaimer**
- Emergency routing for VAWC, abuse, and safety situations — hotlines surface first
- Smart escalation: legal concerns route to DMCV Law QR; SME concerns route to DMCV Advisory QR
- Save conversations to myCHAT history

## Quick deploy to Vercel

**1.** Push this folder to a GitHub repository.

**2.** Go to [vercel.com/new](https://vercel.com/new), import the repo.

**3.** Add this environment variable in the Vercel project settings:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | Your key from [console.anthropic.com](https://console.anthropic.com) |

**4.** Click **Deploy**. Done.

That's it. Vercel auto-detects Next.js, builds, and ships. Your live URL appears in ~30 seconds.

## Local development

```bash
# Install
npm install

# Set up env
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
mygene-app/
├── app/
│   ├── layout.js              Root layout + metadata
│   ├── page.js                myGENE chat UI (client component)
│   └── api/
│       └── chat/
│           └── route.js       Claude API proxy (edge runtime, secures API key)
├── package.json
├── next.config.mjs
├── vercel.json
└── .env.example
```

- **Frontend**: Next.js 14 App Router + React 18, inline styles (no Tailwind dependency)
- **Backend**: One serverless edge function (`/api/chat`) that proxies to Anthropic. The API key never touches the browser.
- **AI**: Claude Sonnet 4 via `claude-sonnet-4-20250514`
- **Fonts**: Fraunces (serif) + Inter (sans), loaded from Google Fonts

## Customizing

### Change the model
`app/api/chat/route.js` → `model: "claude-sonnet-4-20250514"` → swap to any current model.

### Edit the system prompt
`app/api/chat/route.js` → the `SYSTEM` constant at the top. Tweak the format, language rules, emergency routing, or coverage as needed.

### Update the suggested questions
`app/page.js` → the `SUGGESTIONS` array.

### Point the QR escalation buttons elsewhere
`app/page.js` → the `QR_URLS` object. Replace with your real DMCV Law / DMCV Advisory destinations.

## Next moves (post-launch)

- **Embed as floating widget on Batasko.com** — wrap `app/page.js` in an iframe with a launcher button
- **Cite Batasko articles** — hook the system prompt into Batasko's article URL pattern
- **Save to myCHAT (real)** — replace the toast stub with a POST to `mydigicom.org` user history
- **POEA/OFW mode** — branch the system prompt when OFW context is detected, deepen RA 8042 / RA 10022 coverage

## License

Internal · DM Prime · DMCV Advisory Group · 2026
