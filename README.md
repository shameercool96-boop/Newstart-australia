# NewStart Australia

NewStart Australia is a mobile-first onboarding and survival dashboard for new international students arriving in Australia. It focuses on real first-month problems: phone, bank, TFN, transport, OSHC, rent, job search, budget pressure, scams, work limits, documents, and PR evidence planning.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Supabase-ready auth/database/storage layer
- Mock REST API routes for assistant, profile save, local tools, and document metadata
- Local demo persistence with `localStorage`

## Features

- Personalized onboarding wizard for country, city, visa type, budget, and goals
- Dashboard with pending tasks, money left, job status, document count, and progress
- First 7 Days checklist with official links and city-specific transport guidance
- Job & Income hub with job options, quick apply links, resume template, and earnings calculator
- Smart budget tracker with weekly summary, monthly projection, and overspending alerts
- Avoid Mistakes section for scams, illegal work limits, underpayment, overpriced rentals, and tax errors
- ChatGPT-style AI assistant using a mock `/api/assistant` route
- Local life tools with supermarkets, transport, cheap food spots, and Google Maps search links
- Document vault demo for passport, visa, TFN, COE, and OSHC metadata
- PR pathway tracker for 482, 189, and 190 evidence checklists

## Folder Structure

```txt
newstart-australia/
  public/
    app-icon.png
    welcome-banner.jpg
    resume-template.txt
  src/
    app/
      api/
        assistant/route.ts
        documents/route.ts
        local-tools/route.ts
        profile/route.ts
      globals.css
      layout.tsx
      page.tsx
    components/
      ui/
      app-shell.tsx
      onboarding-wizard.tsx
      dashboard-view.tsx
      checklist-view.tsx
      jobs-view.tsx
      budget-view.tsx
      mistakes-view.tsx
      assistant-view.tsx
      local-life-view.tsx
      document-vault-view.tsx
      pr-tracker-view.tsx
    data/
      demo.ts
    hooks/
      use-local-storage.ts
    lib/
      storage.ts
      supabase.ts
      types.ts
      utils.ts
  supabase.schema.sql
```

## Run Locally

```bash
cd newstart-australia
npm install
npm run dev
```

Open `http://localhost:3000`.

## Optional Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-key
```

4. Run `supabase.schema.sql` in the Supabase SQL editor.
5. Create a private storage bucket for student documents.
6. Replace the mock calls in `src/lib/storage.ts` and the route handlers with Supabase inserts/uploads.

## Deploy on Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Framework preset: Next.js.
4. Add the same environment variables from `.env.local`.
5. Deploy.

## Future Features

- Student community chat by city and university
- Safe marketplace for second-hand furniture and textbooks
- Internship matching by course, skills, and suburb
- Verified rental reports from students
- Visa-hours tracker with roster import
- Real Google Places integration for nearby food, groceries, and services
- AI resume reviewer tuned for Australian casual jobs
