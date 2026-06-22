import {
  Code,
  Compass,
  Globe,
  Hammer,
  type LucideIcon,
  Package,
  Rocket,
  Sparkles,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Hammer,
  Compass,
  Package,
  Code,
  Globe,
  Rocket,
  Sparkles,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = map[name] ?? Hammer;
  return <C className={className} strokeWidth={1.6} aria-hidden="true" />;
}
