import type { ComponentType, SVGProps } from "react";
import {
  ScreeningIcon,
  AccountingIcon,
  MaintenanceIcon,
  InspectionsIcon,
  SupportIcon,
  MarketingIcon,
} from "@/components/icons";

export type Service = {
  title: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const SERVICES: Service[] = [
  {
    title: "Tenant Screening & Placement",
    body: "CIC-powered tenant screening with rigorous credit, background and income checks to fill vacancies with tenants who stay.",
    Icon: ScreeningIcon,
  },
  {
    title: "Rent Collection & Accounting",
    body: "Accounting services and financial reports.",
    Icon: AccountingIcon,
  },
  {
    title: "Maintenance & Repairs",
    body: "Vetted local vendors and 24/7 dispatch keep small issues from becoming big ones.",
    Icon: MaintenanceIcon,
  },
  {
    title: "Property Inspections",
    body: "Routine walkthroughs with photo reports so you always know your property's condition.",
    Icon: InspectionsIcon,
  },
  {
    title: "24/7 Emergency Support",
    body: "A live line for tenants around the clock — owners are never the first call at 2am.",
    Icon: SupportIcon,
  },
  {
    title: "Marketing & Vacancy Filling",
    body: "Professional photos and syndicated listings get units seen fast, minimizing vacancy days.",
    Icon: MarketingIcon,
  },
];

export type Review = {
  name: string;
  city: string;
  source: string;
  stars: number;
  quote: string;
};

export const REVIEWS: Review[] = [
  { name: "Tim P.", city: "Torrance, CA", source: "Yelp", stars: 5, quote: "I couldn't be happier. Reyna has been outstanding, she is always so sharp and on top of things." },
  { name: "Genny M.", city: "Torrance, CA", source: "Yelp", stars: 5, quote: "Reyna with Leiva Group Real Estate is AMAZING! She's very helpful, kind and prompt." },
  { name: "jennifer s.", city: "Bellevue, WA", source: "Yelp", stars: 5, quote: "She picks up the phone immediately when I call — an invaluable resource to me as a landlord." },
  { name: "Shanna T.", city: "Gardena, CA", source: "Yelp", stars: 5, quote: "She was always available, prompt, and had a great eye for details. I would highly recommend her." },
  { name: "Bernie J.", city: "Calabasas, CA", source: "Yelp", stars: 5, quote: "She is accessible, very hands on and is always available. She is like having a partner." },
  { name: "Stephanie P.", city: "Hermosa Beach, CA", source: "Yelp", stars: 5, quote: "Reyna was always super helpful and quick to respond to my needs." },
];

export const SERVICE_AREAS = ["Manhattan Beach", "Torrance", "Hermosa Beach", "Redondo Beach", "El Segundo", "Lawndale"];

export function starsDisplay(stars: number) {
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}
