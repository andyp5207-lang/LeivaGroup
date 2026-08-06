"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { submitBookingAction, type BookingFormState } from "@/lib/actions/booking";
import { computeCalendarCells, monthLabel, dateDisplay, slotsForDate, CONTACT_REASONS } from "@/lib/booking-logic";
import { SERVICE_AREAS } from "@/lib/data";

type Props = { variant: "home" | "contact" };

export default function BookingCalendar({ variant }: Props) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [, forceTick] = useState(0);

  // Re-check "today fully passed" / passed time-slots once a minute, same as the prototype.
  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const cells = useMemo(() => computeCalendarCells(year, month, selectedDate), [year, month, selectedDate]);
  const slots = useMemo(() => (selectedDate ? slotsForDate(selectedDate) : []), [selectedDate]);

  const [state, formAction, pending] = useActionState<BookingFormState, FormData>(submitBookingAction, null);
  const submitted = state && "success" in state;

  function selectDate(dateStr: string) {
    setSelectedDate(dateStr);
    setSelectedSlot(null);
  }
  function clearSelectedDate() {
    setSelectedDate(null);
    setSelectedSlot(null);
  }

  function changeMonth(delta: number) {
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setMonth(m);
    setYear(y);
  }

  const compact = variant === "home";
  const cellPad = compact ? 18 : 28;
  const cellRadius = compact ? 22 : "var(--radius-lg)";

  const calendar = (
    <div
      className="mob-cal-box"
      style={{
        padding: cellPad,
        borderRadius: cellRadius,
        border: "1px solid var(--color-divider)",
        background: compact ? "var(--color-bg)" : "var(--color-surface)",
        boxShadow: "var(--shadow-underglow)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: compact ? 12 : 18 }}>
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          style={{
            border: "1px solid var(--color-divider)",
            background: compact ? "var(--color-surface)" : "var(--color-bg)",
            borderRadius: compact ? 999 : "var(--radius-md)",
            width: compact ? 26 : 36,
            height: compact ? 26 : 36,
            cursor: "pointer",
            fontSize: compact ? 12 : 16,
          }}
        >
          ←
        </button>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: compact ? 14 : 19 }}>
          {monthLabel(year, month)}
        </div>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          style={{
            border: "1px solid var(--color-divider)",
            background: compact ? "var(--color-surface)" : "var(--color-bg)",
            borderRadius: compact ? 999 : "var(--radius-md)",
            width: compact ? 26 : 36,
            height: compact ? 26 : 36,
            cursor: "pointer",
            fontSize: compact ? 12 : 16,
          }}
        >
          →
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: compact ? 3 : 6, marginBottom: compact ? 4 : 8 }}>
        {(compact ? ["S", "M", "T", "W", "T", "F", "S"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]).map((d, i) => (
          <div key={i} className="text-muted" style={{ textAlign: "center", fontSize: compact ? 10 : 12, fontWeight: 700 }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: compact ? 3 : 6 }}>
        {cells.map((cell, i) => {
          if (cell.blank) return <div key={i} />;
          const isSelected = cell.isSelected;
          const bg = isSelected ? "var(--color-accent-700)" : cell.isOpen ? "#fff" : "transparent";
          const color = isSelected ? "#fff" : cell.isPast || !cell.isOpen ? "#9a9a9a" : "var(--color-text)";
          return (
            <button
              key={cell.dateStr}
              type="button"
              disabled={!cell.isOpen}
              onClick={() => cell.isOpen && selectDate(cell.dateStr)}
              style={{
                aspectRatio: "1",
                width: compact ? "70%" : "100%",
                margin: compact ? "0 auto" : 0,
                borderRadius: compact ? 999 : "var(--radius-md)",
                fontSize: compact ? 10 : 14,
                background: bg,
                color,
                cursor: cell.isOpen ? "pointer" : "default",
                opacity: cell.isPast ? 0.4 : 1,
                fontWeight: isSelected ? 700 : 500,
                border: cell.isOpen && !isSelected ? "1px solid var(--color-divider)" : "1px solid transparent",
                transition: "background 0.15s,color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (cell.isOpen && !isSelected) {
                  e.currentTarget.style.background = "var(--color-accent-100)";
                  e.currentTarget.style.color = "var(--color-accent-800)";
                }
              }}
              onMouseLeave={(e) => {
                if (cell.isOpen && !isSelected) {
                  e.currentTarget.style.background = bg;
                  e.currentTarget.style.color = color;
                }
              }}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
      {!compact && (
        <p className="text-muted" style={{ fontSize: 12, marginTop: 16 }}>
          Open Monday–Friday. Closed days aren&rsquo;t selectable.
        </p>
      )}
    </div>
  );

  const slotPanelBody = !selectedDate ? (
    variant === "contact" ? (
      <>
        <h4 style={{ marginBottom: 10 }}>Select a date</h4>
        <p className="text-muted" style={{ fontSize: 14, margin: 0 }}>
          Choose an open day on the calendar to see available times.
        </p>
      </>
    ) : null
  ) : submitted ? (
    <>
      <h4 style={{ marginBottom: 10 }}>You&rsquo;re booked!</h4>
      <p style={{ fontSize: 14, margin: 0 }}>
        {dateDisplay(selectedDate)} at {selectedSlot} — we&rsquo;ll be in touch to confirm.
      </p>
    </>
  ) : !selectedSlot ? (
    <>
      <h4 style={{ marginBottom: 4 }}>{dateDisplay(selectedDate)}</h4>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 18 }}>
        Choose a time
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {slots.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setSelectedSlot(label)}
            style={{
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-divider)",
              background: "var(--color-bg)",
              color: "var(--color-text)",
              cursor: "pointer",
              fontSize: 14,
              textAlign: "left",
              transition: "background 0.15s,color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent-100)";
              e.currentTarget.style.color = "var(--color-accent-800)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-bg)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
          >
            {label}
          </button>
        ))}
        {slots.length === 0 && (
          <p className="text-muted" style={{ fontSize: 13 }}>
            No remaining times today — pick another date.
          </p>
        )}
      </div>
    </>
  ) : (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <input type="hidden" name="date" value={selectedDate} />
      <input type="hidden" name="slot" value={selectedSlot} />
      <h4 style={{ marginBottom: 4 }}>{dateDisplay(selectedDate)}</h4>
      <p style={{ fontSize: 14, color: "var(--color-accent-700)", fontWeight: 700, marginTop: 0, marginBottom: 4 }}>
        {selectedSlot}
      </p>
      <div className="field">
        <label>Name</label>
        <input className="input" type="text" name="name" placeholder="Jane Smith" required />
      </div>
      <div className="field">
        <label>Email</label>
        <input className="input" type="email" name="email" placeholder="jane@email.com" required />
      </div>
      <div className="field">
        <label>Reason for Contacting</label>
        <select className="input" name="reason" defaultValue={CONTACT_REASONS[0]}>
          {CONTACT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      {state && "error" in state && (
        <p style={{ color: "#b64545", fontSize: 13, margin: 0 }}>{state.error}</p>
      )}
      <button type="submit" className="btn btn-primary btn-block" style={{ padding: "12px 28px" }} disabled={pending}>
        {pending ? "Booking…" : "Confirm Appointment"}
      </button>
    </form>
  );

  const directCard = (
    <div style={{ padding: compact ? 20 : 24, borderRadius: compact ? 22 : "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-bg)", boxShadow: "var(--shadow-underglow)" }}>
      <h4 style={{ marginBottom: 14 }}>Direct</h4>
      <p style={{ margin: "0 0 6px" }}>
        <a href="tel:+13106832601">(310) 683-2601</a>
      </p>
      <p style={{ margin: compact ? "0 0 6px" : 0 }}>
        <a href="mailto:hello.leivagroup@gmail.com">hello.leivagroup@gmail.com</a>
      </p>
      {compact && (
        <p className="text-muted" style={{ margin: 0 }}>
          Mon–Fri, 9am–4pm PT
        </p>
      )}
    </div>
  );

  const areaCard = (
    <div style={{ padding: compact ? 20 : 24, borderRadius: compact ? 22 : "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-bg)", boxShadow: "var(--shadow-underglow)" }}>
      <h4 style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--color-accent-700)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 12,
          }}
        >
          ◉
        </span>
        Service Area
      </h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {SERVICE_AREAS.map((area) => (
          <span key={area} className="tag tag-accent">
            {area}
          </span>
        ))}
      </div>
    </div>
  );

  if (variant === "home") {
    return (
      <div className={selectedDate ? "mob-stack mob-cal-has-date" : "mob-stack"} style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 20, alignItems: "start" }}>
        {calendar}
        <div key={selectedDate ?? "none"} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {!selectedDate ? (
            <>
              {directCard}
              {areaCard}
            </>
          ) : (
            <div
              style={{
                padding: 18,
                borderRadius: 22,
                border: "1px solid var(--color-divider)",
                background: "var(--color-bg)",
                boxShadow: "var(--shadow-underglow)",
                minHeight: 220,
                animation: "panelSlide 0.35s ease-out both",
              }}
            >
              {slotPanelBody}
              <button
                type="button"
                onClick={clearSelectedDate}
                style={{ marginTop: 16, border: "none", background: "none", color: "var(--color-accent-700)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 }}
              >
                ← Back to contact info
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 32, alignItems: "start" }}
        className={selectedDate ? "mob-stack mob-cal-has-date" : "mob-stack"}
      >
        {calendar}
        <div
          key={selectedDate ?? "none"}
          style={{
            padding: 28,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-divider)",
            background: "var(--color-surface)",
            boxShadow: "var(--shadow-underglow)",
            minHeight: 320,
            animation: "panelSlide 0.35s ease-out both",
          }}
        >
          {slotPanelBody}
        </div>
      </div>
      <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
        {directCard}
        {areaCard}
      </div>
    </>
  );
}
