// Typed patent data (migrated from data/patents.json).
export type Patent = {
  slug: string;
  title: string;
  number: string;
  published: string;
  summary: string;
  bodyHtml: string;
  image: string;
  sourceUrl: string;
  authorSlug: string;
  authorName: string;
};

const body =
  "<p>A fluid detection system, method, and apparatus are disclosed. A fluid detection fabric includes a top layer, a middle layer, a bottom layer, a fluid detection sensor, and a control hub. The middle layer separates the top layer and bottom layer. The top layer, middle layer, and bottom layer are configured to connect electrically using a liquid pathway when liquid is present.</p>";

export const patents: Patent[] = [
  {
    slug: "fluid-detection-fabric-method-and-system",
    title: "Fluid Detection Fabric: A Method and System for Detecting a Leak",
    number: "US 11,788,918 B2",
    published: "Oct 17, 2023",
    summary:
      "A method and system for detecting a leak and the leak's location via a fluid detection fabric.",
    bodyHtml: body,
    image: "/images/fluid-detection-fabric-2.jpg",
    sourceUrl: "https://patents.google.com/patent/US11788918B2/en",
    authorSlug: "william-trevillyan",
    authorName: "William Trevillyan",
  },
  {
    slug: "fluid-detection-fabric-apparatus",
    title: "Fluid Detection Fabric: Apparatus",
    number: "US 12,123,807 B2",
    published: "Oct 22, 2024",
    summary: "An apparatus for detecting a leak and the leak's location via a fluid detection fabric.",
    bodyHtml: body,
    image: "/images/fluid-detection-fabric-1.jpg",
    sourceUrl: "https://patents.google.com/patent/US12123807B2/en",
    authorSlug: "william-trevillyan",
    authorName: "William Trevillyan",
  },
];
