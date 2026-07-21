type FlagProps = { className?: string };

/** Unit 5-point star (outer radius 1, inner radius 0.4), used by SG & MY flags. */
const STAR_D =
  "M0,-1 L0.235,-0.324 L0.951,-0.309 L0.380,0.124 L0.588,0.809 L0,0.4 L-0.588,0.809 L-0.380,0.124 L-0.951,-0.309 L-0.235,-0.324 Z";

function Star({
  x,
  y,
  scale = 1,
  fill,
}: {
  x: number;
  y: number;
  scale?: number;
  fill: string;
}) {
  return (
    <path d={STAR_D} fill={fill} transform={`translate(${x} ${y}) scale(${scale})`} />
  );
}

/** Small, recognisable national flags rendered as flat SVG badges (3:2 ratio). */

export function SGFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Singapore">
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="10" fill="#ED2939" />
      <circle cx="7" cy="6" r="3.3" fill="#fff" />
      <circle cx="8.35" cy="6" r="2.85" fill="#ED2939" />
      <Star x={12} y={3.5} scale={0.85} fill="#fff" />
      <Star x={14.38} y={5.23} scale={0.85} fill="#fff" />
      <Star x={13.47} y={8.02} scale={0.85} fill="#fff" />
      <Star x={10.53} y={8.02} scale={0.85} fill="#fff" />
      <Star x={9.62} y={5.23} scale={0.85} fill="#fff" />
    </svg>
  );
}

export function PHFlag({ className }: FlagProps) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const x1 = 5.7 + Math.cos(rad) * 1.7;
    const y1 = 10 + Math.sin(rad) * 1.7;
    const x2 = 5.7 + Math.cos(rad) * 2.7;
    const y2 = 10 + Math.sin(rad) * 2.7;
    return { x1, y1, x2, y2 };
  });
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Philippines">
      <rect width="30" height="10" fill="#0038A8" />
      <rect y="10" width="30" height="10" fill="#CE1126" />
      <polygon points="0,0 0,20 17,10" fill="#fff" />
      <g stroke="#FCD116" strokeWidth={0.6} strokeLinecap="round">
        {rays.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </g>
      <circle cx="5.7" cy="10" r="1.5" fill="#FCD116" />
      <Star x={2.4} y={2.6} scale={0.5} fill="#FCD116" />
      <Star x={2.4} y={17.4} scale={0.5} fill="#FCD116" />
      <Star x={12.8} y={10} scale={0.5} fill="#FCD116" />
    </svg>
  );
}

export function MYFlag({ className }: FlagProps) {
  const stripeCount = 7;
  const stripeH = 20 / stripeCount;
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Malaysia">
      {Array.from({ length: stripeCount }, (_, i) => (
        <rect
          key={i}
          y={i * stripeH}
          width="30"
          height={stripeH}
          fill={i % 2 === 0 ? "#CC0001" : "#fff"}
        />
      ))}
      <rect width="15" height="10" fill="#010066" />
      <circle cx="7.4" cy="5" r="3" fill="#FFCC00" />
      <circle cx="8.5" cy="5" r="2.5" fill="#010066" />
      <Star x={11.6} y={5} scale={0.85} fill="#FFCC00" />
    </svg>
  );
}

export function INFlag({ className }: FlagProps) {
  const bandH = 20 / 3;
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    return { x2: 15 + Math.cos(angle) * 2.2, y2: 10 + Math.sin(angle) * 2.2 };
  });
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="India">
      <rect width="30" height={bandH} y={0} fill="#FF9933" />
      <rect width="30" height={bandH} y={bandH} fill="#fff" />
      <rect width="30" height={bandH} y={bandH * 2} fill="#138808" />
      <g stroke="#000080" strokeWidth={0.32} fill="none">
        <circle cx="15" cy="10" r="2.2" />
        {spokes.map((s, i) => (
          <line key={i} x1="15" y1="10" x2={s.x2} y2={s.y2} />
        ))}
      </g>
      <circle cx="15" cy="10" r="0.4" fill="#000080" />
    </svg>
  );
}
