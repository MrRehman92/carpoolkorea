import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import Listings from "@/components/vehicleListings/common/Listings";

export const metadata = {
  title: "SUVs Available Stock",
  description: "SUVs Available Stock",
};

const filters = [{ text: "SUV" }, { text: "AWD" }, { text: "Diesel" }];

export default function InventorySuvPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings
        breadcrumbTitle="SUVs for Sale"
        heading="Browse SUVs"
        filters={filters}
        endpoint="suvs"   // ✅ IMPORTANT FIX
      />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
