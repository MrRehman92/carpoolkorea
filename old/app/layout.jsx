"use client";
import FilterSidebar from "@/components/common/FilterSidebar";
import "../public/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import MobileMenu from "@/components/headers/MobileMenu";
import Context from "@/context/Context";
import BackToTop from "@/components/common/BackToTop";
import { usePathname } from "next/navigation"; // Import usePathname
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get pathname directly

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }

    if (typeof window !== "undefined") {
      // Initialize WOW.js
      const { WOW } = require("wowjs");
      const wow = new WOW({
        mobile: false,
        live: false,
      });
      wow.init();
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Context>
          <MobileMenu />
          <div className="boxcar-wrapper">
            <AuthProvider>{children}</AuthProvider>
          </div> <FilterSidebar />{" "}
        </Context>
        <BackToTop />
      </body>
    </html>
  );
}
