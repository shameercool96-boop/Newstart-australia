-- NewStart Australia baseline schema.
-- Run this in Supabase SQL editor after enabling Auth.

create table if not exists public.student_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  country text not null,
  city text not null,
  visa_type text not null,
  budget_range text not null,
  goals text[] not null default '{}',
  arrival_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.checklist_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, item_id)
);

create table if not exists public.budget_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  planned numeric(10, 2) not null default 0,
  spent numeric(10, 2) not null default 0,
  week_start date not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.document_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null,
  file_name text not null,
  storage_path text,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.pr_pathway_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  checkpoint_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, checkpoint_id)
);

alter table public.student_profiles enable row level security;
alter table public.checklist_progress enable row level security;
alter table public.budget_entries enable row level security;
alter table public.document_records enable row level security;
alter table public.pr_pathway_progress enable row level security;

create policy "Users manage own profile"
on public.student_profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users manage own checklist"
on public.checklist_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own budget"
on public.budget_entries
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own documents"
on public.document_records
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own PR progress"
on public.pr_pathway_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
