import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import Listings from "@/components/vehicleListings/common/Listings";

export const metadata = {
  title: "Cars Available Stock",
  description: "Cars Available Stock",
};

const filters = [{ text: "Automatic" }, { text: "Diesel" }];

export default function InventoryCarPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings
        breadcrumbTitle="Cars for Sale"
        heading="Browse Cars"
        filters={filters}
        endpoint="cars"
      />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
