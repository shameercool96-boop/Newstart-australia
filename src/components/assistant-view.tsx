"use client";

import { Bot, Send, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import type { StudentProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const prompts = [
  "How do I get TFN?",
  "Hospitality jobs in my city",
  "Weekly food budget ideas",
  "Rental scam checklist",
  "Can I work 30 hours this week?",
  "Where should I buy groceries?",
  "PR pathway 189 vs 190"
];

export function AssistantView({ profile }: { profile: StudentProfile }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me about TFN, first jobs, saving money, visa work limits, rental checks, or what to do first in your city."
    }
  ]);

  async function sendMessage(message = input) {
    const clean = message.trim();
    if (!clean || isLoading) {
      return;
    }

    setInput("");
    setMessages((current) => [...current, { role: "user", content: clean }]);
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
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I could not reach the mock assistant endpoint. Check the dev server and try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
      <section className="glass rounded-[28px] p-5 sm:p-7">
        <Bot className="h-8 w-8 text-teal" />
        <p className="mt-5 text-sm font-semibold text-teal">AI assistant</p>
        <h1 className="mt-2 text-3xl font-semibold">Ask the questions students usually ask at midnight</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          This helper uses NewStart city data, official links, and practical rules. Live web search
          can be added later with OpenAI, Vercel AI SDK, or Google Maps APIs.
        </p>
        <div className="mt-6 grid gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="rounded-[16px] border border-white/15 bg-white/10 px-4 py-3 text-left text-sm transition hover:bg-white/10"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="glass flex min-h-[620px] flex-col rounded-[28px] p-4 sm:p-5">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-teal/15">
            <Sparkles className="h-5 w-5 text-teal" />
          </div>
          <div>
            <h2 className="font-semibold">NewStart helper</h2>
            <p className="text-xs text-muted">Mock API, city-aware for {profile.city}</p>
          </div>
        </div>

        <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto py-5">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal/15">
                  <Bot className="h-4 w-4 text-teal" />
                </div>
              )}
              <div
                className={`max-w-[82%] whitespace-pre-line rounded-[18px] px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-teal text-slate-950"
                    : "bg-white/10 text-slate-100"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
                  <UserRound className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-3 text-sm text-muted">
              <Bot className="h-4 w-4 animate-pulse text-teal" />
              Thinking through a practical answer...
            </div>
          )}
        </div>

        <form
          className="flex gap-2 border-t border-white/10 pt-4"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about TFN, jobs, rent, visa hours..."
            className="min-h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-sm outline-none transition placeholder:text-muted focus:border-teal"
          />
          <Button type="submit" disabled={isLoading} icon={<Send className="h-4 w-4" />}>
            Send
          </Button>
        </form>
      </section>
    </div>
  );
}
