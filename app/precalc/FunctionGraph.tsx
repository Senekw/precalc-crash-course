"use client";

// SVG function grapher, a faithful port of the source app's renderer:
// 401-sample curves, auto y-range with 10% padding, "nice" 1/2/5 grid steps,
// discontinuity breaks, dashed asymptotes (vertical / horizontal / slant),
// labeled points (closed / open / star), and a schematic mode that hides the
// grid and tick numbers for College Board style figures.

import { useMemo } from "react";
import type { GraphSpec } from "./types";

const CURVE_COLORS = ["var(--accent)", "var(--warning)", "var(--success)", "var(--error)", "#a855f7", "#06b6d4"];

type Sample = { x: number; y: number; valid: boolean };

function niceStep(raw: number): number {
  const base = 10 ** Math.floor(Math.log10(raw));
  const ratio = raw / base;
  const mult = ratio < 1.5 ? 1 : ratio < 3 ? 2 : ratio < 7 ? 5 : 10;
  return mult * base;
}

export function FunctionGraph({
  curves,
  xDomain = [-5, 5],
  yRange,
  points = [],
  asymptotes = [],
  width = 500,
  height = 320,
  grid = true,
  caption,
  schematic = false,
  xLabel,
  yLabel,
}: GraphSpec & { grid?: boolean }) {
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const [x0, x1] = xDomain;

  const sampled = useMemo(
    () =>
      curves.map((curve, index) => {
        const samples: Sample[] = [];
        for (let i = 0; i <= 400; i++) {
          const x = x0 + (x1 - x0) * (i / 400);
          let y: number;
          try {
            y = curve.fn(x);
          } catch {
            y = NaN;
          }
          samples.push({ x, y, valid: isFinite(y) });
        }
        return { ...curve, samples, color: curve.color ?? CURVE_COLORS[index % CURVE_COLORS.length] };
      }),
    [curves, x0, x1],
  );

  const [y0, y1] = useMemo<[number, number]>(() => {
    if (yRange) return yRange;
    const ys: number[] = [];
    for (const curve of sampled) for (const s of curve.samples) if (s.valid && Math.abs(s.y) < 1e6) ys.push(s.y);
    for (const p of points) ys.push(p.y);
    if (ys.length === 0) return [-5, 5];
    let lo = Math.min(...ys);
    let hi = Math.max(...ys);
    const span = Math.max(hi - lo, 1);
    lo -= span * 0.1;
    hi += span * 0.1;
    return [lo, hi];
  }, [yRange, sampled, points]);

  const sx = (x: number) => pad.left + ((x - x0) / (x1 - x0)) * innerW;
  const sy = (y: number) => pad.top + ((y1 - y) / (y1 - y0)) * innerH;
  const hasXAxis = y0 <= 0 && y1 >= 0;
  const hasYAxis = x0 <= 0 && x1 >= 0;

  const gridLines = useMemo(() => {
    if (!grid || schematic) return null;
    const lines: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
    const stepX = niceStep((x1 - x0) / 10);
    const stepY = niceStep((y1 - y0) / 10);
    for (let gx = Math.ceil(x0 / stepX) * stepX; gx <= x1; gx += stepX) {
      lines.push({ x1: sx(gx), y1: pad.top, x2: sx(gx), y2: pad.top + innerH, major: Math.abs(gx) < 1e-9 });
    }
    for (let gy = Math.ceil(y0 / stepY) * stepY; gy <= y1; gy += stepY) {
      lines.push({ x1: pad.left, y1: sy(gy), x2: pad.left + innerW, y2: sy(gy), major: Math.abs(gy) < 1e-9 });
    }
    return lines;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, schematic, x0, x1, y0, y1, innerW, innerH]);

  const xTicks = useMemo(() => {
    const step = niceStep((x1 - x0) / 10);
    const ticks: number[] = [];
    for (let t = Math.ceil(x0 / step) * step; t <= x1; t += step) {
      if (Math.abs(t) > 1e-10) ticks.push(Math.round(t * 1e3) / 1e3);
    }
    return ticks;
  }, [x0, x1]);

  const yTicks = useMemo(() => {
    const step = niceStep((y1 - y0) / 8);
    const ticks: number[] = [];
    for (let t = Math.ceil(y0 / step) * step; t <= y1; t += step) {
      if (Math.abs(t) > 1e-10) ticks.push(Math.round(t * 1e3) / 1e3);
    }
    return ticks;
  }, [y0, y1]);

  function toPaths(samples: Sample[]): string[] {
    const paths: string[] = [];
    let current: string[] = [];
    let lastY: number | null = null;
    for (const s of samples) {
      const inWindow = s.valid && s.y >= y0 - (y1 - y0) * 0.5 && s.y <= y1 + (y1 - y0) * 0.5;
      if (!s.valid || !inWindow) {
        if (current.length > 0) paths.push(current.join(" "));
        current = [];
        lastY = null;
        continue;
      }
      if (lastY !== null && Math.abs(s.y - lastY) > (y1 - y0) * 1.5) {
        if (current.length > 0) paths.push(current.join(" "));
        current = [];
      }
      current.push((current.length === 0 ? "M" : "L") + sx(s.x).toFixed(2) + " " + sy(s.y).toFixed(2));
      lastY = s.y;
    }
    if (current.length > 0) paths.push(current.join(" "));
    return paths;
  }

  const accent = "var(--accent)";
  const subtle = "var(--text-subtle)";

  return (
    <figure className="fn-graph">
      {caption ? <figcaption>{caption}</figcaption> : null}
      <div className="fn-graph-frame">
        <svg width={width} height={height} viewBox={"0 0 " + width + " " + height}>
          {gridLines?.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--border)"
              strokeOpacity={line.major ? 0.9 : 0.4}
              strokeWidth={line.major ? 1 : 0.5}
            />
          ))}
          {hasXAxis ? <line x1={pad.left} x2={pad.left + innerW} y1={sy(0)} y2={sy(0)} stroke={subtle} strokeWidth={1.2} /> : null}
          {hasYAxis ? <line x1={sx(0)} x2={sx(0)} y1={pad.top} y2={pad.top + innerH} stroke={subtle} strokeWidth={1.2} /> : null}
          {!schematic &&
            xTicks.map((t, index) => (
              <text key={"xt" + index} x={sx(t)} y={(hasXAxis ? sy(0) : pad.top + innerH) + 14} textAnchor="middle" fontSize={10} fill={subtle} fontFamily="var(--mono)">
                {t}
              </text>
            ))}
          {!schematic &&
            yTicks.map((t, index) => (
              <text key={"yt" + index} x={(hasYAxis ? sx(0) : pad.left) - 6} y={sy(t) + 3} textAnchor="end" fontSize={10} fill={subtle} fontFamily="var(--mono)">
                {t}
              </text>
            ))}
          {xLabel ? (
            <text x={pad.left + innerW - 4} y={(hasXAxis ? sy(0) : pad.top + innerH) - 6} textAnchor="end" fontSize={11} fill="var(--text)" fontStyle="italic">
              {xLabel}
            </text>
          ) : null}
          {yLabel ? (
            <text x={(hasYAxis ? sx(0) : pad.left) + 6} y={pad.top + 12} fontSize={11} fill="var(--text)" fontStyle="italic">
              {yLabel}
            </text>
          ) : null}
          {asymptotes.map((a, index) => {
            if (a.type === "vertical" && a.value !== undefined) {
              const x = sx(a.value);
              if (x < pad.left || x > pad.left + innerW) return null;
              return (
                <g key={"a" + index}>
                  <line x1={x} y1={pad.top} x2={x} y2={pad.top + innerH} stroke={accent} strokeWidth={1.5} strokeDasharray="6 4" opacity={0.55} />
                  {a.label ? (
                    <text x={x + 4} y={pad.top + 12} fontSize={10} fill={accent} opacity={0.85}>
                      {a.label}
                    </text>
                  ) : null}
                </g>
              );
            }
            if (a.type === "horizontal" && a.value !== undefined) {
              const y = sy(a.value);
              if (y < pad.top || y > pad.top + innerH) return null;
              return (
                <g key={"a" + index}>
                  <line x1={pad.left} y1={y} x2={pad.left + innerW} y2={y} stroke={accent} strokeWidth={1.5} strokeDasharray="6 4" opacity={0.55} />
                  {a.label ? (
                    <text x={pad.left + innerW - 4} y={y - 4} fontSize={10} fill={accent} opacity={0.85} textAnchor="end">
                      {a.label}
                    </text>
                  ) : null}
                </g>
              );
            }
            if (a.type === "slant" && a.fn) {
              const fn = a.fn;
              const samples: Sample[] = Array.from({ length: 100 }, (_, i) => {
                const x = x0 + (x1 - x0) * (i / 99);
                let y = NaN;
                try {
                  y = fn(x);
                } catch {
                  /* leave NaN */
                }
                return { x, y, valid: isFinite(y) };
              });
              return (
                <g key={"a" + index}>
                  {toPaths(samples).map((d, pi) => (
                    <path key={pi} d={d} fill="none" stroke={accent} strokeWidth={1.5} strokeDasharray="6 4" opacity={0.55} />
                  ))}
                  {a.label ? (
                    <text x={pad.left + innerW - 30} y={sy(fn(x1)) - 6} fontSize={10} fill={accent} opacity={0.85}>
                      {a.label}
                    </text>
                  ) : null}
                </g>
              );
            }
            return null;
          })}
          {sampled.map((curve, index) => (
            <g key={"c" + index}>
              {toPaths(curve.samples).map((d, pi) => (
                <path key={pi} d={d} fill="none" stroke={curve.color} strokeWidth={curve.strokeWidth ?? 2} strokeDasharray={curve.dash} strokeLinecap="round" strokeLinejoin="round" />
              ))}
            </g>
          ))}
          {points.map((p, index) => {
            const x = sx(p.x);
            const y = sy(p.y);
            if (x < pad.left || x > pad.left + innerW || y < pad.top || y > pad.top + innerH) return null;
            const color = p.color ?? accent;
            if (p.style === "open") {
              return (
                <g key={"p" + index}>
                  <circle cx={x} cy={y} r={4} fill="var(--surface)" stroke={color} strokeWidth={1.5} />
                  {p.label ? (
                    <text x={x + 7} y={y - 7} fontSize={10} fill={subtle}>
                      {p.label}
                    </text>
                  ) : null}
                </g>
              );
            }
            if (p.style === "star") {
              return (
                <g key={"p" + index}>
                  <circle cx={x} cy={y} r={5} fill={color} fillOpacity={0.25} />
                  <circle cx={x} cy={y} r={3} fill={color} />
                  {p.label ? (
                    <text x={x + 8} y={y - 6} fontSize={10} fill={color} fontWeight={600}>
                      {p.label}
                    </text>
                  ) : null}
                </g>
              );
            }
            return (
              <g key={"p" + index}>
                <circle cx={x} cy={y} r={3.5} fill={color} />
                {p.label ? (
                  <text x={x + 7} y={y - 7} fontSize={10} fill={subtle}>
                    {p.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
