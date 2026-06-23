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
  { label: "Patents", href: "/patents" },
] as const;

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/trevillyan-labs/about/",
    icon: "linkedin",
  },
  { label: "X", href: "https://twitter.com/wgtrevillyan", icon: "x" },
] as const;

export const offerings = [
  {
    title: "Build",
    icon: "Hammer",
    body: "Custom software & web builds",
    detail: "MVPs, internal tools, and high-craft sites.",
  },
  {
    title: "Advise",
    icon: "Compass",
    body: "Product & GTM execution for founders & startups",
    detail: "Product strategy, PMF, GTM, fundraising, team.",
  },
  {
    title: "Products",
    icon: "Package",
    body: "We ship & run our own (NewsNook)",
    detail: "Proof we build and operate real software.",
  },
] as const;

// Case studies live in lib/content.ts (caseStudies).
