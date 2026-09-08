"use client";

import SmoothScrollProvider from "./SmoothScrollProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/transition/PageTransition";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <PageTransition />
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScrollProvider>
  );
}
