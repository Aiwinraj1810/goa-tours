import {
  BadgePercent,
  Bus,
  Hotel,
  Plane,
  UserCheck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  hotel: Hotel,
  accommodation: Hotel,
  meals: UtensilsCrossed,
  food: UtensilsCrossed,
  transport: Bus,
  bus: Bus,
  guide: UserCheck,
  "tour-manager": UserCheck,
  value: BadgePercent,
  price: BadgePercent,
  flight: Plane,
  plane: Plane,
};

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name.trim().toLowerCase()] ?? Hotel;
}
