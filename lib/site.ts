export const site = {
  name: "Trevillyan Labs",
  domain: "trevillyanlabs.io",
  url: "https://www.trevillyanlabs.io",
  newsnookUrl: "https://www.newsnook.ai",
  tagline:
    "Trevillyan Labs ships custom software for clients, operates its own products, and advises founders and early-stage startups on product and go-to-market execution.",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

export const offerings = [
  {
    title: "Build",
    body: "Custom software & web builds",
    detail: "MVPs, internal tools, and high-craft sites.",
  },
  {
    title: "Advise",
    body: "Product & GTM execution for founders & startups",
    detail: "Product strategy, PMF, GTM, fundraising, team.",
  },
  {
    title: "Products",
    body: "We ship & run our own (NewsNook)",
    detail: "Proof we build and operate real software.",
  },
] as const;

export type WorkItem = {
  title: string;
  tag: string;
  outcome: string;
  dark: boolean;
};

// Order matters — lead with Clip Automation (most impactful). See content_plan.md.
export const work: WorkItem[] = [
  {
    title: "Clip Automation",
    tag: "Startup MVP",
    outcome: "Delivered the MVP, the founding engineering team, and 7-figure ARR.",
    dark: true,
  },
  {
    title: "NewsNook",
    tag: "Our product",
    outcome: "An AI newsletter reader — built, shipped, and live in production.",
    dark: true,
  },
  {
    title: "Journalism portfolio",
    tag: "Website",
    outcome: "A writer's portfolio site, designed and shipped end-to-end.",
    dark: false,
  },
];
