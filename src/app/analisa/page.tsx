"use client";

import { Nav } from "@/components/Nav";
import AnalisaPage from "@/components/AnalisaPage";
import { Footer } from "@/components/Footer";

export default function AnalisaRoute() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <AnalisaPage />
      </main>
      <Footer />
    </>
  );
}