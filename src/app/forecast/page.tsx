"use client";

import { Nav } from "@/components/Nav";
import ForecastPage from "@/components/ForecastPage";
import { Footer } from "@/components/Footer";

export default function ForecastRoute() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <ForecastPage />
      </main>
      <Footer />
    </>
  );
}