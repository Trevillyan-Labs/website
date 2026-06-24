// Prose lifted out of page components so each page and its Markdown mirror render
// from one source (no drift). See the md-mirrors engineering plan §4.1. Phase 1
// covers only the /patents section prose; Phase 2 lifts home/about/contact/products.

export const patentsPage = {
  technology: [
    "These patents cover a fluid detection system using conductive fabric: a multi-layer textile that detects liquid presence and pinpoints leak location via an electrical pathway formed by the liquid itself. The architecture spans the detection fabric, the sensing methodology, and the control apparatus — providing broad coverage across applications.",
    "Potential applications include leak detection in data centers, industrial facilities, smart buildings, smart textiles, medical monitoring, and consumer IoT devices.",
  ],
  licensing:
    "Both patents are issued and actively maintained. If your business operates in fluid detection, smart textiles, IoT sensing, or adjacent technology — reach out. We're open to licensing discussions with companies that can put the IP to work.",
} as const;
