"use client";

import { Nav } from "@/components/Nav";
import PaymentPage from "@/components/PaymentPage";
import { Footer } from "@/components/Footer";

export default function PaymentRoute() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PaymentPage />
      </main>
      <Footer />
    </>
  );
}