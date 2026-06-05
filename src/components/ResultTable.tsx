"use client";

import { CalculatorResult, generateCSS } from "@/lib/calculator";

interface Props {
  result: CalculatorResult;
  css: string;
}

const FONT_COLS = [
  { key: "h1",       label: "H1" },
  { key: "h2",       label: "H2" },
  { key: "h3",       label: "H3" },
  { key: "h4",       label: "H4" },
  { key: "h5",       label: "H5" },
  { key: "h6",       label: "H6" },
  { key: "bodyText", label: "Body" },
  { key: "paraText", label: "Para" },
  { key: "smallText",  label: "Small 1" },
  { key: "smallText2", label: "Small 2" },
  { key: "smallText3", label: "Small 3" },
] as const;

type RowKey = (typeof FONT_COLS)[number]["key"];

export default function ResultTable({ result, css }: Props) {
  // Only show optional small-text columns if any row has a value
  const visibleFontCols = FONT_COLS.filter((col) => {
    const optionals: RowKey[] = ["smallText", "smallText2", "smallText3"];
    if (!optionals.includes(col.key as RowKey)) return true;
    return result.breakpoints.some(
      (r) => r[col.key as keyof typeof r] !== null
    );
  });

  // ── Exports ───────────────────────────────────────────────────────────────
  function downloadFile(content: string, filename: string, mime: string) {
    const blob = new Blob([content], { type: mime });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportJSON() {
    downloadFile(
      JSON.stringify(result, null, 2),
      `RPD_${result.projectName.replace(/\s+/g, "_")}_breakpoints.json`,
      "application/json"
    );
  }

  function handleExportCSS() {
    downloadFile(
      css,
      `RPD_${result.projectName.replace(/\s+/g, "_")}_breakpoints.css`,
      "text/css"
    );
  }

  async function handleCopyCSS() {
    await navigator.clipboard.writeText(css);
    // Small feedback — you can wire this to a toast in page.tsx if preferred
    alert("CSS copied to clipboard!");
  }

  return (
	<>
		<div className="result-wrap">
			{/* ── Header ── */}
			<div className="result-header">
				<div>
					<h1 className="h6 result-project-name">
						<span>Project Name: {result.projectName}</span>

						<span>|</span>

						<span>Date: {result.date}</span>
					</h1>

					<p className="result-meta"> Base container: {result.base.container}px &nbsp;·&nbsp; Base H1: {result.base.h1}px &nbsp;·&nbsp; {result.breakpoints.length} breakpoints</p>
				</div>

				<div className="export-actions">
					<button type="button" className="export-btn" onClick={handleExportJSON}>Export JSON</button>

					<button type="button" className="export-btn" onClick={handleExportCSS}>Export CSS</button>
					
					<button type="button" className="export-btn" onClick={handleCopyCSS}>Copy CSS</button>
				</div>
			</div>

			{/* ── Table ── */}
			<div className="table-scroll">
				<table className="result-table">
					<thead>
						<tr>
							<th>Viewport</th>

							<th>Container</th>
							
							<th>Sec. Padding</th>
							
							{visibleFontCols.map((col) => (
								<th key={col.key}>{col.label}</th>
							))}
						</tr>
					</thead>

					<tbody>
						{result.breakpoints.map((row) => (
						<tr key={row.viewport}>
							<td className="vp-cell">{row.viewport}</td>

							<td>{typeof row.container === "number" ? `${row.container}px` : row.container}</td>
							
							<td>{row.sectionPadding}px</td>
							
							{visibleFontCols.map((col) => {
							const val = row[col.key as keyof typeof row];
							return (
								<td key={col.key}>
								{val !== null && val !== undefined ? `${val}px` : "—"}
								</td>
							);})}
						</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>

		<div className="disclaimer">
			<p>*These values are general guidelines and may not fit every project. You should adjust them based on your design needs.</p>
			<p>However, they serve as reliable baseline references for most responsive designs.*</p>
		</div>
	</>
  );
}
