import { NextResponse } from "next/server";
import {
  CHECKLIST_ITEMS,
  CITY_PROFILES,
  JOB_OPTIONS,
  MISTAKES,
  PATHWAYS,
  QUICK_STATS
} from "@/data/demo";
import type { City, Goal } from "@/lib/types";

type AssistantRequest = {
  message?: string;
  city?: City;
  visaType?: string;
  budgetRange?: string;
  goals?: Goal[];
};

type Source = {
  label: string;
  href: string;
};

const STUDENT_WORK_LIMIT = "48 hours per fortnight while your course is in session";

const officialSources = {
  atoTfn: {
    label: "ATO TFN application",
    href: "https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application"
  },
  fairWorkPay: {
    label: "Fair Work Pay Calculator",
    href: "https://calculate.fairwork.gov.au/"
  },
  fairWorkStudents: {
    label: "Fair Work international students",
    href: "https://www.fairwork.gov.au/tools-and-resources/fact-sheets/rights-and-obligations/international-students"
  },
  studyWork: {
    label: "Study Australia work rights",
    href: "https://www.studyaustralia.gov.au/en/work-in-australia/work-while-you-study"
  },
  studyTransport: {
    label: "Study Australia transport",
    href: "https://www.studyaustralia.gov.au/en/life-in-australia/getting-around"
  },
  scamwatch: {
    label: "Scamwatch",
    href: "https://www.scamwatch.gov.au/"
  },
  healthdirect: {
    label: "Healthdirect",
    href: "https://www.healthdirect.gov.au/"
  }
};

const jobAreas: Record<City, string[]> = {
  Melbourne: ["CBD", "Carlton", "Southbank", "Docklands", "Richmond", "Chadstone"],
  Sydney: ["CBD", "Haymarket", "Newtown", "Bondi Junction", "Parramatta", "Chatswood"],
  Brisbane: ["CBD", "South Bank", "Fortitude Valley", "West End", "Sunnybank", "Chermside"],
  Perth: ["CBD", "Northbridge", "Subiaco", "Fremantle", "Cannington", "Joondalup"],
  Adelaide: ["CBD", "North Adelaide", "Glenelg", "Norwood", "Mawson Lakes", "Chinatown"],
  Canberra: ["Civic", "Belconnen", "Dickson", "Woden", "Gungahlin", "Braddon"],
  Hobart: ["CBD", "Sandy Bay", "North Hobart", "Glenorchy", "Kingston", "Salamanca"],
  Darwin: ["CBD", "Casuarina", "Palmerston", "Parap", "Nightcliff", "Fannie Bay"]
};

const cityNames = Object.keys(CITY_PROFILES) as City[];

export async function POST(request: Request) {
  const body = (await request.json()) as AssistantRequest;
  const message = normalize(body.message ?? "");
  const city = cityNames.includes(body.city as City) ? (body.city as City) : "Melbourne";
  const cityProfile = CITY_PROFILES[city];
  const answer = buildAnswer({
    message,
    city,
    visaType: body.visaType ?? "Student visa subclass 500",
    budgetRange: body.budgetRange ?? "not set",
    goals: body.goals ?? []
  });

  await new Promise((resolve) => setTimeout(resolve, 350));

  return NextResponse.json({
    ...answer,
    city: cityProfile.city,
    engine:
      "NewStart data assistant. Uses local app data, city rules, official links, and generated guidance. Not a live web search or legal advice."
  });
}

function buildAnswer({
  message,
  city,
  visaType,
  budgetRange,
  goals
}: {
  message: string;
  city: City;
  visaType: string;
  budgetRange: string;
  goals: Goal[];
}) {
  const cityProfile = CITY_PROFILES[city];
  const seekUrl = `https://www.seek.com.au/part-time-student-jobs?where=${encodeURIComponent(city)}`;
  const indeedUrl = `https://au.indeed.com/jobs?q=part+time+student&l=${encodeURIComponent(city)}`;
  const mapsJobsUrl = `https://www.google.com/maps/search/hospitality+jobs+near+${encodeURIComponent(city)}`;
  const mapsFoodUrl = `https://www.google.com/maps/search/cheap+eats+near+${encodeURIComponent(city)}`;
  const mapsGroceryUrl = `https://www.google.com/maps/search/supermarket+near+${encodeURIComponent(city)}`;

  if (hasAny(message, ["tfn", "tax file number", "tax file", "tax number"])) {
    return response(
      "TFN plan",
      [
        `For ${city}, your TFN step is the same nationally: apply through the ATO only.`,
        "What to do:",
        "1. Wait until you are physically in Australia.",
        "2. Use the ATO foreign passport holder or temporary visitor TFN application.",
        "3. Use a stable postal address because the TFN notice is mailed.",
        "4. After you get a job, give your employer the TFN declaration. Do not send your TFN through random chat messages.",
        "Cost: Free.",
        "Timing: Usually allow up to a few weeks, so apply early."
      ],
      [officialSources.atoTfn]
    );
  }

  if (
    hasAny(message, ["job", "jobs", "work", "apply", "hiring", "near me", "part time"]) &&
    !hasAny(message, ["hour", "hours", "fortnight", "limit", "legal", "30", "40", "48"])
  ) {
    return response(
      `Part-time job plan for ${city}`,
      [
        `Best starting areas in ${city}: ${jobAreas[city].join(", ")}.`,
        "Most realistic student job tracks:",
        ...JOB_OPTIONS.map((job) => `- ${job.title}: ${job.fit}`),
        "Quick actions today:",
        "1. Make a one-page resume with suburb, phone number, availability, visa work rights, and 2 references.",
        `2. Search Seek: ${seekUrl}`,
        `3. Search Indeed: ${indeedUrl}`,
        `4. Walk into cafes, restaurants, supermarkets, and food courts around ${jobAreas[city].slice(0, 3).join(", ")} between 2pm and 5pm.`,
        `5. Track hours carefully: common Student visa limit is ${STUDENT_WORK_LIMIT}.`,
        "Red flags: unpaid trials, cash-only underpayment, employer asking for passport photos over WhatsApp, or shifts that breach visa limits."
      ],
      [
        officialSources.fairWorkPay,
        officialSources.fairWorkStudents,
        { label: "Google Maps hospitality search", href: mapsJobsUrl }
      ]
    );
  }

  if (hasAny(message, ["resume", "cv", "interview", "cover letter"])) {
    return response(
      "Resume and interview plan",
      [
        "For Australian casual jobs, keep the resume short and practical.",
        "Include:",
        "- Australian phone number and suburb",
        "- Visa work rights and weekly availability",
        "- Customer service, cleaning, POS, food handling, teamwork, and language skills",
        "- Any RSA, food handling, barista, first aid, or driving/bike delivery readiness",
        "Interview answers to prepare:",
        "1. Tell me about yourself.",
        "2. What days and hours can you work?",
        "3. How would you handle a difficult customer?",
        "4. Can you work weekends or late shifts?",
        "Use the Resume template button in Jobs & Income Hub to download the starter template."
      ],
      [officialSources.fairWorkStudents]
    );
  }

  if (hasAny(message, ["budget", "save", "saving", "money", "cheap", "food", "groceries", "supermarket"])) {
    return response(
      `Budget help for ${city}`,
      [
        `Your selected budget range: ${budgetRange}.`,
        `Cheaper grocery options in ${city}: ${cityProfile.supermarkets.join(", ")}.`,
        `Cheap food ideas: ${cityProfile.cheapFood.join(", ")}.`,
        "Fastest savings wins:",
        "1. Meal prep 3 dinners before the week starts.",
        "2. Put rent, transport, and phone plan in the tracker first. Spend from what is left.",
        "3. Avoid late-night rideshares unless it is a safety issue.",
        "4. Cancel duplicate subscriptions before buying new ones.",
        "5. Keep an emergency buffer before sending money home.",
        `Maps grocery search: ${mapsGroceryUrl}`,
        `Maps cheap eats search: ${mapsFoodUrl}`
      ],
      [cityProfile.mapsSearches[0], cityProfile.mapsSearches[1]]
    );
  }

  if (hasAny(message, ["rent", "rental", "room", "bond", "flat", "flatmate", "lease", "accommodation"])) {
    return response(
      "Rental safety checklist",
      [
        "Before paying rent or bond:",
        "1. Inspect the room or verify a real video inspection.",
        "2. Ask exactly how many people share the room, kitchen, and bathroom.",
        "3. Get written terms, rent amount, bills, bond amount, notice period, and house rules.",
        "4. Do not send bond to a private account without paperwork.",
        "5. Check travel time to campus and late-night work locations.",
        "6. Take photos on move-in day and keep a condition record.",
        "Warning signs: urgent payment pressure, no inspection, rent far below market, refusal to provide written agreement, or asking for passport scans in chat."
      ],
      [officialSources.scamwatch, { label: "Flatmates", href: "https://flatmates.com.au/" }]
    );
  }

  if (hasAny(message, ["visa", "hours", "48", "fortnight", "30 hours", "40 hours", "work limit", "limit"])) {
    return response(
      "Student work-hours check",
      [
        `Your selected visa: ${visaType}.`,
        `Common Student visa rule: ${STUDENT_WORK_LIMIT}. Course breaks can have different rules.`,
        "How to stay safe:",
        "1. Track paid hours from every employer and every gig app in one place.",
        "2. Count the fortnight, not just each week.",
        "3. Save rosters, payslips, and shift messages.",
        "4. If your roster would go over the limit, ask the employer to change it in writing.",
        "5. Check your own visa grant notice because conditions can vary.",
        "Example: 30 hours every week during study period is 60 hours per fortnight, which may be over the common limit."
      ],
      [officialSources.studyWork]
    );
  }

  if (hasAny(message, ["transport", "train", "tram", "bus", "myki", "opal", "go card", "smartrider", "metrocard"])) {
    return response(
      `Transport setup for ${city}`,
      [
        `${city} transport card/system: ${cityProfile.transportCard}.`,
        "Do this in your first 48 hours:",
        "1. Set up the card/app before your first inspection, class, or job trial.",
        "2. Check if your institution supports student concession travel.",
        "3. Save home, campus, and likely work suburbs in Maps.",
        "4. Check last train/tram/bus times before accepting late shifts.",
        "5. Keep a small emergency ride budget."
      ],
      [cityProfile.transportLink, officialSources.studyTransport]
    );
  }

  if (hasAny(message, ["oshc", "health", "doctor", "hospital", "medicare", "clinic", "insurance"])) {
    return response(
      "Health and OSHC setup",
      [
        "For most international students, OSHC is the key health cover. Medicare is usually not available unless you have specific reciprocal or visa eligibility.",
        "First-week actions:",
        "1. Download your OSHC provider app or card.",
        "2. Save your policy number and emergency contacts.",
        "3. Find clinics near campus and home.",
        "4. Ask your university student services team which clinics students commonly use.",
        "5. Keep prescriptions and translated medical documents in your vault."
      ],
      [officialSources.healthdirect]
    );
  }

  if (hasAny(message, ["scam", "scams", "underpaid", "underpayment", "cash", "trial", "rights", "fair work"])) {
    const highRisk = MISTAKES.filter((mistake) => mistake.severity === "High");

    return response(
      "High-risk mistake check",
      [
        "The biggest traps for new students:",
        ...highRisk.map((mistake) => `- ${mistake.title}: ${mistake.summary}`),
        "What to keep:",
        "1. Screenshots of rosters and job messages.",
        "2. Payslips and bank deposits.",
        "3. Rental agreement, receipt, and condition photos.",
        "4. Any suspicious message before you block/report it."
      ],
      [officialSources.scamwatch, officialSources.fairWorkStudents, officialSources.fairWorkPay]
    );
  }

  if (hasAny(message, ["pr", "permanent", "482", "189", "190", "pathway", "migration"])) {
    return response(
      "PR pathway tracker",
      [
        "Use this as planning support, not migration advice.",
        "Pathways in the app:",
        ...PATHWAYS.map((pathway) => `- ${pathway.visa}: ${pathway.label}. ${pathway.summary}`),
        "Evidence to start collecting now:",
        "1. Course completion and transcripts.",
        "2. Payslips, contracts, position descriptions, and references.",
        "3. English test planning.",
        "4. Skills assessment documents if relevant.",
        "5. State nomination notes if aiming for 190."
      ],
      PATHWAYS.flatMap((pathway) => pathway.links)
    );
  }

  if (hasAny(message, ["document", "passport", "visa grant", "coe", "vault", "upload"])) {
    return response(
      "Document vault setup",
      [
        "Store these first:",
        "- Passport ID page",
        "- Visa grant notice",
        "- COE",
        "- OSHC card/policy",
        "- TFN letter once it arrives",
        "- Rental agreement and bond receipts",
        "Important: the live app is currently demo storage. Do not use it for real passports until Supabase/Firebase auth and private storage are connected."
      ],
      []
    );
  }

  if (hasAny(message, ["bank", "account", "payid", "debit", "card"])) {
    const bankItem = CHECKLIST_ITEMS.find((item) => item.id === "bank-account");

    return response(
      "Bank account setup",
      [
        "Open an Australian everyday account early so employers can pay you correctly.",
        "Ask for:",
        "- Debit card",
        "- PayID setup",
        "- International transfer fees",
        "- Separate savings account",
        "Safety: never share online banking passwords, card details, or one-time codes with an employer, landlord, or friend."
      ],
      bankItem?.links ?? []
    );
  }

  if (hasAny(message, ["sim", "phone", "mobile", "number", "data"])) {
    const simItem = CHECKLIST_ITEMS.find((item) => item.id === "sim-card");

    return response(
      "SIM card setup",
      [
        "Get an Australian number first because banks, employers, rentals, and university portals may need it.",
        "Do this:",
        "1. Start prepaid unless you are sure about your budget.",
        "2. Keep your receipt and account login.",
        "3. Add the number to your resume.",
        "4. Turn on two-factor authentication for email and banking."
      ],
      simItem?.links ?? []
    );
  }

  if (hasAny(message, ["minimum wage", "pay rate", "hourly", "earn", "salary", "income", "calculator"])) {
    const minimumWage = QUICK_STATS.find((stat) => stat.label.includes("minimum wage"))?.value;

    return response(
      "Pay and earnings check",
      [
        `Current app benchmark: national minimum wage ${minimumWage ?? "$24.95/hr"}. Many casual jobs also include casual loading and possible penalty rates.`,
        "Before accepting a job:",
        "1. Check the award or agreement in the Fair Work Pay Calculator.",
        "2. Ask whether the role is casual, part-time, or contractor/ABN.",
        "3. Check weekend and public holiday rates.",
        "4. Keep payslips and timesheets.",
        "5. Use the Jobs & Income calculator to estimate weekly take-home income."
      ],
      [officialSources.fairWorkPay, officialSources.fairWorkStudents]
    );
  }

  return response(
    `What to do next in ${city}`,
    [
      "I can answer with app data if you ask about one of these areas:",
      "- TFN, bank account, SIM, transport, OSHC, or rentals",
      "- Jobs near your city, resume, interviews, pay rates, and work-hour limits",
      "- Budget, groceries, cheap food, scams, underpayment, documents, or PR pathways",
      `Your current priorities: ${goals.length ? goals.join(", ") : "not set yet"}.`,
      `For ${city}, useful local anchors are ${cityProfile.transportCard} for transport, ${cityProfile.supermarkets.slice(0, 3).join(", ")} for groceries, and ${cityProfile.cheapFood.slice(0, 2).join(", ")} for cheap food.`,
      "Try: 'hospitality jobs in my city', 'is 30 hours legal', 'rental scam checklist', or 'weekly food budget'."
    ],
    [cityProfile.transportLink, officialSources.studyWork, officialSources.scamwatch]
  );
}

function response(title: string, lines: string[], sources: Source[]) {
  const sourceLines =
    sources.length > 0
      ? ["", "Sources:", ...sources.map((source) => `- ${source.label}: ${source.href}`)]
      : [];

  return {
    title,
    answer: [`${title}`, "", ...lines, ...sourceLines].join("\n")
  };
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9$.\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function hasAny(message: string, keywords: string[]) {
  return keywords.some((keyword) => message.includes(keyword));
}
