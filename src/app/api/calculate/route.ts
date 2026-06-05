import { NextRequest, NextResponse } from "next/server";
import { calculate, generateCSS, CalculatorInput } from "@/lib/calculator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Validate required fields ──────────────────────────────────────────────
    const required: (keyof CalculatorInput)[] = [
      "projectName", "date", "containerSize", "sectionPadding",
      "h1", "h2", "h3", "h4", "h5", "h6", "bodyText", "paraText",
    ];
    for (const field of required) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const input: CalculatorInput = {
      projectName:  String(body.projectName).trim(),
      date:         String(body.date),
      containerSize: Number(body.containerSize),
      sectionPadding: Number(body.sectionPadding),
      h1:       Number(body.h1),
      h2:       Number(body.h2),
      h3:       Number(body.h3),
      h4:       Number(body.h4),
      h5:       Number(body.h5),
      h6:       Number(body.h6),
      bodyText: Number(body.bodyText),
      paraText: Number(body.paraText),
      smallText:  body.smallText  ? Number(body.smallText)  : null,
      smallText2: body.smallText2 ? Number(body.smallText2) : null,
      smallText3: body.smallText3 ? Number(body.smallText3) : null,
    };

    // ── Run engine ────────────────────────────────────────────────────────────
    const result = calculate(input);
    const css    = generateCSS(result);

    return NextResponse.json({ result, css }, { status: 200 });

  } catch (err) {
    console.error("[/api/calculate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
