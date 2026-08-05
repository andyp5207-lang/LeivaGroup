// Pure calendar/booking helpers shared between the homepage contact
// section and the standalone Contact page. No server-only imports here —
// this runs on the client too.

export const TIME_SLOTS = [
  { label: "9:00 AM", hour: 9 },
  { label: "10:00 AM", hour: 10 },
  { label: "11:00 AM", hour: 11 },
  { label: "12:00 PM", hour: 12 },
  { label: "1:00 PM", hour: 13 },
  { label: "2:00 PM", hour: 14 },
  { label: "3:00 PM", hour: 15 },
] as const;

// Business hours: Monday–Friday only (matches the footer hours). Day 0 = Sunday.
export function isBusinessDay(dow: number) {
  return dow >= 1 && dow <= 5;
}

export function fmtDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export type CalendarCell =
  | { blank: true }
  | {
      blank: false;
      day: number;
      dateStr: string;
      isOpen: boolean;
      isPast: boolean;
      isSelected: boolean;
    };

export function computeCalendarCells(year: number, month: number, selectedDate: string | null): CalendarCell[] {
  const now = new Date();
  const todayStr = fmtDateStr(now.getFullYear(), now.getMonth(), now.getDate());
  const currentHourDecimal = now.getHours() + now.getMinutes() / 60;
  const lastSlotHour = TIME_SLOTS[TIME_SLOTS.length - 1].hour;
  const todayFullyPassed = currentHourDecimal >= lastSlotHour + 1;

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: CalendarCell[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ blank: true });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = fmtDateStr(year, month, d);
    const dow = new Date(year, month, d).getDay();
    const isPast = dateStr < todayStr || (dateStr === todayStr && todayFullyPassed);
    const isOpen = isBusinessDay(dow) && !isPast;
    cells.push({ blank: false, day: d, dateStr, isOpen, isPast, isSelected: dateStr === selectedDate });
  }
  return cells;
}

export function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function dateDisplay(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/** Slots still bookable for the given date (filters out already-passed times if the date is today). */
export function slotsForDate(dateStr: string): string[] {
  const now = new Date();
  const todayStr = fmtDateStr(now.getFullYear(), now.getMonth(), now.getDate());
  const isToday = dateStr === todayStr;
  const currentHourDecimal = now.getHours() + now.getMinutes() / 60;
  return TIME_SLOTS.filter((t) => !isToday || t.hour > currentHourDecimal).map((t) => t.label);
}

export const CONTACT_REASONS = [
  "Property Management Inquiry",
  "Rental Inquiry / Tour Request",
  "Free Rental Analysis",
  "Maintenance Question",
  "General Question",
  "Other",
] as const;
