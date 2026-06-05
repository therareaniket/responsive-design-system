"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResultTable from "@/components/ResultTable";
import { CalculatorResult } from "@/lib/calculator";

export default function Home() {
  const [greeting, setGreeting] = useState("Aniket, Get your Coffee & Bang the World!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [result, setResult]       = useState<CalculatorResult | null>(null);
  const [cssOutput, setCssOutput] = useState<string>("");

  // ── Greeting ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 4)  return "Burning the midnight oil, Aniket? Let's make it count! 🌅";
      if (hour < 8)  return "Rise up, Aniket! A fresh start is calling. 🌄";
      if (hour < 12) return "Game on, Aniket! Let's crush today's goals. ☀️";
      if (hour < 16) return "Keep the momentum going, Aniket — you're doing great! 🌤️";
      if (hour < 20) return "Unwind smart, Aniket — finish strong! 🌇";
      return "Wind down, recharge, and get ready to win tomorrow, Aniket. 🌃";
    };
    setGreeting(getGreeting());
  }, []);

  // ── Form submit ───────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setResult(null);

    const fd = new FormData(e.currentTarget);

    const payload = {
      projectName:    fd.get("projectName"),
      date:           fd.get("date"),
      containerSize:  Number(fd.get("containerSize")),
      sectionPadding: Number(fd.get("sectionPadding")),
      h1:       Number(fd.get("siteH1")),
      h2:       Number(fd.get("siteH2")),
      h3:       Number(fd.get("siteH3")),
      h4:       Number(fd.get("siteH4")),
      h5:       Number(fd.get("siteH5")),
      h6:       Number(fd.get("siteH6")),
      bodyText: Number(fd.get("bodyText")),
      paraText: Number(fd.get("paraText")),
      smallText:  fd.get("smallText")  ? Number(fd.get("smallText"))  : null,
      smallText2: fd.get("smallText2") ? Number(fd.get("smallText2")) : null,
      smallText3: fd.get("smallText3") ? Number(fd.get("smallText3")) : null,
    };

    try {
      const res = await fetch("/api/calculate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult(data.result);
      setCssOutput(data.css);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="section main-section">
      <div className="container">
        <h1 className="h2">
          Welcome to Responsive Design System{" "}
          <span>
            by{" "}
            <Link href="https://rarepixelsdesign.com/" target="_blank">
              RarePixels
            </Link>
          </span>
        </h1>

        <div className="greeting-msg">
          <h2 className="h3">{greeting}</h2>
        </div>

        <div className="calculation-area">
          <p className="text-md">Enter the values from Figma</p>

          <form onSubmit={handleSubmit}>
            {/* ── Project info ── */}
            <div className="project-info">
              <div className="project-name">
                <span className="input-name">Enter Project Name</span>
                <input type="text" name="projectName" id="projectName" required />
              </div>

              <div className="date">
                <span className="input-name">Date</span>
                <input
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            {/* ── Container & padding ── */}
            <div className="container-section-pad">
              <div className="container-size">
                <span className="input-name">Enter Container Size</span>
                <input type="number" name="containerSize" id="containerSize" min="0" required />
              </div>

              <div className="section-padding">
                <span className="input-name">Enter Section Padding</span>
                <input type="number" name="sectionPadding" id="sectionPadding" min="0" required />
              </div>
            </div>

            {/* ── Headings ── */}
            <div className="site-header">
              <div className="site-header1">
                <span className="input-name">Enter Value of H1</span>
                <input type="number" name="siteH1" id="siteH1" min="0" required />
              </div>

              <div className="site-header2">
                <span className="input-name">Enter Value of H2</span>
                <input type="number" name="siteH2" id="siteH2" min="0" required />
              </div>

              <div className="site-header3">
                <span className="input-name">Enter Value of H3</span>
                <input type="number" name="siteH3" id="siteH3" min="0" required />
              </div>

              <div className="site-header4">
                <span className="input-name">Enter Value of H4</span>
                <input type="number" name="siteH4" id="siteH4" min="0" required />
              </div>

              <div className="site-header5">
                <span className="input-name">Enter Value of H5</span>
                <input type="number" name="siteH5" id="siteH5" min="0" required />
              </div>

              <div className="site-header6">
                <span className="input-name">Enter Value of H6</span>
                <input type="number" name="siteH6" id="siteH6" min="0" required />
              </div>
            </div>

            {/* ── Body & small text ── */}
            <div className="site-texts">
              <div className="body-text">
                <span className="input-name">Enter Value of Body Text</span>
                <input type="number" name="bodyText" id="bodyText" min="0" required />
              </div>

              <div className="body-text">
                <span className="input-name">Enter Value for Paragraph</span>
                <input type="number" name="paraText" id="paraText" min="0" required />
              </div>

              <div className="body-text">
                <span className="input-name">Small Text (If applied)</span>
                <input type="number" name="smallText" id="smallText" min="0" />
              </div>

              <div className="body-text">
                <span className="input-name">Small Text 2 (If applied)</span>
                <input type="number" name="smallText2" id="smallText2" min="0" />
              </div>

              <div className="body-text">
                <span className="input-name">Small Text 3 (If applied)</span>
                <input type="number" name="smallText3" id="smallText3" min="0" />
              </div>
            </div>

            {/* ── Error ── */}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`submit-btn${isLoading ? " loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Calculating…" : "Get Result"}
            </button>
          </form>
        </div>

        {/* ── Results ── */}
        {result && (
          <div id="results-section" className="results-section">
            <ResultTable result={result} css={cssOutput} />
          </div>
        )}
      </div>
    </section>
  );
}
