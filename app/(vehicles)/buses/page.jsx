import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import Listings from "@/components/vehicleListings/common/Listings";

export const metadata = {
  title: "Buses Available Stock",
  description: "Buses Available Stock",
};

const filters = [{ text: "Bus" }, { text: "Diesel" }];

export default function InventoryBusesPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings
        breadcrumbTitle="Buses for Sale"
        heading="Browse Buses"
        filters={filters}
        endpoint="buses"
      />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}

