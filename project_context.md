# NewStart Australia Project Context

Last updated: 2026-04-28

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Supabase-ready client and SQL schema for future auth, database, and storage
- Mock REST API routes for assistant, profile save, local tools, and document metadata
- Vercel production deployment

## Current Features

- Mobile-first dark glassmorphism interface for international students arriving in Australia.
- First-time onboarding wizard collecting country, Australian city, visa type, budget range, and goals.
- Personalized dashboard showing first-week task progress, money left, job activity, document count, and settlement progress.
- First 7 Days checklist covering SIM, bank account, TFN, local transport, OSHC/health basics, and rental safety.
- City-aware local transport guidance for Melbourne, Sydney, Brisbane, Perth, Adelaide, Canberra, Hobart, and Darwin.
- Job & Income Hub with student-friendly job tracks, quick apply links, resume template download, interview guidance, and earnings calculator.
- Smart Budget Tracker with rent, food, transport, subscriptions, savings, weekly summary, monthly projection, and overspending alerts.
- Avoid Mistakes section covering scams, work-hour limits, underpayment, tax/ABN confusion, and rental traps.
- AI helper route upgraded from fixed canned replies to a richer NewStart data assistant with city-aware answers, topic matching, practical guidance, and source links.
- Local Life Tools with supermarket ideas, cheap food spots, transport links, and Google Maps searches.
- Document Vault demo for passport, visa, TFN, COE, OSHC, and other metadata.
- PR Pathway Tracker covering 482, 189, and 190 pathway evidence checklists.
- Supabase schema file for profiles, checklist progress, budgets, document records, and PR progress.
- Production deployment live at https://newstart-australia.vercel.app.

## Completed Tasks

- Created the Next.js project structure from scratch.
- Added supplied app icon and welcome banner assets.
- Implemented reusable UI primitives for buttons, progress bars, empty states, skeletons, and branding.
- Built all requested product sections and connected them through a client-side app shell.
- Added localStorage persistence for demo profile, checklist, budget, job plan, document metadata, and PR progress.
- Added API routes for assistant, profile save, local tools, and document metadata.
- Added downloadable student resume template.
- Added Supabase-ready schema and environment example.
- Deployed to Vercel and corrected project framework settings to Next.js.
- Changed local and production build scripts to use Webpack because Turbopack is blocked by Windows process permissions in this environment.
- Upgraded the AI helper so it returns differentiated answers for TFN, jobs, resume, budget, rentals, visa hours, transport, OSHC, scams, PR, documents, bank, SIM, and pay-rate questions.
- Initialized this local folder as a Git repository and linked it to `https://github.com/shameercool96-boop/Newstart-australia.git`.

## Pending Tasks

- Connect real authentication using Supabase or Firebase.
- Replace localStorage demo persistence with authenticated database records.
- Connect Document Vault to private encrypted storage before collecting real passports, visas, TFN letters, or COE files.
- Add real Google Places/Maps API lookup instead of static city data and Google Maps search links.
- Add OpenAI/Vercel AI SDK integration for deeper AI responses and optional live web/tool grounding.
- Add tests for assistant routing, budget calculations, checklist persistence, and onboarding flow.
- Confirm GitHub/Vercel auto-deploy behavior from pushed commits and adjust project settings if needed.
- Add privacy policy, terms, and data retention copy before public real-user launch.
- Add analytics and error monitoring.

## Known Issues

- Git is available through GitHub Desktop's embedded Git at `C:\Users\shame\AppData\Local\GitHubDesktop\app-3.5.8\resources\app\git\cmd\git.exe`, but `git` is still not on PATH in this shell.
- The GitHub connector cannot write to the repository directly; it returns `403 Resource not accessible by integration`.
- Windows blocks some npm postinstall/native process execution in this session, requiring `--ignore-scripts` for dependency installation and direct `node.exe` invocation for some commands.
- Turbopack fails in this environment with `Access is denied` when spawning pooled Node processes; scripts use `next dev --webpack` and `next build --webpack`.
- The live Document Vault is demo-only and must not be used for real sensitive documents until secure auth and private storage are implemented.
- The AI helper is improved and source-linked but still not a true LLM/live-search assistant; it uses deterministic app-data routing.
