// Typed team data (migrated from data/team_members.json).
// Bio rewritten to the current studio framing (the old "license his inventions"
// line is retired — see agent_lessons.md).
export type Member = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  links: { linkedin?: string; twitter?: string };
};

export const team: Member[] = [
  {
    slug: "william-trevillyan",
    name: "William Trevillyan",
    title: "Founder",
    bio: "Bill is a product leader and 3x startup founder. He has built and shipped products for early- and mid-stage SaaS startups and holds two issued US patents. He founded Trevillyan Labs to build and operate its own software products and to ship custom software and product/go-to-market advisory for clients — running the studio lean on AI.",
    photo: "/images/studiomoot-incode-headshots-111.png",
    links: {
      linkedin: "https://www.linkedin.com/in/williamtrevillyan/",
      twitter: "https://twitter.com/wgtrevillyan",
    },
  },
];
