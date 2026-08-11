"use client";

// KaTeX rendering. MathText mirrors the source app's `$` component:
// it splits plain text on $inline$ and $$display$$ segments and renders
// **bold** markdown in the text runs. LaTeX strings pass through untouched.

import { useMemo } from "react";
import katex from "katex";

type Segment = { kind: "text" | "inline" | "display"; value: string };

export function splitMathSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === "$" && text[i + 1] === "$") {
      const end = text.indexOf("$$", i + 2);
      if (end === -1) {
        segments.push({ kind: "text", value: text.slice(i) });
        break;
      }
      segments.push({ kind: "display", value: text.slice(i + 2, end) });
      i = end + 2;
    } else if (text[i] === "$") {
      const end = text.indexOf("$", i + 1);
      if (end === -1) {
        segments.push({ kind: "text", value: text.slice(i) });
        break;
      }
      segments.push({ kind: "inline", value: text.slice(i + 1, end) });
      i = end + 1;
    } else {
      let end = i;
      while (end < text.length && text[end] !== "$") end += 1;
      segments.push({ kind: "text", value: text.slice(i, end) });
      i = end;
    }
  }
  return segments;
}

function renderKatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, { displayMode, throwOnError: false, strict: false });
  } catch {
    return latex;
  }
}

function BoldText({ value }: { value: string }) {
  if (!value.includes("**")) return <>{value}</>;
  return (
    <>
      {value.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
        const match = /^\*\*([^*]+)\*\*$/.exec(part);
        return match ? <strong key={index}>{match[1]}</strong> : <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function MathInline({ children }: { children: string }) {
  const html = useMemo(() => renderKatex(children, false), [children]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MathBlock({ children, className }: { children: string; className?: string }) {
  const html = useMemo(() => renderKatex(children, true), [children]);
  return <div className={"math-block " + (className ?? "")} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MathText({ text, className }: { text: string; className?: string }) {
  const segments = useMemo(() => splitMathSegments(text), [text]);
  return (
    <span className={className}>
      {segments.map((segment, index) =>
        segment.kind === "text" ? (
          <span key={index}>
            <BoldText value={segment.value} />
          </span>
        ) : segment.kind === "inline" ? (
          <MathInline key={index}>{segment.value}</MathInline>
        ) : (
          <MathBlock key={index}>{segment.value}</MathBlock>
        ),
      )}
    </span>
  );
}
