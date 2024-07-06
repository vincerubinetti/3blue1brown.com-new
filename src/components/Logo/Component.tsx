import clsx from "clsx";
import { range } from "lodash";
import { cos, sin } from "@/util/math";
import styles from "./Component.module.css";

// const blue = ["#03a9f4", "#0288d1", "#0277bd", "#01579b", "#000000"];
// const brown = ["#855835", "#694229", "#5c3724", "#4a2a1b", "#000000"];

/** colors */
const blue = ["#74C0E3", "#528EA3", "#3E6576", "#224C5B", "#000000"];
const brown = ["#8C6239", "#754C24", "#603813", "#42210b", "#000000"];

/** number of star points */
const points = 28;
/** angle step */
const angleStep = 360 / points;
/** triangle height */
const height = 50;
/** half triangle base */
const halfBase = height * Math.tan((2 * Math.PI) / points);

/** iris star radii */
const r0 = 50;
const r1 = 43.75;
const r2 = 37.5;
const r3 = 30;
const r4 = 25;

export type Props = {
  className?: string;
};

/** 3Blue1Brown logo */
export default function Logo({ className }: Props) {
  return (
    <svg
      className={clsx(styles.logo, className)}
      viewBox={`-${r0} -${r0} ${r0 * 2} ${r0 * 2}`}
    >
      <IrisBack />
      <IrisOffset radius={r1} color={1} />
      <Iris radius={r0} color={2} />
      <Iris radius={r2} color={3} />
      <Iris radius={r3} color={4} />
      <Pupil />
    </svg>
  );
}

/** solid color backing of eye */
function IrisBack() {
  return (
    <g className={styles["dilate-outer"]}>
      <path
        fill={blue[0]}
        d={`M 0 0 L 0 -${r0} A ${r0} ${r0} 0 1 1 -${r0} 0 z`}
      />
      <path
        fill={brown[0]}
        d={`M 0 0 L 0 -${r0} A ${r0} ${r0} 0 0 0 -${r0} 0 z`}
      />
    </g>
  );
}

type TriangleProps = {
  angle: number;
  radius: number;
  color: string;
  half?: "right" | "left";
};

/** one triangle piece of an iris layer */
function Triangle({ angle, radius, color, half }: TriangleProps) {
  angle *= angleStep;
  const tip = [cos(angle) * radius, -sin(angle) * radius];
  const midBase = [
    cos(angle) * (radius - height),
    -sin(angle) * (radius - height),
  ];
  const leftBase = [
    midBase[0] + cos(angle + 90) * halfBase,
    midBase[1] - sin(angle + 90) * halfBase,
  ];
  const rightBase = [
    midBase[0] + cos(angle - 90) * halfBase,
    midBase[1] - sin(angle - 90) * halfBase,
  ];
  const points = [
    tip,
    half === "right" ? midBase : leftBase,
    half === "left" ? midBase : rightBase,
  ]
    .map(([x, y]) => x.toFixed(2) + "," + y.toFixed(2))
    .join(" ");
  return <polygon fill={color} points={points} />;
}

type IrisOffsetProps = {
  radius: number;
  color: number;
};

/** iris layer, ring of triangles, with angle offset */
function IrisOffset({ radius, color }: IrisOffsetProps) {
  return (
    <g className={styles["dilate-inner"]}>
      {range(-14, 7).map((angle, index) => (
        <Triangle
          key={index}
          angle={angle + 0.5}
          radius={radius}
          color={blue[color]}
        />
      ))}
      {range(7, 14).map((angle, index) => (
        <Triangle
          key={index}
          angle={angle + 0.5}
          radius={radius}
          color={brown[color]}
        />
      ))}
    </g>
  );
}

type IrisProps = {
  radius: number;
  color: number;
};

/** iris layer, ring of triangles */
function Iris({ radius, color }: IrisProps) {
  return (
    <g className={styles["dilate-inner"]}>
      <Triangle angle={-14} radius={radius} color={blue[color]} half="left" />
      {range(-13, 7).map((angle, index) => (
        <Triangle
          key={index}
          angle={angle}
          radius={radius}
          color={blue[color]}
        />
      ))}
      <Triangle angle={7} radius={radius} color={blue[color]} half="right" />
      <Triangle angle={7} radius={radius} color={brown[color]} half="left" />
      {range(8, 14).map((angle, index) => (
        <Triangle
          key={index}
          angle={angle}
          radius={radius}
          color={brown[color]}
        />
      ))}
      <Triangle angle={14} radius={radius} color={brown[color]} half="right" />
    </g>
  );
}

/** black center pupil */
function Pupil() {
  return (
    <g>
      <circle cx="0" cy="0" r={r4} fill={blue[4]} />
    </g>
  );
}
