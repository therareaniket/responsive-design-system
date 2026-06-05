import {
  BREAKPOINTS,
  FONT_MIN,
  FONT_MIN_H1,
  FONT_MIN_MOBILE,
  MOBILE_BP_INDEX,
} from "./breakpoints";

// ─── Input types ──────────────────────────────────────────────────────────────

export interface CalculatorInput {
  projectName:    string;
  date:           string;
  containerSize:  number;
  sectionPadding: number;
  h1:       number;
  h2:       number;
  h3:       number;
  h4:       number;
  h5:       number;
  h6:       number;
  bodyText: number;
  paraText: number;
  smallText?:  number | null;
  smallText2?: number | null;
  smallText3?: number | null;
}

// ─── Output types ─────────────────────────────────────────────────────────────

export interface BreakpointRow {
  viewport:       string;
  minWidth:       number;
  maxWidth:       number;
  container:      number | string;
  sectionPadding: number;
  h1:       number;
  h2:       number;
  h3:       number;
  h4:       number;
  h5:       number;
  h6:       number;
  bodyText: number;
  paraText: number;
  smallText:  number | null;
  smallText2: number | null;
  smallText3: number | null;
}

export interface CalculatorResult {
  projectName:  string;
  date:         string;
  generatedAt:  string;
  base:         Omit<BreakpointRow, "viewport" | "minWidth" | "maxWidth">;
  breakpoints:  BreakpointRow[];
}

// ─── Rule constants ───────────────────────────────────────────────────────────

const FONT_MIN_DIFF    = 2;   // min px decrease between consecutive breakpoints
const PADDING_MIN_DIFF = 10;  // min px change before padding is updated

function roundEven(value: number): number {
  const rounded = Math.round(value);
  return rounded % 2 === 0 ? rounded : rounded - 1;
}

function roundTo10(value: number): number {
  return Math.round(value / 10) * 10;
}

function getStep(base: number): number { 
	return Math.max( 2, Math.min( 10, Math.round(base * 0.08))); 
}

function reduceFont( previous: number, base: number, floor: number ): number {
  	const step = getStep(base);
  	return Math.max( floor, roundEven(previous - step));
}

function preserveHierarchy( value: number, largerValue: number, floor: number ): number {
	return Math.max( floor, Math.min(value, largerValue - 2));
}

function calcContainer( base: number, ratio: number, viewportMax: number ): number | string {
  	if (viewportMax <= 479) { return "100%"; }
  	const calculated = Math.round( base * ratio);
	return Math.min( calculated, viewportMax - 32 );
}


function calcPadding( initialPadding: number, bpIndex: number, previousPadding: number ): number {
  	if (bpIndex === 0) { return initialPadding; }
  	if (bpIndex === 1) { return previousPadding - 20; }
  	if (bpIndex === 2) { return initialPadding > 100 ? previousPadding - 20 : previousPadding; }
  	if (bpIndex === 3) { return previousPadding; }
  	if (bpIndex === 4) { return initialPadding > 100 ? previousPadding - 20 : previousPadding - 10; }
  	if (bpIndex === 5) { return initialPadding > 100 ? previousPadding - 10 : previousPadding; }
  	if (bpIndex === 6) { return previousPadding; }
  	if (bpIndex === 7) { return previousPadding; }
  	if (bpIndex === 8) { return Math.min(previousPadding, 60); }
  	if (bpIndex === 9) { return previousPadding; }
  	if (bpIndex === 10) { return previousPadding; }
  	if (bpIndex === 11) { return Math.min(previousPadding, 50); }
  	if (bpIndex === 12) { return previousPadding; }
  	if (bpIndex === 13) { return Math.min(previousPadding, 40); }

	return Math.min(previousPadding, 40);
}

function calcH1( initialH1: number, bpIndex: number, previousH1: number ): number {
	if (bpIndex === 0) { return initialH1; }
  	if (bpIndex === 1) { return initialH1 > 70 ? previousH1 - 6 : previousH1 - 2; }
  	if (bpIndex === 2) { return initialH1 > 70 ? previousH1 - 4 : previousH1; }
	if (bpIndex === 3) { return initialH1 > 70 ? previousH1 - 4 : previousH1 - 2; }
  	if (bpIndex === 4) { return initialH1 > 70 ? previousH1 - 2 : previousH1; }
	if (bpIndex === 5) { return previousH1; }
  	if (bpIndex === 6) { return initialH1 > 70 ? previousH1 - 4 : previousH1; }
  	if (bpIndex === 7) { return initialH1 > 70 ? previousH1 - 6 : previousH1 - 4; }
  	if (bpIndex === 8) { return initialH1 > 70 ? previousH1 - 4 : previousH1; }
  	if (bpIndex === 9) { return previousH1 - 2; }
  	if (bpIndex === 10) { return previousH1; }
  	if (bpIndex === 11) { return 34; }
  	if (bpIndex === 12) { return previousH1; }
  	if (bpIndex === 13) { return previousH1; }

  	return 32;
}

function calcH2( initialH2: number, bpIndex: number, previousH2: number ): number {
	if (bpIndex === 0) { return initialH2; }
  	if (bpIndex === 1) { return initialH2 > 40 ? Math.max(34, previousH2 - 4) : Math.max(34, previousH2); }
  	if (bpIndex === 2) { return initialH2 > 40 ? Math.max(34, previousH2) : Math.max(34, previousH2); }
	if (bpIndex === 3) { return initialH2 > 40 ? Math.max(34, previousH2 - 4) : Math.max(34, previousH2); }
  	if (bpIndex === 4) { return initialH2 > 40 ? Math.max(34, previousH2) : Math.max(34, previousH2); }
	if (bpIndex === 5) { return Math.max(34, previousH2); }
  	if (bpIndex === 6) { return initialH2 > 40 ? Math.max(34, previousH2 - 2) :  Math.max(34, previousH2); }
  	if (bpIndex === 7) { return initialH2 > 40 ? Math.max(34, previousH2 - 4) : Math.max(34, previousH2 - 4); }
  	if (bpIndex === 8) { return initialH2 > 40 ? Math.max(34, previousH2 - 2) : Math.max(34, previousH2); }
  	if (bpIndex === 9) { return Math.max(34, previousH2 - 4) }
  	if (bpIndex === 10) { return Math.max(34, previousH2 - 2) }
  	if (bpIndex === 11) { return 32; }
  	if (bpIndex === 12) { return previousH2; }
  	if (bpIndex === 13) { return previousH2; }

  	return 30;
}

function calcH3( initialH3: number, bpIndex: number, previousH3: number ): number {
	if (bpIndex === 0) { return initialH3; }
  	if (bpIndex === 1) { return initialH3 > 36 ? Math.max(30, previousH3) : Math.max(30, previousH3); }
  	if (bpIndex === 2) { return initialH3 > 36 ? Math.max(30, previousH3 - 4) : Math.max(30, previousH3); }
	if (bpIndex === 3) { return initialH3 > 36 ? Math.max(30, previousH3) : Math.max(30, previousH3); }
  	if (bpIndex === 4) { return initialH3 > 36 ? Math.max(30, previousH3 - 2) : Math.max(30, previousH3); }
	if (bpIndex === 5) { return Math.max(30, previousH3); }
  	if (bpIndex === 6) { return initialH3 > 36 ? Math.max(30, previousH3 - 4) :  Math.max(30, previousH3); }
  	if (bpIndex === 7) { return initialH3 > 36 ? Math.max(30, previousH3) : Math.max(30, previousH3 - 4); }
  	if (bpIndex === 8) { return initialH3 > 36 ? Math.max(30, previousH3 - 2) : Math.max(30, previousH3); }
  	if (bpIndex === 9) { return Math.max(30, previousH3 ) }
  	if (bpIndex === 10) { return Math.max(30, previousH3 - 2) }
  	if (bpIndex === 11) { return 28; }
  	if (bpIndex === 12) { return previousH3; }
  	if (bpIndex === 13) { return previousH3; }

  	return 26;
}

function calcH4( initialH4: number, bpIndex: number, previousH4: number ): number {
	if (bpIndex === 0) { return initialH4; }
  	if (bpIndex === 1) { return initialH4 > 34 ? Math.max(28, previousH4) : Math.max(28, previousH4); }
  	if (bpIndex === 2) { return initialH4 > 34 ? Math.max(28, previousH4 - 4) : Math.max(28, previousH4); }
	if (bpIndex === 3) { return initialH4 > 34 ? Math.max(28, previousH4) : Math.max(28, previousH4); }
  	if (bpIndex === 4) { return initialH4 > 34 ? Math.max(28, previousH4 - 2) : Math.max(28, previousH4); }
	if (bpIndex === 5) { return Math.max(28, previousH4); }
  	if (bpIndex === 6) { return initialH4 > 34 ? Math.max(28, previousH4 - 4) :  Math.max(28, previousH4); }
  	if (bpIndex === 7) { return initialH4 > 34 ? Math.max(28, previousH4) : Math.max(28, previousH4 - 4); }
  	if (bpIndex === 8) { return initialH4 > 34 ? Math.max(28, previousH4 - 2) : Math.max(28, previousH4); }
  	if (bpIndex === 9) { return Math.max(28, previousH4 ) }
  	if (bpIndex === 10) { return Math.max(28, previousH4 - 2) }
  	if (bpIndex === 11) { return 26; }
  	if (bpIndex === 12) { return previousH4; }
  	if (bpIndex === 13) { return previousH4; }

  	return 24;
}

function calcH5( initialH5: number, bpIndex: number, previousH5: number ): number {
	if (bpIndex === 0) { return initialH5; }
	if (bpIndex === 2) { return initialH5 > 30 ? Math.max(24, previousH5) : Math.max(24, previousH5); }
	if (bpIndex === 1) { return initialH5 > 30 ? Math.max(24, previousH5) : Math.max(24, previousH5); }
	if (bpIndex === 3) { return initialH5 > 30 ? Math.max(24, previousH5) : Math.max(24, previousH5); }
  	if (bpIndex === 4) { return initialH5 > 30 ? Math.max(24, previousH5 - 2) : Math.max(24, previousH5); }
	if (bpIndex === 5) { return Math.max(24, previousH5); }
  	if (bpIndex === 6) { return initialH5 > 30 ? Math.max(24, previousH5 - 4) :  Math.max(24, previousH5); }
  	if (bpIndex === 7) { return initialH5 > 30 ? Math.max(24, previousH5) : Math.max(24, previousH5 - 4); }
  	if (bpIndex === 8) { return initialH5 > 30 ? Math.max(24, previousH5 - 2) : Math.max(24, previousH5); }
  	if (bpIndex === 9) { return Math.max(24, previousH5 ) }
  	if (bpIndex === 10) { return Math.max(24, previousH5 - 2) }
  	if (bpIndex === 11) { return 22; }
  	if (bpIndex === 12) { return previousH5; }
  	if (bpIndex === 13) { return previousH5; }

  	return 20;
}

function calcH6( initialH6: number, bpIndex: number, previousH6: number ): number {
	if (bpIndex === 0) { return initialH6; }
	if (bpIndex === 2) { return initialH6 > 28 ? Math.max(22, previousH6) : Math.max(22, previousH6); }
	if (bpIndex === 1) { return initialH6 > 28 ? Math.max(22, previousH6) : Math.max(22, previousH6); }
	if (bpIndex === 3) { return initialH6 > 28 ? Math.max(22, previousH6) : Math.max(22, previousH6); }
  	if (bpIndex === 4) { return initialH6 > 28 ? Math.max(22, previousH6 - 2) : Math.max(22, previousH6); }
	if (bpIndex === 5) { return Math.max(22, previousH6); }
  	if (bpIndex === 6) { return initialH6 > 28 ? Math.max(22, previousH6 - 4) :  Math.max(22, previousH6); }
  	if (bpIndex === 7) { return initialH6 > 28 ? Math.max(22, previousH6) : Math.max(22, previousH6 - 4); }
  	if (bpIndex === 8) { return initialH6 > 28 ? Math.max(22, previousH6 - 2) : Math.max(22, previousH6); }
  	if (bpIndex === 9) { return Math.max(22, previousH6 ) }
  	if (bpIndex === 10) { return Math.max(22, previousH6 - 2) }
  	if (bpIndex === 11) { return Math.max(20, previousH6); }
  	if (bpIndex === 12) { return previousH6; }
  	if (bpIndex === 13) { return previousH6; }

  	return 18;
}

function calcBody( initialBody: number, bpIndex: number, previousBody: number ): number {
	if (bpIndex === 0) { return initialBody; }
	if (bpIndex === 2) { return initialBody > 26 ? Math.max(20, previousBody) : Math.max(20, previousBody); }
	if (bpIndex === 1) { return initialBody > 26 ? Math.max(20, previousBody) : Math.max(20, previousBody); }
	if (bpIndex === 3) { return initialBody > 26 ? Math.max(20, previousBody) : Math.max(20, previousBody); }
  	if (bpIndex === 4) { return initialBody > 26 ? Math.max(20, previousBody - 2) : Math.max(20, previousBody); }
	if (bpIndex === 5) { return Math.max(20, previousBody); }
  	if (bpIndex === 6) { return initialBody > 26 ? Math.max(20, previousBody) :  Math.max(20, previousBody - 2); }
  	if (bpIndex === 7) { return initialBody > 26 ? Math.max(20, previousBody - 2) : Math.max(20, previousBody); }
  	if (bpIndex === 8) { return initialBody > 26 ? Math.max(20, previousBody) : Math.max(20, previousBody); }
  	if (bpIndex === 9) { return Math.max(20, previousBody) }
  	if (bpIndex === 10) { return Math.max(20, previousBody) }
  	if (bpIndex === 11) { return Math.max(18, previousBody); }
  	if (bpIndex === 12) { return previousBody; }
  	if (bpIndex === 13) { return previousBody; }

  	return 16;
}

function calcPara( initialPara: number, bpIndex: number, previousPara: number ): number {
	if (bpIndex === 0) { return initialPara; }
	if (bpIndex === 2) { return initialPara > 24 ? Math.max(18, previousPara) : Math.max(18, previousPara); }
	if (bpIndex === 1) { return initialPara > 24 ? Math.max(18, previousPara) : Math.max(18, previousPara); }
	if (bpIndex === 3) { return initialPara > 24 ? Math.max(18, previousPara) : Math.max(18, previousPara); }
  	if (bpIndex === 4) { return initialPara > 24 ? Math.max(18, previousPara - 2) : Math.max(18, previousPara); }
	if (bpIndex === 5) { return Math.max(18, previousPara); }
  	if (bpIndex === 6) { return initialPara > 24 ? Math.max(18, previousPara) :  Math.max(18, previousPara - 2); }
  	if (bpIndex === 7) { return initialPara > 24 ? Math.max(18, previousPara - 2) : Math.max(18, previousPara); }
  	if (bpIndex === 8) { return initialPara > 24 ? Math.max(18, previousPara) : Math.max(18, previousPara); }
  	if (bpIndex === 9) { return Math.max(18, previousPara) }
  	if (bpIndex === 10) { return Math.max(18, previousPara) }
  	if (bpIndex === 11) { return Math.max(16, previousPara); }
  	if (bpIndex === 12) { return previousPara; }
  	if (bpIndex === 13) { return previousPara; }

  	return 14;
}

const FONT_KEYS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "bodyText", "paraText",
  "smallText", "smallText2", "smallText3",
] as const;

type FontKey = (typeof FONT_KEYS)[number];

// ─── Main engine ──────────────────────────────────────────────────────────────

export function calculate( input: CalculatorInput ): CalculatorResult {
	const rows: BreakpointRow[] = [];
  	for ( let i = 0; i < BREAKPOINTS.length; i++) {
    const bp = BREAKPOINTS[i];

    if (i === 0) {
    	rows.push({
        viewport: bp.label,
        minWidth: bp.min,
        maxWidth: bp.max,

        container: input.containerSize,

        sectionPadding:
          	roundTo10( input.sectionPadding ),
        	h1: input.h1,
        	h2: input.h2,
        	h3: input.h3,
        	h4: input.h4,
        	h5: input.h5,
        	h6: input.h6,
        	bodyText: input.bodyText,
        	paraText: input.paraText,
        	smallText: input.smallText ?? null,
        	smallText2: input.smallText2 ?? null,
        	smallText3: input.smallText3 ?? null,
      	});
    	continue;
    }

    const prev = rows[i - 1];
    const h1 = calcH1( input.h1, i, prev.h1 );
    const h2 = calcH2( input.h2, i, prev.h2 );
    const h3 = calcH3( input.h3, i, prev.h3 );
    const h4 = calcH4( input.h4, i, prev.h4 );
    const h5 = calcH5( input.h5, i, prev.h5 );
    const h6 = calcH6( input.h6, i, prev.h6 );
    const bodyText = calcBody( input.bodyText, i, prev.bodyText );
    // const paraText = preserveHierarchy( reduceFont( prev.paraText, input.paraText, FONT_MIN ), bodyText, FONT_MIN );
    const paraText = calcPara( input.paraText, i, prev.paraText );

    rows.push({ viewport: bp.label, minWidth: bp.min, maxWidth: bp.max,
      	container: calcContainer( input.containerSize, bp.containerRatio, bp.max ),
      	sectionPadding: calcPadding( input.sectionPadding, i, prev.sectionPadding ), h1, h2, h3, h4, h5, h6, bodyText, paraText,
    	smallText: input.smallText ?? null,
	    smallText2: input.smallText2 ?? null,
      	smallText3: input.smallText3 ?? null,
    });
  }

  return {
    projectName: input.projectName,
    date: input.date,

    generatedAt: new Date().toISOString(),

    base: {
      	container: input.containerSize,
      	sectionPadding: input.sectionPadding,
      	h1: input.h1,
      	h2: input.h2,
      	h3: input.h3,
      	h4: input.h4,
      	h5: input.h5,
      	h6: input.h6,
      	bodyText: input.bodyText,
      	paraText: input.paraText,
      	smallText: input.smallText ?? null,
      	smallText2: input.smallText2 ?? null,
      	smallText3: input.smallText3 ?? null,
    },
    breakpoints: rows,
  };
}

// ─── CSS export ───────────────────────────────────────────────────────────────

export function generateCSS(result: CalculatorResult): string {
  const { projectName, date, generatedAt, breakpoints } = result;
  const hasSmall  = breakpoints.some(r => r.smallText  !== null);
  const hasSmall2 = breakpoints.some(r => r.smallText2 !== null);
  const hasSmall3 = breakpoints.some(r => r.smallText3 !== null);

  let css = `/*\n * ${projectName}\n * Date: ${date}\n * Generated: ${generatedAt}\n * Responsive Design System — RarePixels\n */\n\n`;

  breakpoints.forEach((r, i) => {
    const mq = i === 0
      ? `@media (min-width: ${r.minWidth}px)`
      : `@media (max-width: ${r.maxWidth}px)`;
    css += `${mq} {\n`;

	if (typeof r.container === "string") { css += `.container { width: 100%; max-width: 100%; }`; }
	else { css += ` .container { max-width: calc(${r.container}px + 36px); } `; }
    css += `  .section   { padding: ${r.sectionPadding}px 0px; }\n`;
    css += `  h1         { font-size: ${r.h1}px; }\n`;
    css += `  h2         { font-size: ${r.h2}px; }\n`;
    css += `  h3         { font-size: ${r.h3}px; }\n`;
    css += `  h4         { font-size: ${r.h4}px; }\n`;
    css += `  h5         { font-size: ${r.h5}px; }\n`;
    css += `  h6         { font-size: ${r.h6}px; }\n`;
    css += `  body       { font-size: ${r.bodyText}px; }\n`;
    css += `  p          { font-size: ${r.paraText}px; }\n`;
    if (hasSmall  && r.smallText  !== null) css += `  .small-text   { font-size: ${r.smallText}px; }\n`;
    if (hasSmall2 && r.smallText2 !== null) css += `  .small-text-2 { font-size: ${r.smallText2}px; }\n`;
    if (hasSmall3 && r.smallText3 !== null) css += `  .small-text-3 { font-size: ${r.smallText3}px; }\n`;
    css += `}\n\n`;
  });

  return css;
}