// Typed content for the site. Source of truth for page copy is
// .agents/references/strategy/content_plan.md (and product_vision.md).
// Case studies use typed content now; a later phase may move long-form to MDX.

export type Group = "Build" | "Advise" | "Products";

export type Service = {
  slug: string;
  group: Group;
  icon: string;
  title: string;
  summary: string;
  whatYouGet: string[];
  start: { label: string; href: string };
  secondary?: boolean;
};

export const services: Service[] = [
  {
    slug: "contract-software-development",
    group: "Build",
    icon: "Code",
    title: "Contract software development",
    summary:
      "Full-stack applications taken from idea to production — MVPs, internal tools, and custom products, built on the right stack for each project.",
    whatYouGet: [
      "A scoped build, shipped to production",
      "The same engineering rigor as our own product",
      "A founder-level partner, not a ticket-taker",
    ],
    start: { label: "Start a project", href: "/contact?intent=build" },
  },
  {
    slug: "web-and-portfolio-builds",
    group: "Build",
    icon: "Globe",
    title: "Web & portfolio builds",
    summary:
      "Focused, high-craft marketing and portfolio sites — designed, built, and maintained end-to-end, so you get a polished online presence without having to manage the work yourself.",
    whatYouGet: [
      "Design and build, end-to-end",
      "Fast, modern, and easy to update",
      "Ongoing maintenance if you want it",
    ],
    start: { label: "Start a project", href: "/contact?intent=web" },
  },
  {
    slug: "product-and-gtm-execution",
    group: "Advise",
    icon: "Rocket",
    title: "Product & go-to-market execution",
    summary:
      "Hands-on help for founders and early-stage startups on what decides whether a company makes it: product strategy, the path to product-market fit, go-to-market, fundraising, and team building — running lean with AI as a means, not the pitch. From a 3x founder who ships a live product.",
    whatYouGet: [
      "Product strategy and a path to PMF",
      "Go-to-market and fundraising help",
      "How to run lean with agentic AI",
    ],
    start: { label: "Book a call", href: "/contact?intent=advisory" },
  },
  {
    slug: "applying-ai-for-leaders",
    group: "Advise",
    icon: "Sparkles",
    title: "Applying AI for leaders",
    summary:
      "Advising leaders on where agents, assistants, automation, and tooling fit — and what they can't do. The studio runs on agentic AI itself, which is the proof.",
    whatYouGet: [
      "A practical, hype-free read on AI",
      "Where agents and automation fit your work",
      "What to try, and what to skip",
    ],
    start: { label: "Book a call", href: "/contact?intent=applying-ai" },
  },
  {
    slug: "indie-saas",
    group: "Products",
    icon: "Package",
    title: "Indie SaaS — our own products",
    summary:
      "We build and operate our own products. NewsNook is live in production today. It's proof we ship and run real software — and the know-how feeds every client build and advisory engagement.",
    whatYouGet: [
      "Proof we build and operate real software",
      "Product instincts from running our own",
      "A live product you can go try",
    ],
    start: { label: "See our products", href: "/products" },
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  tag: string;
  dark: boolean;
  /** Screenshot/photo for the card + detail header. Falls back to a styled block when absent. */
  image?: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string[];
  role: string;
  /** Optional reference images shown as a gallery on the detail page. */
  gallery?: string[];
};

// Order matters — Clip Automation leads (most impactful). KPMG is held back
// pending their permission; Verbaly is pending content. See content_plan.md.
export const caseStudies: CaseStudy[] = [
  {
    slug: "clip-automation",
    title: "Clip Automation",
    tag: "Startup MVP",
    dark: true,
    image: "/images/work/clip/clip360-project.webp",
    summary: "Delivered the MVP, the founding engineering team, and 7-figure ARR.",
    problem:
      "The founder of an early-stage industrial-IoT startup needed to get from concept to a real, shippable product for a prospective Fortune 50 enterprise client — and to a team that could build it.",
    approach:
      "Hire #1, brought on as a contract product leader: defined the product, drove execution end-to-end, and stood up the founding engineering team.",
    outcome: [
      "Shipped the MVP",
      "Built the founding engineering team",
      "Drove the product to 7-figure ARR",
    ],
    role: "Contract Product Lead",
    gallery: [
      "/images/work/clip/clip-nexus-project.webp",
      "/images/work/clip/clip-telescript-project.webp",
      "/images/work/clip/clip-real-time-map.webp",
      "/images/work/clip/clip-equipment-analysis.webp",
      "/images/work/clip/clip-nexus-server-rack.webp",
      "/images/work/clip/clip-360-sign-in.webp",
    ],
  },
  {
    slug: "verbaly",
    title: "Verbaly",
    tag: "AI web app",
    dark: false,
    image: "/images/work/products/verbaly-web-app-project.webp",
    summary: "An AI speech coach — built, launched to 2,300+ users, and funded by Jason Calacanis.",
    problem:
      "Most people communicate poorly in the moments that matter — interviews, presentations, sales calls — and the usual fix (Toastmasters and the like) is slow and inconvenient.",
    approach:
      "Designed and built a consumer web app: a humanized AI speech coach that records, evaluates, and trains, powered by LLMs and a retrieval-augmented-generation system — grounded in 70+ customer-discovery interviews.",
    outcome: [
      "Acquired 2,300+ users",
      "Raised $25K from Jason Calacanis & LAUNCH (convertible note)",
      "Shipped an LLM + RAG product end-to-end",
    ],
    role: "Founder — product, build, go-to-market, and fundraising",
  },
  {
    slug: "newsnook",
    title: "NewsNook",
    tag: "Our product",
    dark: true,
    image: "/images/work/products/newsnook-project.webp",
    summary: "An AI newsletter reader — built, shipped, and live in production.",
    problem:
      "Knowledge workers drown in newsletters. We wanted a product that lets people read more of what matters without the inbox overload — and that proves the studio ships and operates real software.",
    approach:
      "Built and operate NewsNook ourselves on Next.js / TypeScript / Supabase: the marketing site, the product app, and the day-to-day operation — run lean with AI.",
    outcome: [
      "Live in production at newsnook.ai",
      "Owned end-to-end: built, shipped, and operated",
      "The studio's clearest proof it builds and runs real products",
    ],
    role: "Owned product — built and operated by Trevillyan Labs",
  },
  {
    slug: "trevillyan-dev",
    title: "trevillyan.dev",
    tag: "Website",
    dark: false,
    image: "/images/work/trevillyan-dev.png",
    summary: "The founder's own developer portfolio — designed and built end-to-end.",
    problem:
      "A founder and product leader needed a sharp personal site to showcase his work, writing, and the projects behind Trevillyan Labs.",
    approach:
      "Designed and built trevillyan.dev end-to-end — a fast, modern portfolio that doubles as a live sample of the studio's web work.",
    outcome: [
      "A polished personal portfolio, shipped end-to-end",
      "Fast, modern, and easy to keep current",
      "A live sample of the studio's web/portfolio craft",
    ],
    role: "Web/portfolio build — design through delivery",
  },
  {
    slug: "journalism-portfolio",
    title: "Journalism portfolio",
    tag: "Website",
    dark: false,
    summary: "A writer's portfolio site, designed and shipped end-to-end.",
    problem:
      "A working journalist needed a credible, well-crafted home for their writing and appearances — without managing a build or wrestling a site builder.",
    approach:
      "Designed and built the site end-to-end: a clean publications-first layout, fast and easy to maintain, handed over ready to run.",
    outcome: [
      "A polished, credible portfolio, shipped end-to-end",
      "Fast and simple to keep current",
      "Client hands-off throughout",
    ],
    role: "Web/portfolio build — design through delivery (client unnamed)",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What does Trevillyan Labs do?",
    a: "We're an independent software studio. We ship custom software for clients, operate our own products (like NewsNook), and advise founders and early-stage startups on product and go-to-market execution.",
  },
  {
    q: "Can a small studio actually build my product?",
    a: "Yes — that's the core of what we do. We build full-stack web apps in Next.js / React / TypeScript and run lean with AI, so you get senior-quality delivery without an agency's overhead. We also build and operate our own product, so we ship like owners, not contractors.",
  },
  {
    q: "Who do you advise, and on what?",
    a: "Founders and early-stage startups, on product and go-to-market execution: product strategy, the path to product-market fit, go-to-market, fundraising, and team building. From a 3x founder who ships a live product.",
  },
  {
    q: "Do you use AI?",
    a: "The studio is run day-to-day with an AI assistant — we run lean on agentic AI rather than headcount. It's how we move fast, and it's the proof behind any AI advice we give.",
  },
  {
    q: "How does an engagement start?",
    a: "Tell us what you need on the contact page. We come back with a clear, scoped next step — a fixed-scope build, or an advisory call — so you know exactly what you're getting before you commit.",
  },
  {
    q: "What is NewsNook?",
    a: "NewsNook is our own product — an AI newsletter reader, live in production at newsnook.ai. On this site it's proof we build and operate real software; the product itself is sold on its own site.",
  },
];
