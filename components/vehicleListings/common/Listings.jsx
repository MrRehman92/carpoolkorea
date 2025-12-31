"use client";

import Slider from "rc-slider";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import SelectComponent from "../../common/SelectComponent";
import SelectCompFunctional from "../../common/SelectCompFunctional";
import Link from "next/link";
import Pagination from "../../common/NewPagination";
import Sidebar from "./Sidebar";

import { getVehicles } from "@/utils/vehicles/vehicleAPI";

const CarImage = ({ src, alt, priority }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => setImgSrc(src), [src]);

  return (
    <Image
      alt={alt}
      src={imgSrc}
      width={260}
      height={195}
      style={{ objectFit: "fill", height: "100%" }}
      priority={priority}
      onError={() => setImgSrc("/images/resource/about-inner1-5.jpg")}
    />
  );
};

// ✅ Choose correct image base by endpoint
const getImageBase = (endpoint) => {
  const e = String(endpoint || "").toLowerCase();
  if (e === "buses") return process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW;
  if (e === "trucks") return process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW;
  return process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW; // cars + suvs fallback
};

// ✅ Normalize different API responses into one shape for UI
const normalizeVehicle = (v = {}, endpoint = "cars") => {
  // cars/suvs: price sometimes nested in "0"
  const nestedPriceObj = v?.[0];
  const price = v.price ?? nestedPriceObj?.price ?? null;
  const discount_price = v.discount_price ?? nestedPriceObj?.discount_price ?? null;

  return {
    id: v.id,
    name: v.name,
    slug: v.slug,
    vin: v.vin,

    price,
    discount_price,

    status: v.status,
    booking_status: v.booking_status,
    year: v.model_year ?? null,

    odometer: v.odometer ?? null,
    fuel_type: v.fuel_type ?? null,
    transmission: v.transmission ?? null,

    // cars/suvs
    engine_volume: v.engine_volume ?? null,
    drive_type: v.drive_type ?? null,
    vehicle_type: v.vehicle_type ?? null,

    // buses
    color: v.color ?? null,
    weight: v.weight ?? null,

    // trucks
    cabin_type: v.cabin_type ?? null,
    loading_weight: v.loading_weight ?? null,
    axle_type: v.axle_type ?? null,

    passenger: v.passenger ?? null,
    main_image: v.main_image ?? null,

    _endpoint: endpoint,
  };
};

// ✅ Functional sort mapping (labels -> API values)
const SORT_OPTIONS = [
  { label: "Sort by", value: "" },
  { label: "Recent Date", value: "recent" },
  { label: "Price Low to High", value: "price_asc" },
  { label: "Price High to Low", value: "price_desc" },
  { label: "Year Low to High", value: "year_asc" },
  { label: "Year High to Low", value: "year_desc" },
  { label: "Mileage Low to High", value: "mileage_asc" },
  { label: "Mileage High to Low", value: "mileage_desc" },
];

// ✅ helper
const sortLabelFromValue = (val) =>
  SORT_OPTIONS.find((o) => o.value === val)?.label || "Sort by";

export default function Listings({
  endpoint = "cars",
  breadcrumbTitle = "Vehicles for Sale",
  heading = "Browse Vehicles",
  filters = [],
}) {
  const topRef = useRef(null);

  // ✅ Persist Per Page across all pages (cars/suvs/buses/trucks) + browser restart
  const PER_PAGE_KEY = "vehicles_per_page_v1";

  // ✅ Responsive title limit
  const getLimitByScreen = () => {
    if (typeof window === "undefined") return 40;
    const w = window.innerWidth;
    if (w < 576) return 30;
    if (w < 992) return 35;
    return 40;
  };

  const [titleLimit, setTitleLimit] = useState(getLimitByScreen());
  useEffect(() => {
    const handleResize = () => setTitleLimit(getLimitByScreen());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const limitLetters = (text) => {
    const s = String(text || "").trim();
    if (!s) return "";
    return s.length > titleLimit ? s.slice(0, titleLimit).trim() + "..." : s;
  };

  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  // ✅ SSR-safe default first render
  const [perPage, setPerPage] = useState(50);
  const [hydrated, setHydrated] = useState(false);

  // ✅ IMPORTANT: store actual sort VALUE (not label)
  const [sort, setSort] = useState("");

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [price, setPrice] = useState([5000, 35000]);

  // ✅ Hydrate perPage from localStorage AFTER mount (fix hydration mismatch)
  useEffect(() => {
    setHydrated(true);
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(PER_PAGE_KEY);
    const n = Number(raw);
    const saved = [20, 30, 50, 80, 100].includes(n) ? n : 50;

    setPerPage(saved);
  }, []);

  // ✅ Save perPage only AFTER hydration
  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(PER_PAGE_KEY, String(perPage));
  }, [hydrated, perPage]);

  const imageBase = useMemo(() => getImageBase(endpoint), [endpoint]);

  const goToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ use this everywhere instead of setPage (so it scrolls up)
  const goToPage = (p) => {
    setPage(p);
    setTimeout(goToTop, 0);
  };

  const getStatusBadge = (vehicle) => {
    const booking = String(vehicle?.booking_status || "").trim().toLowerCase();
    const status = String(vehicle?.status || "").trim().toLowerCase();

    if (booking === "temporary booked") return { text: "Reserved", color: "#dc3545" };
    if (status === "sale") return { text: "Sale", color: "#198754" };
    return { text: "Sold", color: "#dc3545" };
  };

  const handlePerPageChange = (value) => {
    const v = Number(value);
    setPerPage(v);
    goToPage(1); // ✅ reset to first page + scroll up
  };

  // ✅ sort change: convert label -> value and reset page
  const handleSortChange = (label) => {
    const found = SORT_OPTIONS.find((o) => o.label === label);
    setSort(found?.value || "");
    goToPage(1);
  };

  const fmtNumber = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return "0";
    return n.toLocaleString("en-US");
  };

  const fetchVehicles = useCallback(
    async (pageNo, aliveRef) => {
      setLoading(true);
      try {
        const res = await getVehicles(endpoint, pageNo, perPage, {
          sort, // ✅ send sort VALUE to API
          price_min: price?.[0],
          price_max: price?.[1],
        });

        if (aliveRef && !aliveRef.current) return;

        const normalized = (res?.data || []).map((v) => normalizeVehicle(v, endpoint));
        setVehicles(normalized);
        setPagination(res?.pagination || null);
      } catch (err) {
        console.error("Failed to load vehicles", err);
        if (aliveRef && !aliveRef.current) return;
        setVehicles([]);
        setPagination(null);
      } finally {
        if (aliveRef && !aliveRef.current) return;
        setLoading(false);
      }
    },
    [endpoint, perPage, sort, price]
  );

  useEffect(() => {
    const aliveRef = { current: true };
    fetchVehicles(page, aliveRef);
    return () => {
      aliveRef.current = false;
    };
  }, [page, fetchVehicles]);

  // reset page when filters/endpoints change
  useEffect(() => {
    setPage(1);
  }, [endpoint, sort, perPage, price?.[0], price?.[1]]);

  // ✅ Build “chips” list depending on vehicle type/fields
  const buildChips = (v) => {
    const e = String(endpoint || "").toLowerCase();

    if (e === "trucks") {
      return [
        v.loading_weight ? `${v.loading_weight} Ton` : null,
        v.axle_type || null,
        v.cabin_type || null,
        v.color || null,
      ].filter(Boolean);
    }

    if (e === "buses") {
      return [
        v.engine_volume != null ? `${fmtNumber(v.engine_volume)} CC` : null,
        v.color || null,
        v.weight != null ? `${v.weight} Ton` : null,
        v.passenger != null ? `${Number(v.passenger)} Seats` : null,
      ].filter(Boolean);
    }

    // cars/suvs
    return [
      v.engine_volume != null ? `${fmtNumber(v.engine_volume)} CC` : null,
      v.drive_type || null,
      v.vehicle_type || null,
      v.passenger != null ? `${Number(v.passenger)} Seats` : null,
    ].filter(Boolean);
  };

  const canPrev = !!pagination && pagination.current_page > 1;
  const canNext = !!pagination && pagination.current_page < pagination.last_page;

  return (
    <section className="cars-section-thirteen layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>{breadcrumbTitle}</span>
            </li>
          </ul>

          <h2>{heading}</h2>

          {!!filters?.length && (
            <ul className="service-list">
              {filters.map((filter, index) => (
                <li key={index}>
                  <a href="#">{filter.text}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="row">
        <Sidebar />

          {/* LIST */}
          <div className="col-xl-9 col-md-12 col-sm-12">
            <div className="right-box">
              {/* ✅ scroll target */}
              <div ref={topRef} />

              <div className="text-box">
                {/* ✅ Showing text + top arrows */}
                <div className="text d-flex align-items-center gap-2">
                  {loading ? (
                    <span>Loading vehicles...</span>
                  ) : vehicles.length === 0 ? (
                    <span>No vehicles found.</span>
                  ) : (
                    <>
                      <span>
                        Showing {pagination?.from} to {pagination?.to} of {pagination?.total} vehicles
                      </span>

                      <button
                        type="button"
                        className="btn btn-light btn-sm"
                        disabled={!canPrev}
                        onClick={() => goToPage(pagination.current_page - 1)}
                        aria-label="Previous page"
                        title="Previous"
                      >
                        ←
                      </button>

                      <button
                        type="button"
                        className="btn btn-light btn-sm"
                        disabled={!canNext}
                        onClick={() => goToPage(pagination.current_page + 1)}
                        aria-label="Next page"
                        title="Next"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                  <div className="form_boxes v3">
                    <SelectCompFunctional
                      options={SORT_OPTIONS.map((o) => o.label)}
                      value={sortLabelFromValue(sort)}
                      onChange={handleSortChange}
                    />
                  </div>

                  <div className="form_boxes v3 ms-3">
                    <small>Per Page</small>
                    <SelectCompFunctional
                      options={["20", "30", "50", "80", "100"]}
                      value={hydrated ? String(perPage) : "50"}  // ✅ SSR-safe
                      onChange={handlePerPageChange}
                    />
                  </div>
                </form>
              </div>

              <div className="cars-container">
                {loading && (
                  <div className="content-column rounded">
                    <div className="inner-column vh-100 bg-light rounded">
                      <div className="text-center py-5">
                        <div className="spinner-border position-fixed" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && vehicles.length === 0 && (
                  <div className="py-5 text-center">
                    <p>No vehicles found.</p>
                  </div>
                )}

                {vehicles.map((elm, i) => {
                  const chips = buildChips(elm);
                  const badge = getStatusBadge(elm);

                  return (
                    <div key={elm?.id ?? i} className="service-block-thirteen cl-row-block">
                      <div className="inner-box">
                        <div className="image-box cl-leftBox">
                          <figure className="image" style={{ height: "100%" }}>
                            <Link href={`/inventory-page-single-v1/${elm.id}`}>
                              <CarImage
                                src={`${imageBase}/${elm.main_image}`}
                                alt={elm.name}
                                priority={i <= 2}
                              />
                            </Link>
                          </figure>
                        </div>

                        <div className="right-box cl-rightBox">
                          <div className="content-box">
                            <h4 className="title car-title" title={elm.name}>
                              <Link
                                href={`/inventory-page-single-v1/${elm.id}`}
                                className="car-title"
                                title={elm.name}
                              >
                                {limitLetters(elm.name)}
                              </Link>
                            </h4>

                            <div className="text mb-1">VIN No. {elm.vin || "-"}</div>

                            <div className="inspection-sec mb-1">
                              <div className="inspection-box">
                                <div className="info">
                                  <span>Mileage</span>
                                  <small>{elm.odometer ? `${fmtNumber(elm.odometer)} Km` : "-"}</small>
                                </div>
                              </div>

                              <div className="inspection-box">
                                <div className="info">
                                  <span>Fuel Type</span>
                                  <small>{elm.fuel_type || "-"}</small>
                                </div>
                              </div>

                              <div className="inspection-box">
                                <div className="info">
                                  <span>Transmission</span>
                                  <small>{elm.transmission || "-"}</small>
                                </div>
                              </div>

                              <div className="inspection-box">
                                <div className="info">
                                  <span>Year</span>
                                  <small>{elm.year ?? "-"}</small>
                                </div>
                              </div>
                            </div>

                            {!!chips.length && (
                              <ul className="ul-cotent">
                                {chips.map((t, idx) => (
                                  <li key={idx}>
                                    <a href="#">{t}</a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div className="content-box-two cl-contentBoxTwo">
                            {elm.price !== null && <h4 className="title">${fmtNumber(elm.price)}</h4>}

                            <span style={{ fontWeight: 700, color: badge.color }}>{badge.text}</span>

                            <Link href={`/inventory-page-single-v1/${elm.id}`} className="button">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {pagination && (
                <div className="pagination-sec">
                  <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.last_page}
                    onPageChange={goToPage} // ✅ scroll + change page
                  />
                  <div className="text">
                    Showing {pagination.from} to {pagination.to} of {pagination.total} vehicles
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
