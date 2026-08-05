import { SERVICES } from "@/lib/data";

export default function ServicesGrid({ variant = "home" }: { variant?: "home" | "services" }) {
  const isServicesPage = variant === "services";
  return (
    <div
      className={isServicesPage ? "mob-col-1" : "mob-shrink-row"}
      style={{
        display: "grid",
        gridTemplateColumns: isServicesPage ? "repeat(2,1fr)" : "repeat(3,1fr)",
        gap: 28,
      }}
    >
      {SERVICES.map((s) => (
        <div
          key={s.title}
          className={`card ${isServicesPage ? "mob-services-card" : ""}`}
          style={{ padding: isServicesPage ? 28 : 24 }}
        >
          <div className={isServicesPage ? "mob-services-icon" : ""} style={{ color: "var(--color-accent-700)" }}>
            <s.Icon />
          </div>
          <div className="card-title" style={{ marginTop: isServicesPage ? 10 : 8, fontSize: isServicesPage ? 20 : undefined }}>
            {s.title}
          </div>
          <p className="card-body" style={{ fontSize: isServicesPage ? 14 : undefined }}>
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}
