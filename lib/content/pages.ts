// Prose lifted out of page components so each page and its Markdown mirror render
// from one source (no drift). See the md-mirrors engineering plan §4.2 (Option A).
// Note: a few paragraphs that had inline <strong>/<em> emphasis are stored as
// plain text here — the emphasis is dropped on the page so page and mirror share
// one source.

import { site } from "@/lib/site";

export const patentsPage = {
  technology: [
    "These patents cover a fluid detection system using conductive fabric: a multi-layer textile that detects liquid presence and pinpoints leak location via an electrical pathway formed by the liquid itself. The architecture spans the detection fabric, the sensing methodology, and the control apparatus — providing broad coverage across applications.",
    "Potential applications include leak detection in data centers, industrial facilities, smart buildings, smart textiles, medical monitoring, and consumer IoT devices.",
  ],
  licensing:
    "Both patents are issued and actively maintained. If your business operates in fluid detection, smart textiles, IoT sensing, or adjacent technology — reach out. We're open to licensing discussions with companies that can put the IP to work.",
} as const;

export const homePage = {
  hero: {
    eyebrow: "Independent software studio",
    headline: "We build and run software — ours and yours.",
    subcopy:
      "Trevillyan Labs ships custom software for clients, operates its own products, and advises founders and early-stage startups on product and go-to-market execution.",
  },
  howWeWork: {
    eyebrow: "How we work",
    heading: "Run by a founder. Operated by an AI.",
    paras: [
      "Trevillyan Labs runs lean on agentic AI: a founder's judgment, and an AI assistant — Ren — doing the heavy lifting. It's how we ship fast at senior quality without an agency's overhead.",
      "We don't just advise on agentic AI — we run on it. That's the lived proof behind the AI work we help founders and teams adopt.",
    ],
  },
  closingCta: {
    heading: "Have something to build — or figure out?",
    body: "Tell us what you need. We'll come back with a clear, scoped next step.",
  },
} as const;

export const servicesPage = {
  intro:
    "Two ways to work with us. Each one starts with a clear, scoped next step — so you know exactly what you're getting before you commit.",
  groupBlurbs: {
    Build: "Custom software and high-craft sites, shipped to production.",
    Advise: "Product & go-to-market execution for founders and early-stage startups.",
  },
  stepsHeading: "How engagements work",
  steps: [
    {
      n: "01",
      icon: "MessageSquare",
      title: "Tell us what you need",
      desc: "A short note on the contact page — the problem, not a spec.",
    },
    {
      n: "02",
      icon: "ClipboardList",
      title: "We scope it",
      desc: "We come back with a clear, bounded next step and what it costs.",
    },
    {
      n: "03",
      icon: "Rocket",
      title: "We ship",
      desc: "A fixed-scope build, or an advisory cadence — run lean, at senior quality.",
    },
  ],
} as const;

export const aboutPage = {
  intro:
    "Trevillyan Labs is an independent software studio. We build and run our own products, ship software for clients, and advise founders on product and go-to-market execution.",
  whoBehindIt: {
    heading: "Who's behind it",
    paras: [
      "The studio is run by Bill Trevillyan. He builds and operates Trevillyan Labs' own products alongside select client engagements.",
      "Day to day, the studio is operated with Ren, an AI assistant — Trevillyan Labs runs lean on agentic AI rather than headcount. It's how we move fast and deliver at senior quality without an agency's overhead, and it's the lived proof behind the AI work we advise on.",
    ],
  },
  twoEngines: {
    heading: "Two engines",
    items: [
      {
        title: "Owned products",
        desc: "Software we build and run for ourselves — NewsNook today.",
      },
      {
        title: "Client work",
        desc: "Custom builds and product/go-to-market advisory for founders and teams.",
      },
    ],
  },
  founder: {
    eyebrow: "Meet Bill",
    heading: "The founder behind the studio.",
    paras: [
      "Bill Trevillyan is a product leader and 3x startup founder. He's built and shipped products across early- and mid-stage startups, holds two issued US patents, and now runs Trevillyan Labs — building and operating its own products alongside select client work.",
      "Away from the keyboard, he lives off of good coffee, gets out for backpacking and tennis, and will happily travel (or cook) for cuisines from anywhere in the world. He's based in Mountain View, CA — the heart of Silicon Valley.",
    ],
  },
} as const;

export const contactPage = {
  intro:
    "A short note is enough — the problem, not a spec. We'll come back with a clear, scoped next step: a fixed-scope build, or an advisory call.",
  booking: {
    title: "Prefer to talk it through?",
    desc: "Book a free 30-minute intro call — pick a time that works.",
  },
} as const;

export type ProductItem = {
  name: string;
  status: string;
  summary: string;
  /** Plain destination URL; the page applies UTM params to external links. */
  href: string;
  cta: string;
  external: boolean;
};

export const productsPage = {
  intro:
    "We don't just ship software for clients; we build and operate our own. It's the clearest proof the studio ships real products — and the instincts we earn running them feed every client build and advisory engagement.",
  items: [
    {
      name: "NewsNook",
      status: "Live in production",
      summary:
        "An AI newsletter reader for thought leaders — built, shipped, and operated by the studio. Our clearest proof we run real software, not just ship it.",
      image: "/images/work/products/newsnook-project.webp",
      href: site.newsnookUrl,
      cta: "Visit newsnook.ai →",
      external: true,
    },
    {
      name: "Verbaly",
      status: "2,300+ users · Calacanis-backed",
      summary:
        "An AI speech coach — a consumer web app built end-to-end on LLMs + RAG, launched to 2,300+ users and funded by Jason Calacanis & LAUNCH.",
      image: "/images/work/products/verbaly-web-app-project.webp",
      href: "/work/verbaly",
      cta: "Read the case study →",
      external: false,
    },
  ] as (ProductItem & { image: string })[],
  closingCta: {
    heading: "Have a product to build?",
    body: "We build and operate our own — and we'll do the same for yours, from first scope to live in production.",
  },
} as const;

export const newsnookPage = {
  intro:
    "The AI newsletter reader for thought leaders — built, shipped, and operated by Trevillyan Labs. It's live in production today.",
  whyItsHere: {
    heading: "Why it's here",
    paras: [
      "This page isn't a sales pitch — NewsNook sells itself on its own site. On trevillyanlabs.com, NewsNook is proof: the studio doesn't just build software for clients, it builds and operates its own product, end-to-end, run lean with AI.",
      "That ownership is what we bring to client work — we ship like owners, not contractors, and the product instincts we earn running NewsNook feed every build and advisory engagement.",
    ],
  },
  features: [
    { title: "Live in production", desc: "Real users, real product — not a demo." },
    { title: "Built & operated by us", desc: "Next.js / TypeScript / Supabase, run day-to-day." },
    { title: "Run lean on AI", desc: "The agentic operating model we advise on." },
  ],
} as const;
