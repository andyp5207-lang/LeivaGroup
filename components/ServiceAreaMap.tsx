export default function ServiceAreaMap() {
  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" style={{ display: "block" }}>
      <rect x={0} y={0} width={400} height={260} fill="var(--color-neutral-100)" />
      <path d="M0,0 H72 C56,42 40,86 50,128 C60,172 34,214 46,260 H0 Z" fill="var(--color-accent-200)" />
      <path d="M8,20 H60 M6,55 H58 M10,90 H62 M8,125 H55 M12,160 H50 M10,195 H45 M14,230 H42" stroke="var(--color-accent-300)" strokeWidth={1} opacity={0.6} />

      <rect x={255} y={18} width={26} height={20} rx={2} fill="var(--color-accent-2-200)" opacity={0.7} />
      <rect x={340} y={150} width={30} height={24} rx={2} fill="var(--color-accent-2-200)" opacity={0.7} />
      <rect x={150} y={200} width={24} height={18} rx={2} fill="var(--color-accent-2-200)" opacity={0.7} />

      <path d="M72,20 H400 M72,50 H400 M72,140 H400 M72,165 H400 M72,220 H400 M72,245 H400 M72,35 H400 M72,180 H400" stroke="var(--color-neutral-300)" strokeWidth={1} />
      <path d="M100,0 V260 M235,0 V260 M265,0 V260 M365,0 V260 M120,0 V260 M290,0 V260" stroke="var(--color-neutral-300)" strokeWidth={1} />

      <rect x={78} y={42} width={14} height={6} fill="var(--color-neutral-300)" opacity={0.8} />
      <rect x={96} y={42} width={10} height={6} fill="var(--color-neutral-300)" opacity={0.8} />
      <rect x={240} y={24} width={16} height={8} fill="var(--color-neutral-300)" opacity={0.8} />
      <rect x={300} y={145} width={18} height={8} fill="var(--color-neutral-300)" opacity={0.8} />
      <rect x={80} y={150} width={14} height={8} fill="var(--color-neutral-300)" opacity={0.8} />

      <path d="M150,0 L300,260" stroke="var(--color-neutral-500)" strokeWidth={4} fill="none" />
      <path d="M72,95 H400" stroke="var(--color-neutral-500)" strokeWidth={4} fill="none" />
      <path d="M330,0 V260" stroke="var(--color-neutral-500)" strokeWidth={3.5} fill="none" />

      <rect x={212} y={42} width={20} height={14} rx={3} fill="#fff" stroke="var(--color-accent-700)" strokeWidth={1.2} />
      <text x={222} y={52} fontFamily="Barlow, sans-serif" fontSize={8.5} fontWeight={700} fill="var(--color-accent-800)" textAnchor="middle">405</text>
      <rect x={368} y={86} width={20} height={14} rx={3} fill="#fff" stroke="var(--color-accent-700)" strokeWidth={1.2} />
      <text x={378} y={96} fontFamily="Barlow, sans-serif" fontSize={8.5} fontWeight={700} fill="var(--color-accent-800)" textAnchor="middle">105</text>
      <rect x={336} y={185} width={20} height={14} rx={3} fill="#fff" stroke="var(--color-accent-700)" strokeWidth={1.2} />
      <text x={346} y={195} fontFamily="Barlow, sans-serif" fontSize={8.5} fontWeight={700} fill="var(--color-accent-800)" textAnchor="middle">110</text>

      <text x={46} y={24} fontFamily="Barlow, sans-serif" fontSize={12} fill="var(--color-text)">El Segundo</text>
      <text x={112} y={70} fontFamily="Barlow, sans-serif" fontSize={12} fill="var(--color-text)">Hawthorne</text>
      <text x={60} y={120} fontFamily="Barlow, sans-serif" fontSize={12} fontWeight={700} fill="var(--color-text)">Manhattan Beach</text>
      <text x={60} y={168} fontFamily="Barlow, sans-serif" fontSize={12} fill="var(--color-text)">Hermosa Beach</text>
      <text x={60} y={205} fontFamily="Barlow, sans-serif" fontSize={12} fill="var(--color-text)">Redondo Beach</text>
      <text x={260} y={150} fontFamily="Barlow, sans-serif" fontSize={12} fill="var(--color-text)">Gardena</text>
      <text x={210} y={115} fontFamily="Barlow, sans-serif" fontSize={12} fill="var(--color-text)">Lawndale</text>
      <text x={270} y={235} fontFamily="Barlow, sans-serif" fontSize={13} fontWeight={700} fill="var(--color-text)">Torrance</text>
      <text x={290} y={60} fontFamily="Barlow, sans-serif" fontSize={12} fill="var(--color-text)">Carson</text>

      <path d="M195,130 c0,-14 22,-14 22,0 c0,10 -11,22 -11,28 c0,-6 -11,-18 -11,-28 z" fill="var(--color-accent-700)" stroke="#fff" strokeWidth={1.5} />
      <circle cx={206} cy={131} r={4} fill="#fff" />
      <rect x={212} y={160} width={88} height={20} rx={10} fill="#fff" stroke="var(--color-accent-700)" strokeWidth={1.2} />
      <text x={256} y={174} fontFamily="'Barlow Condensed', sans-serif" fontSize={14} fontWeight={700} fill="var(--color-accent-800)" textAnchor="middle">LEIVA GROUP</text>
    </svg>
  );
}
