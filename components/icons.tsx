import type { SVGProps } from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function ScreeningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx={9} cy={7} r={4} />
      <path d="M2 21v-2a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v2" />
      <polyline points="16 11 18 13 22 9" />
    </Icon>
  );
}

export function AccountingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="M12 7v10" />
      <path d="M14.5 9.5a2.5 2 0 0 0 -2.5 -1.5c-1.4 0-2.5.7-2.5 1.8s1 1.6 2.5 2c1.5.4 2.5.9 2.5 2s-1.1 1.9-2.5 1.9a2.6 2.1 0 0 1 -2.5 -1.5" />
    </Icon>
  );
}

export function MaintenanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M14.7 6.3a4 4 0 0 0 -5.4 4.6l-6 6 2.4 2.4 6-6a4 4 0 0 0 4.6 -5.4l-2.3 2.3-2.6-.6-.6-2.6z" />
    </Icon>
  );
}

export function InspectionsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x={5} y={4} width={14} height={17} rx={1} />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 13l2 2 4-4" />
    </Icon>
  );
}

export function SupportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6 3h3l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2L18.5 13.5V16.5a1.5 1.5 0 0 1 -1.6 1.5A15 15 0 0 1 4.5 4.6 1.5 1.5 0 0 1 6 3z" />
    </Icon>
  );
}

export function MarketingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M4 10v4l3 1v3a1 1 0 0 0 1 1h1v-4" />
      <path d="M8 9 17 5v14L8 15" />
      <path d="M8 9v6" />
      <path d="M17 9a3 3 0 0 1 0 6" />
    </Icon>
  );
}

export function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props} width={24} height={24}>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </Icon>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props} width={24} height={24}>
      <path d="M12 2l3 6.5 7 1-5 5 1.2 7-6.2-3.4L5.8 21.5 7 14.5l-5-5 7-1z" />
    </Icon>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props} width={24} height={24}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx={12} cy={9.5} r={2.5} />
    </Icon>
  );
}

export function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props} width={24} height={24}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6l-6 6 2.4 2.4 6-6a4 4 0 0 0 4.6-5.4l-2.3 2.3-2.6-.6-.6-2.6z" />
    </Icon>
  );
}
