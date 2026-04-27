import {
  AlertTriangle,
  BadgeDollarSign,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CircleDollarSign,
  ClipboardCheck,
  FileWarning,
  GraduationCap,
  Home,
  Landmark,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Train,
  Utensils
} from "lucide-react";
import type {
  BudgetCategory,
  ChecklistItem,
  City,
  CityProfile,
  Goal,
  JobOption,
  JobPlan,
  MistakeWarning,
  Pathway,
  SectionId
} from "@/lib/types";

export const CITIES: City[] = [
  "Melbourne",
  "Sydney",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Canberra",
  "Hobart",
  "Darwin"
];

export const VISA_TYPES = [
  "Student visa subclass 500",
  "Temporary Graduate visa subclass 485",
  "Working Holiday visa subclass 417/462",
  "Partner/dependent visa",
  "Other temporary visa"
];

export const BUDGET_RANGES = [
  "Under $350/week",
  "$350-$550/week",
  "$550-$750/week",
  "$750+/week"
];

export const GOALS: { id: Goal; label: string; icon: typeof BriefcaseBusiness }[] = [
  { id: "job", label: "Find a job", icon: BriefcaseBusiness },
  { id: "pr", label: "Plan PR pathway", icon: ShieldCheck },
  { id: "study", label: "Settle into study", icon: GraduationCap },
  { id: "side-income", label: "Build side income", icon: CircleDollarSign }
];

export const SECTIONS: {
  id: SectionId;
  label: string;
  shortLabel: string;
  icon: typeof ClipboardCheck;
}[] = [
  { id: "dashboard", label: "Dashboard", shortLabel: "Home", icon: ClipboardCheck },
  { id: "checklist", label: "First 7 Days", shortLabel: "Tasks", icon: ClipboardCheck },
  { id: "jobs", label: "Jobs & Income", shortLabel: "Jobs", icon: BriefcaseBusiness },
  { id: "budget", label: "Budget", shortLabel: "Money", icon: Calculator },
  { id: "mistakes", label: "Avoid Mistakes", shortLabel: "Avoid", icon: ShieldAlert },
  { id: "assistant", label: "AI Assistant", shortLabel: "AI", icon: BadgeDollarSign },
  { id: "local", label: "Local Life", shortLabel: "Local", icon: MapPin },
  { id: "vault", label: "Document Vault", shortLabel: "Vault", icon: ShieldCheck },
  { id: "pr", label: "PR Tracker", shortLabel: "PR", icon: Landmark }
];

export const CITY_PROFILES: Record<City, CityProfile> = {
  Melbourne: {
    city: "Melbourne",
    state: "VIC",
    transportCard: "Myki",
    transportLink: { label: "Public Transport Victoria", href: "https://www.ptv.vic.gov.au/" },
    supermarkets: ["Queen Victoria Market", "Aldi", "Coles", "Woolworths", "Cheaper Buy Miles"],
    cheapFood: ["Crossways", "Queen Victoria Market end-of-day deals", "CBD food courts"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Melbourne" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Melbourne" },
      { label: "Libraries with study desks", href: "https://www.google.com/maps/search/public+library+near+Melbourne" }
    ]
  },
  Sydney: {
    city: "Sydney",
    state: "NSW",
    transportCard: "Opal",
    transportLink: { label: "Transport for NSW", href: "https://transportnsw.info/" },
    supermarkets: ["Paddy's Markets", "Aldi", "Coles", "Woolworths", "Tong Li"],
    cheapFood: ["Chinatown food courts", "Paddy's Markets", "Newtown lunch specials"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Sydney" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Sydney" },
      { label: "Opal top up", href: "https://www.google.com/maps/search/Opal+card+top+up+near+Sydney" }
    ]
  },
  Brisbane: {
    city: "Brisbane",
    state: "QLD",
    transportCard: "Go card",
    transportLink: { label: "Translink", href: "https://translink.com.au/" },
    supermarkets: ["Aldi", "Coles", "Woolworths", "Genki Mart", "Fresco"],
    cheapFood: ["West End markets", "Sunnybank food courts", "Student union specials"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Brisbane" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Brisbane" },
      { label: "Go card retailers", href: "https://www.google.com/maps/search/go+card+retailer+near+Brisbane" }
    ]
  },
  Perth: {
    city: "Perth",
    state: "WA",
    transportCard: "SmartRider",
    transportLink: { label: "Transperth", href: "https://www.transperth.wa.gov.au/" },
    supermarkets: ["Spudshed", "Aldi", "Coles", "Woolworths", "MCQ"],
    cheapFood: ["Northbridge meals", "Spudshed late-night groceries", "Campus food banks"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Perth" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Perth" },
      { label: "SmartRider retailers", href: "https://www.google.com/maps/search/SmartRider+retailer+near+Perth" }
    ]
  },
  Adelaide: {
    city: "Adelaide",
    state: "SA",
    transportCard: "MetroCARD",
    transportLink: { label: "Adelaide Metro", href: "https://www.adelaidemetro.com.au/" },
    supermarkets: ["Central Market", "Aldi", "Coles", "Woolworths", "Romeo's"],
    cheapFood: ["Adelaide Central Market", "Chinatown food court", "Campus clubs"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Adelaide" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Adelaide" },
      { label: "MetroCARD retailers", href: "https://www.google.com/maps/search/MetroCARD+retailer+near+Adelaide" }
    ]
  },
  Canberra: {
    city: "Canberra",
    state: "ACT",
    transportCard: "MyWay+",
    transportLink: { label: "Transport Canberra", href: "https://www.transport.act.gov.au/" },
    supermarkets: ["Aldi", "Coles", "Woolworths", "Fyshwick Fresh Food Markets"],
    cheapFood: ["Belconnen markets", "Dickson Asian groceries", "Campus kitchens"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Canberra" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Canberra" },
      { label: "MyWay+ locations", href: "https://www.google.com/maps/search/MyWay+card+near+Canberra" }
    ]
  },
  Hobart: {
    city: "Hobart",
    state: "TAS",
    transportCard: "Greencard",
    transportLink: { label: "Metro Tasmania", href: "https://www.metrotas.com.au/" },
    supermarkets: ["Salamanca Market", "Hill Street Grocer", "Coles", "Woolworths"],
    cheapFood: ["Salamanca Market", "Elizabeth Street meals", "Student pantry programs"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Hobart" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Hobart" },
      { label: "Greencard retailers", href: "https://www.google.com/maps/search/Greencard+Metro+retailer+near+Hobart" }
    ]
  },
  Darwin: {
    city: "Darwin",
    state: "NT",
    transportCard: "Tap and Ride",
    transportLink: { label: "NT Public Transport", href: "https://nt.gov.au/driving/public-transport-cycling/public-buses" },
    supermarkets: ["Parap Village Markets", "Rapid Creek Market", "Coles", "Woolworths"],
    cheapFood: ["Nightcliff markets", "Rapid Creek Market", "Casuarina food court"],
    mapsSearches: [
      { label: "Supermarkets near me", href: "https://www.google.com/maps/search/supermarket+near+Darwin" },
      { label: "Cheap eats", href: "https://www.google.com/maps/search/cheap+eats+near+Darwin" },
      { label: "Bus interchange", href: "https://www.google.com/maps/search/bus+interchange+near+Darwin" }
    ]
  }
};

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "sim-card",
    title: "Get a working SIM",
    day: "Day 1",
    description: "Set up calls, data, banking codes, job calls, and transport apps before you leave the airport.",
    steps: [
      "Compare prepaid plans before choosing a long contract.",
      "Use your passport as ID and keep the receipt.",
      "Turn on two-factor authentication for banking and email.",
      "Save your Australian number in your resume and university portal."
    ],
    links: [
      { label: "Telstra prepaid", href: "https://www.telstra.com.au/mobile-phones/prepaid-mobiles" },
      { label: "Optus prepaid", href: "https://www.optus.com.au/prepaid" },
      { label: "Vodafone prepaid", href: "https://www.vodafone.com.au/prepaid" }
    ]
  },
  {
    id: "bank-account",
    title: "Open a bank account",
    day: "Day 1-2",
    description: "You need an Australian account for wages, rent, bond refunds, and daily spending.",
    steps: [
      "Open an everyday account and a separate savings account.",
      "Ask for a debit card, PayID setup, and international transfer fees.",
      "Never share NetBank passwords or one-time codes.",
      "Connect the account to your employer only after receiving a written job offer."
    ],
    links: [
      { label: "CommBank students", href: "https://www.commbank.com.au/banking/student-banking.html" },
      { label: "NAB international students", href: "https://www.nab.com.au/personal/accounts/international-students" },
      { label: "ANZ students", href: "https://www.anz.com.au/personal/bank-accounts/student-accounts/" }
    ]
  },
  {
    id: "tfn",
    title: "Apply for your TFN",
    day: "Day 2-3",
    description: "A Tax File Number helps employers tax you correctly and keeps your income records clean.",
    steps: [
      "Apply only through the Australian Taxation Office.",
      "You must be in Australia and have a valid work-rights visa to use the online temporary visitor pathway.",
      "Use a reliable postal address because your TFN is posted to you.",
      "Give your TFN declaration to your employer after you are hired."
    ],
    links: [
      {
        label: "ATO TFN for temporary visitors",
        href: "https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application"
      }
    ]
  },
  {
    id: "transport-card",
    title: "Set up local transport",
    day: "Day 2",
    description: "Get your city card/app sorted so job trials, inspections, and classes do not become expensive rideshares.",
    steps: [
      "Find your city transport card or contactless payment option.",
      "Check student concession eligibility before buying weekly passes.",
      "Save home, campus, work areas, and last train/tram times.",
      "Keep a small emergency ride budget for late shifts."
    ],
    links: [{ label: "Study Australia transport guide", href: "https://www.studyaustralia.gov.au/en/life-in-australia/getting-around" }],
    cityNote: {
      Melbourne: "Use Myki and check if your institution supports an international student travel pass.",
      Sydney: "Use Opal or contactless payments and set weekly caps alerts.",
      Brisbane: "Use Go card and check Translink student concession rules.",
      Perth: "Use SmartRider and ask your institution about tertiary concessions.",
      Adelaide: "Use MetroCARD and confirm student concession eligibility.",
      Canberra: "Use MyWay+ and plan bus/light rail transfers.",
      Hobart: "Use Greencard for Metro Tasmania services.",
      Darwin: "Use Tap and Ride or cashless bus options where available."
    }
  },
  {
    id: "oshc",
    title: "Check OSHC and health basics",
    day: "Day 3",
    description: "Know your insurance number, waiting periods, claims process, and closest bulk billing options.",
    steps: [
      "Download your OSHC provider app or card.",
      "Save policy number, emergency contacts, and nearest urgent care.",
      "Ask your university for recommended clinics near campus.",
      "Keep medication scripts and translated medical documents together."
    ],
    links: [
      { label: "Study Australia OSHC", href: "https://www.studyaustralia.gov.au/en/life-in-australia/health-and-safety" },
      { label: "Healthdirect", href: "https://www.healthdirect.gov.au/" }
    ]
  },
  {
    id: "rental-basics",
    title: "Avoid rental mistakes",
    day: "Day 4-7",
    description: "Inspections, bond rules, and written agreements matter more than a cheap-looking listing.",
    steps: [
      "Inspect before paying a deposit whenever possible.",
      "Never send bond to a private account without paperwork.",
      "Get a written agreement and condition report.",
      "Check transport time to campus and late-night safety before signing."
    ],
    links: [
      { label: "Tenants Victoria", href: "https://tenantsvic.org.au/" },
      { label: "NSW Fair Trading renting", href: "https://www.nsw.gov.au/housing-and-construction/rules" },
      { label: "Flatmates", href: "https://flatmates.com.au/" }
    ]
  }
];

export const JOB_OPTIONS: JobOption[] = [
  {
    id: "hospitality",
    title: "Hospitality shifts",
    fit: "Fastest path for students with flexible evenings and weekends.",
    averagePay: "Use Fair Work Pay Calculator; weekend penalty rates may apply.",
    setup: ["RSA certificate for bar work", "Black clothes and comfortable shoes", "Two local references"],
    watchOut: "Do not accept cash-only underpayment or unpaid trial shifts beyond a reasonable skills test.",
    links: [
      { label: "Seek hospitality", href: "https://www.seek.com.au/hospitality-jobs" },
      { label: "Fair Work pay calculator", href: "https://calculate.fairwork.gov.au/" }
    ]
  },
  {
    id: "retail",
    title: "Retail and supermarkets",
    fit: "Good for predictable rosters, customer service experience, and campus-friendly locations.",
    averagePay: "Rates vary by award, age, casual loading, and penalties.",
    setup: ["Short retail resume", "Availability table", "Comfortable interview examples"],
    watchOut: "If a roster pushes you above visa limits during study periods, ask for changes in writing.",
    links: [
      { label: "Indeed retail", href: "https://au.indeed.com/q-retail-jobs.html" },
      { label: "Coles careers", href: "https://www.colescareers.com.au/" },
      { label: "Woolworths careers", href: "https://www.wowcareers.com.au/" }
    ]
  },
  {
    id: "gig",
    title: "Delivery and rideshare",
    fit: "Useful bridge income when you need flexible hours, but track costs carefully.",
    averagePay: "Gross earnings are not profit; include fuel, bike repairs, tax, and insurance.",
    setup: ["ABN check", "Safety gear", "Spreadsheet for tax and expenses"],
    watchOut: "Gig hours still count toward student visa work limits when your course is in session.",
    links: [
      { label: "Uber Eats", href: "https://www.uber.com/au/en/deliver/" },
      { label: "ATO ride-sourcing", href: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/income-and-deductions-for-business/business-income-and-deductions/ride-sourcing" }
    ]
  }
];

export const DEFAULT_BUDGET: BudgetCategory[] = [
  { id: "rent", label: "Rent", planned: 280, spent: 260, tone: "teal" },
  { id: "food", label: "Food", planned: 110, spent: 96, tone: "mint" },
  { id: "transport", label: "Transport", planned: 45, spent: 39, tone: "gold" },
  { id: "subscriptions", label: "Subscriptions", planned: 24, spent: 32, tone: "coral" },
  { id: "savings", label: "Savings", planned: 65, spent: 65, tone: "lilac" }
];

export const DEFAULT_JOB_PLAN: JobPlan = {
  status: "Resume ready",
  applicationsThisWeek: 4,
  targetApplications: 8
};

export const MISTAKES: MistakeWarning[] = [
  {
    id: "scams",
    title: "Scam listings and fake employers",
    severity: "High",
    summary: "Pressure to pay quickly, send passport photos over chat, or accept equipment cheques is a red flag.",
    actions: [
      "Verify rental agents and employers outside the chat app.",
      "Never send bond before paperwork and inspection.",
      "Report suspicious job or rental messages."
    ],
    icon: AlertTriangle,
    source: { label: "Scamwatch", href: "https://www.scamwatch.gov.au/" }
  },
  {
    id: "work-limits",
    title: "Breaching visa work limits",
    severity: "High",
    summary:
      "Most Student visa subclass 500 holders are limited to 48 hours per fortnight while their course is in session.",
    actions: [
      "Track hours across every job and gig app.",
      "Keep roster screenshots and payslips.",
      "Use unlimited course-break work only when your course is officially not in session."
    ],
    icon: FileWarning,
    source: {
      label: "Study Australia work rights",
      href: "https://www.studyaustralia.gov.au/en/work-in-australia/work-while-you-study"
    }
  },
  {
    id: "underpayment",
    title: "Underpayment and unsafe trials",
    severity: "High",
    summary: "International students have the same workplace rights as other workers in Australia.",
    actions: [
      "Check your award in the Fair Work Pay Calculator.",
      "Keep timesheets and messages.",
      "Ask for payslips and superannuation details."
    ],
    icon: Banknote,
    source: {
      label: "Fair Work international students",
      href: "https://www.fairwork.gov.au/tools-and-resources/fact-sheets/rights-and-obligations/international-students"
    }
  },
  {
    id: "tax",
    title: "Tax and ABN confusion",
    severity: "Medium",
    summary: "An ABN is not a shortcut around tax, worker rights, or visa conditions.",
    actions: [
      "Use a TFN for employee jobs.",
      "Track ABN income and expenses separately.",
      "Lodge tax returns on time and keep receipts."
    ],
    icon: Landmark,
    source: { label: "ATO working in Australia", href: "https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types" }
  },
  {
    id: "overpriced-rent",
    title: "Overpriced or unsafe rentals",
    severity: "Medium",
    summary: "A cheap room far from campus can cost more once transport, late shifts, and safety are included.",
    actions: [
      "Compare travel time at class and work hours.",
      "Ask how many people share the bathroom and kitchen.",
      "Confirm bond lodgement rules in your state."
    ],
    icon: Home
  }
];

export const PATHWAYS: Pathway[] = [
  {
    id: "482",
    visa: "482",
    label: "Skills in Demand / employer sponsored",
    summary: "Build skilled work experience, find a sponsor, and keep evidence of role duties and salary.",
    checkpoints: [
      "Target occupations connected to your course",
      "Build Australian references and payslips",
      "Track employer sponsorship readiness",
      "Review English, skills assessment, and salary requirements"
    ],
    links: [
      { label: "Home Affairs temporary skill shortage", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482" }
    ]
  },
  {
    id: "189",
    visa: "189",
    label: "Skilled Independent",
    summary: "Points-tested pathway for eligible skilled workers who do not need state or employer sponsorship.",
    checkpoints: [
      "Confirm occupation list fit",
      "Prepare English test strategy",
      "Collect skills assessment evidence",
      "Estimate points and EOI competitiveness"
    ],
    links: [
      { label: "Home Affairs 189", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189" }
    ]
  },
  {
    id: "190",
    visa: "190",
    label: "Skilled Nominated",
    summary: "State-nominated points-tested pathway; each state has its own priorities and evidence rules.",
    checkpoints: [
      "Pick target state based on study and occupation",
      "Track state nomination windows",
      "Prepare residence and employment evidence",
      "Keep EOI and state portal details aligned"
    ],
    links: [
      { label: "Home Affairs 190", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190" }
    ]
  }
];

export const QUICK_STATS = [
  { label: "Current national minimum wage", value: "$24.95/hr", icon: BadgeDollarSign },
  { label: "Casual loading benchmark", value: "25%", icon: Banknote },
  { label: "Student work limit while course in session", value: "48h/fortnight", icon: FileWarning },
  { label: "TFN application cost", value: "Free", icon: ShieldCheck }
];

export const FIRST_WEEK_ICONS: Record<string, typeof Smartphone> = {
  "sim-card": Smartphone,
  "bank-account": Building2,
  tfn: Landmark,
  "transport-card": Train,
  oshc: ShieldCheck,
  "rental-basics": Home
};

export const LOCAL_TOOL_ICONS = [Utensils, Train, MapPin];
