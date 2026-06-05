import type { Metadata } from "next";
import "./globals.css";
import "@/assets/custom.css";

export const metadata: Metadata = {
  title: "RarePixels | Responsive Design System",
  description: "Responsive Design System(RDS) is a structured engine that generates breakpoint-based container sizes and typography scales from desktop inputs. It provides deterministic outputs, reusable design tokens, and consistent standards for frontend teams to build responsive interfaces with full control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
            {children}
        </body>
    </html>
  );
}