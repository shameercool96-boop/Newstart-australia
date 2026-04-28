"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  AlertTriangle,
  Bot,
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  ClipboardCheck,
  Home,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Target,
  WalletCards
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Brand } from "@/components/brand";
import { AlertCard, BudgetRing, MetricCard, StepCard, TaskCard } from "@/components/focus-ui";
import { Button, LinkButton } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { CHECKLIST_ITEMS, DEFAULT_BUDGET, DEFAULT_JOB_PLAN } from "@/data/demo";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { BudgetCategory, DocumentRecord, JobPlan, StudentProfile } from "@/lib/types";
import { clamp, cn, currency } from "@/lib/utils";

type AppView = "home" | "tasks" | "money" | "assistant";
type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const DEFAULT_PROFILE: StudentProfile = {
  country: "India",
  city: "Melbourne",
  visaType: "Student visa subclass 500",
  budgetRange: "$350-$550/week",
  goals: ["job", "study"]
};

const NAV_ITEMS: { id: AppView; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "tasks", label: "Tasks", icon: ClipboardCheck },
  { id: "money", label: "Money", icon: WalletCards },
  { id: "assistant", label: "Assistant", icon: Bot }
];

const TASK_META: Record<string, { title: string; time: string; steps: string[] }> = {
  "sim-card": {
    title: "Get SIM Card",
    time: "5 min",
    steps: ["Compare prepaid plans", "Use passport as ID", "Save your new number"]
  },
  "bank-account": {
    title: "Open Bank Account",
    time: "20 min",
    steps: ["Choose a student account", "Set up PayID", "Keep login codes private"]
  },
  tfn: {
    title: "Get Your TFN",
    time: "10 min",
    steps: ["Use the ATO website", "Enter your visa details", "Save the postal address"]
  },
  "transport-card": {
    title: "Set Transport",
    time: "7 min",
    steps: ["Find your city card", "Check student concessions", "Save home and campus"]
  },
  oshc: {
    title: "Check OSHC",
    time: "8 min",
    steps: ["Download insurer app", "Save policy number", "Find a nearby clinic"]
  },
  "rental-basics": {
    title: "Avoid Rental Traps",
    time: "12 min",
    steps: ["Inspect before paying", "Get a written agreement", "Keep bond receipts"]
  }
};

const STORY_SECTIONS = [
  {
    title: "Your first 7 days.",
    line: "One step at a time.",
    metric: "6 tasks",
    icon: ClipboardCheck
  },
  {
    title: "Earn smarter.",
    line: "Track hours before shifts.",
    metric: "48h limit",
    icon: Target
  },
  {
    title: "Track every dollar.",
    line: "See pressure early.",
    metric: "$ left",
    icon: CircleDollarSign
  },
  {
    title: "Avoid costly mistakes.",
    line: "Short warnings. Clear action.",
    metric: "3 alerts",
    icon: ShieldAlert
  }
];

const QUICK_PROMPTS = ["What to do first", "Find me a job", "How to save money"];

export function AppShell() {
  const [activeView, setActiveView] = useState<AppView>("home");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [focusMode, setFocusMode, focusLoaded] = useLocalStorage<boolean>(
    "newstart:focusMode",
    true
  );
  const [profile, , profileLoaded] = useLocalStorage<StudentProfile | null>(
    "newstart:profile",
    null
  );
  const [completedTasks, setCompletedTasks, tasksLoaded] = useLocalStorage<string[]>(
    "newstart:completedTasks",
    ["sim-card", "bank-account"]
  );
  const [budget, setBudget] = useLocalStorage<BudgetCategory[]>("newstart:budget", DEFAULT_BUDGET);
  useLocalStorage<JobPlan>("newstart:jobPlan", DEFAULT_JOB_PLAN);
  useLocalStorage<DocumentRecord[]>("newstart:documents", []);

  const loaded = focusLoaded && profileLoaded && tasksLoaded;
  const workingProfile = profile ?? DEFAULT_PROFILE;
  const totalPlanned = budget.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = budget.reduce((sum, item) => sum + item.spent, 0);
  const moneyLeft = totalPlanned - totalSpent;
  const progress = Math.round((completedTasks.length / CHECKLIST_ITEMS.length) * 100);
  const nextTask = useMemo(
    () => CHECKLIST_ITEMS.find((item) => !completedTasks.includes(item.id)) ?? CHECKLIST_ITEMS[0],
    [completedTasks]
  );

  function startTask(taskId = nextTask.id) {
    setSelectedTaskId(taskId);
    setActiveView("tasks");
  }

  function toggleTask(taskId: string) {
    setCompletedTasks((current) =>
      current.includes(taskId) ? current.filter((item) => item !== taskId) : [...current, taskId]
    );
  }

  if (!loaded) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-6">
        <div className="apple-card w-full max-w-sm rounded-[28px] p-6 text-center">
          <Image
            src="/app-icon.png"
            width={64}
            height={64}
            alt="NewStart Australia"
            className="mx-auto rounded-full"
            priority
          />
          <p className="mt-5 text-lg font-semibold">Preparing your calm dashboard</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppleNav
        activeView={activeView}
        focusMode={focusMode}
        onNavigate={(view) => {
          setActiveView(view);
          setAssistantOpen(false);
        }}
        onToggleFocus={() => setFocusMode((current) => !current)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        >
          {activeView === "home" && (
            <HomeView
              focusMode={focusMode}
              profile={workingProfile}
              completedTasks={completedTasks}
              moneyLeft={moneyLeft}
              progress={progress}
              nextTask={nextTask}
              onStartTask={startTask}
              onNavigate={setActiveView}
            />
          )}
          {activeView === "tasks" && (
            <TasksView
              focusMode={focusMode}
              selectedTaskId={selectedTaskId}
              completedTasks={completedTasks}
              onSelectTask={setSelectedTaskId}
              onToggleTask={toggleTask}
              onClearTask={() => setSelectedTaskId(null)}
            />
          )}
          {activeView === "money" && <MoneyView budget={budget} onChange={setBudget} />}
          {activeView === "assistant" && <AssistantScreen profile={workingProfile} />}
        </motion.div>
      </AnimatePresence>

      {activeView !== "assistant" && (
        <FloatingAssistant
          open={assistantOpen}
          profile={workingProfile}
          onOpenChange={setAssistantOpen}
        />
      )}

      <Footer />
      <MobileNav activeView={activeView} onNavigate={setActiveView} />
    </main>
  );
}

function AppleNav({
  activeView,
  focusMode,
  onNavigate,
  onToggleFocus
}: {
  activeView: AppView;
  focusMode: boolean;
  onNavigate: (view: AppView) => void;
  onToggleFocus: () => void;
}) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 90],
    ["rgba(245,245,247,0.52)", "rgba(255,255,255,0.9)"]
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 90],
    ["0 0 0 rgba(0,0,0,0)", "0 18px 50px rgba(0,0,0,0.08)"]
  );

  return (
    <motion.header
      style={{ backgroundColor, boxShadow }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/60 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button onClick={() => onNavigate("home")} aria-label="Go home">
          <Brand compact />
        </button>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                activeView === id
                  ? "bg-slate-950 text-white"
                  : "text-muted hover:bg-black/5 hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={onToggleFocus}
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
            focusMode ? "bg-mint/12 text-mint" : "bg-black/5 text-muted"
          )}
          aria-pressed={focusMode}
        >
          <Sparkles className="h-4 w-4" />
          Focus {focusMode ? "On" : "Off"}
        </button>
      </div>
    </motion.header>
  );
}

function HomeView({
  focusMode,
  profile,
  completedTasks,
  moneyLeft,
  progress,
  nextTask,
  onStartTask,
  onNavigate
}: {
  focusMode: boolean;
  profile: StudentProfile;
  completedTasks: string[];
  moneyLeft: number;
  progress: number;
  nextTask: (typeof CHECKLIST_ITEMS)[number];
  onStartTask: (taskId?: string) => void;
  onNavigate: (view: AppView) => void;
}) {
  const remaining = CHECKLIST_ITEMS.length - completedTasks.length;
  const nextMeta = TASK_META[nextTask.id] ?? {
    title: nextTask.title,
    time: "10 min",
    steps: nextTask.steps.slice(0, 3)
  };

  return (
    <div className="pt-16">
      <section
        id="home"
        className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-sm font-semibold text-teal">NewStart Australia</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Start Your Life in Australia — The Right Way
          </h1>
          <p className="mt-5 text-xl text-muted">Everything you need. One app.</p>
          <div className="mt-8">
            <Button onClick={() => onStartTask(nextTask.id)}>Get Started</Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="apple-card rounded-[36px] p-5 sm:p-7"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted">Focus for {profile.city}</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight">Do this now</h2>
            </div>
            <Image
              src="/app-icon.png"
              width={52}
              height={52}
              alt="NewStart Australia icon"
              className="rounded-full"
              priority
            />
          </div>

          <div className="mt-7 rounded-[28px] bg-slate-950 p-5 text-white">
            <p className="text-sm text-white/62">Next task</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">{nextMeta.title}</h3>
            <p className="mt-2 text-sm text-white/64">{nextMeta.time}</p>
            <button
              onClick={() => onStartTask(nextTask.id)}
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
            >
              Start task
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MiniStat label="Tasks" value={`${remaining} left`} />
            <MiniStat label="Money" value={currency(moneyLeft)} />
            <MiniStat label="Ready" value={`${progress}%`} />
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 sm:px-6 md:grid-cols-3">
        <MetricCard icon={ClipboardCheck} label="Today’s tasks" value={`${remaining}`} />
        <MetricCard
          icon={WalletCards}
          label="Money left this week"
          value={currency(moneyLeft)}
          tone={moneyLeft < 0 ? "text-coral" : "text-mint"}
        />
        <MetricCard icon={CheckCircle2} label="Progress" value={`${progress}%`} tone="text-lilac" />
      </section>

      {!focusMode && (
        <>
          <StorySections />
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-teal">Warnings</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight">Short and serious.</h2>
              </div>
              <Button variant="secondary" onClick={() => onNavigate("tasks")}>
                View tasks
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <AlertCard icon={AlertTriangle} title="Never pay rent before inspection" />
              <AlertCard icon={ShieldAlert} title="Track work hours every week" />
              <AlertCard icon={CheckCircle2} title="Use official TFN website only" />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function StorySections() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-5">
        {STORY_SECTIONS.map(({ title, line, metric, icon: Icon }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.48, delay: index * 0.04 }}
            className="grid min-h-[330px] items-center gap-8 rounded-[36px] bg-white p-7 shadow-[0_28px_90px_rgba(0,0,0,0.07)] md:grid-cols-[1fr_0.8fr] md:p-10"
          >
            <div>
              <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                {title}
              </h2>
              <p className="mt-4 text-xl text-muted">{line}</p>
            </div>
            <div className="rounded-[32px] bg-slate-50 p-6">
              <Icon className="h-8 w-8 text-teal" />
              <p className="mt-16 text-5xl font-semibold tracking-tight">{metric}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function TasksView({
  focusMode,
  selectedTaskId,
  completedTasks,
  onSelectTask,
  onToggleTask,
  onClearTask
}: {
  focusMode: boolean;
  selectedTaskId: string | null;
  completedTasks: string[];
  onSelectTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onClearTask: () => void;
}) {
  const selectedTask = CHECKLIST_ITEMS.find((item) => item.id === selectedTaskId);
  const focusTask = CHECKLIST_ITEMS.find((item) => !completedTasks.includes(item.id)) ?? CHECKLIST_ITEMS[0];

  if (selectedTask) {
    return (
      <TaskStepScreen
        task={selectedTask}
        done={completedTasks.includes(selectedTask.id)}
        onBack={onClearTask}
        onDone={() => onToggleTask(selectedTask.id)}
      />
    );
  }

  if (focusMode) {
    const meta = TASK_META[focusTask.id] ?? {
      title: focusTask.title,
      time: "10 min",
      steps: focusTask.steps.slice(0, 3)
    };

    return (
      <section className="mx-auto max-w-4xl px-4 pb-28 pt-28 sm:px-6">
        <div className="apple-card rounded-[36px] p-6 text-center sm:p-10">
          <p className="text-sm font-semibold text-mint">Focus Mode</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-5xl font-semibold tracking-tight">
            {meta.title}
          </h1>
          <p className="mt-4 text-xl text-muted">{meta.time}</p>
          <Button onClick={() => onSelectTask(focusTask.id)} className="mt-8">
            Start task
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-28 pt-28 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-teal">First 7 days</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">One task at a time.</h1>
        <p className="mt-4 text-xl text-muted">Tap a card. Finish the steps.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CHECKLIST_ITEMS.map((task, index) => {
          const meta = TASK_META[task.id] ?? {
            title: task.title,
            time: "10 min",
            steps: task.steps.slice(0, 3)
          };

          return (
            <TaskCard
              key={task.id}
              index={index + 1}
              title={meta.title}
              meta={meta.time}
              done={completedTasks.includes(task.id)}
              onStart={() => onSelectTask(task.id)}
            />
          );
        })}
      </div>
    </section>
  );
}

function TaskStepScreen({
  task,
  done,
  onBack,
  onDone
}: {
  task: (typeof CHECKLIST_ITEMS)[number];
  done: boolean;
  onBack: () => void;
  onDone: () => void;
}) {
  const meta = TASK_META[task.id] ?? {
    title: task.title,
    time: "10 min",
    steps: task.steps.slice(0, 3)
  };
  const firstLink = task.links[0];

  return (
    <section className="mx-auto max-w-5xl px-4 pb-28 pt-28 sm:px-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-muted transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Tasks
      </button>

      <div className="mt-5 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="apple-card rounded-[32px] p-6">
          <p className="text-sm font-semibold text-teal">{meta.time}</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">{meta.title}</h1>
          <div className="mt-7">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Step progress</span>
              <span className="font-semibold">{done ? "100%" : "40%"}</span>
            </div>
            <ProgressBar value={done ? 100 : 40} className="mt-3" />
          </div>
          <Button
            onClick={onDone}
            className="mt-8 w-full"
            icon={done ? <CheckCircle2 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          >
            {done ? "Done" : "Mark done"}
          </Button>
          {firstLink && (
            <LinkButton href={firstLink.href} variant="secondary" className="mt-3 w-full">
              Open official link
            </LinkButton>
          )}
        </aside>

        <ol className="grid content-start gap-4">
          {meta.steps.slice(0, 5).map((step, index) => (
            <StepCard key={step} index={index + 1}>
              {step}
            </StepCard>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MoneyView({
  budget,
  onChange
}: {
  budget: BudgetCategory[];
  onChange: (budget: BudgetCategory[]) => void;
}) {
  const [editing, setEditing] = useState(false);
  const totalPlanned = budget.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = budget.reduce((sum, item) => sum + item.spent, 0);
  const weeklyLeft = totalPlanned - totalSpent;
  const overspending = budget.find((item) => item.spent > item.planned);

  function updateSpent(id: string, value: number) {
    onChange(
      budget.map((item) =>
        item.id === id
          ? {
              ...item,
              spent: Math.max(0, value)
            }
          : item
      )
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-28 pt-28 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="apple-card rounded-[36px] p-6 sm:p-8">
          <p className="text-sm font-semibold text-teal">This week</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">
            {currency(weeklyLeft)} left
          </h1>
          <p className="mt-4 text-xl text-muted">Keep spending calm.</p>
          <div className="mt-8">
            <BudgetRing spent={totalSpent} planned={totalPlanned} />
          </div>
          <Button onClick={() => setEditing((current) => !current)} className="mt-8 w-full">
            {editing ? "Done editing" : "Update spend"}
          </Button>
        </div>

        <div className="grid content-start gap-4">
          {overspending && (
            <AlertCard icon={AlertTriangle} title={`${overspending.label} is over budget`} />
          )}

          {budget.map((item) => {
            const usage = item.planned ? clamp((item.spent / item.planned) * 100) : 0;
            const over = item.spent > item.planned;

            return (
              <motion.article
                key={item.id}
                layout
                className="apple-card rounded-[28px] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{item.label}</h2>
                    <p className={cn("mt-1 text-sm", over ? "text-coral" : "text-muted")}>
                      {currency(item.spent)} of {currency(item.planned)}
                    </p>
                  </div>
                  <span className="text-2xl font-semibold">{Math.round(usage)}%</span>
                </div>
                <ProgressBar
                  value={usage}
                  tone={over ? "coral" : item.tone}
                  className="mt-5 bg-slate-100"
                />
                <AnimatePresence>
                  {editing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label className="mt-5 grid gap-2">
                        <span className="text-sm font-medium text-muted">Spent</span>
                        <input
                          type="range"
                          min={0}
                          max={Math.max(item.planned * 1.5, item.spent, 50)}
                          value={item.spent}
                          onChange={(event) => updateSpent(item.id, Number(event.target.value))}
                          className="accent-teal"
                        />
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AssistantScreen({ profile }: { profile: StudentProfile }) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-28 pt-28 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-teal">AI assistant</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">Ask one thing.</h1>
        <p className="mt-4 text-xl text-muted">Short answers. Practical steps.</p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <AssistantChat profile={profile} />
      </div>
    </section>
  );
}

function AssistantChat({ profile, compact = false }: { profile: StudentProfile; compact?: boolean }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant" as const,
      content: "What do you need today?"
    }
  ]);

  async function sendMessage(message = input) {
    const clean = message.trim();

    if (!clean || isLoading) {
      return;
    }

    setInput("");
    setMessages((current) => [...current, { role: "user" as const, content: clean }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: clean,
          city: profile.city,
          visaType: profile.visaType,
          budgetRange: profile.budgetRange,
          goals: profile.goals
        })
      });
      const data = (await response.json()) as { answer: string };
      setMessages((current) => [...current, { role: "assistant" as const, content: data.answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant" as const,
          content: "Try again in a moment."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("apple-card flex flex-col rounded-[32px] p-4", compact ? "h-[500px]" : "min-h-[620px]")}>
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-slate-200"
          >
            {prompt}
          </button>
        ))}
      </div>
      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto py-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[86%] whitespace-pre-line rounded-[22px] px-4 py-3 text-sm leading-6",
                message.role === "user"
                  ? "bg-teal text-white"
                  : "bg-slate-100 text-foreground"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && <p className="text-sm text-muted">Thinking...</p>}
      </div>
      <form
        className="flex gap-2 border-t border-slate-200 pt-4"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask here"
          className="min-h-12 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-teal"
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}

function FloatingAssistant({
  open,
  profile,
  onOpenChange
}: {
  open: boolean;
  profile: StudentProfile;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="mb-3 w-[min(92vw,390px)]"
          >
            <AssistantChat profile={profile} compact />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => onOpenChange(!open)}
        className="ml-auto flex min-h-14 items-center gap-3 rounded-full bg-slate-950 px-5 font-semibold text-white shadow-[0_22px_60px_rgba(0,0,0,0.22)]"
      >
        <MessageCircle className="h-5 w-5" />
        Ask
      </motion.button>
    </div>
  );
}

function MobileNav({
  activeView,
  onNavigate
}: {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}) {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 gap-1 rounded-[28px] border border-white/70 bg-white/90 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:hidden">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={cn(
            "grid min-h-14 place-items-center rounded-[22px] px-1 text-[11px] font-semibold transition",
            activeView === id ? "bg-slate-950 text-white" : "text-muted"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] bg-slate-50 p-4">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f0f0f2] px-4 pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>NewStart Australia</p>
        <div className="flex gap-5">
          <a href="#home">Home</a>
          <a href="https://www.studyaustralia.gov.au/" target="_blank" rel="noreferrer">
            Study Australia
          </a>
          <a href="https://www.scamwatch.gov.au/" target="_blank" rel="noreferrer">
            Scamwatch
          </a>
        </div>
      </div>
    </footer>
  );
}
