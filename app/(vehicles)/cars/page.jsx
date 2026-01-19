import Listings from "@/components/vehicleListings/common/Listings";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Inventory Sidebar Rows || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function InventorySidebarRowsPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings endpoint="cars" breadcrumbTitle="Cars for Sale" heading="Browse Cars" />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
