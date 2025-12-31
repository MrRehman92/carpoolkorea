import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import Listings from "@/components/vehicleListings/common/Listings";

export const metadata = {
  title: "Trucks Available Stock",
  description: "Trucks Available Stock",
};

const filters = [{ text: "Truck" }, { text: "Diesel" }];

export default function InventoryTrucksPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings
        breadcrumbTitle="Trucks for Sale"
        heading="Browse Trucks"
        filters={filters}
        endpoint="trucks"
      />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
