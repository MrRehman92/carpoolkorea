"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../../common/NewPagination";
import SelectCompFunctional from "../../common/SelectCompFunctional";
import { getEncarVehicles } from "@/utils/vehicles/encarAPI";

// Helper to normalize Encar data
const normalizeEncarVehicle = (v) => {
    const imgBase = process.env.NEXT_PUBLIC_ENCAR_IMG_SRC;
    let mainImage = "/images/resource/about-inner1-5.jpg";

    if (v.Photos && v.Photos.length > 0) {
        mainImage = `${imgBase}${v.Photos[0].location}?impolicy=heightRate&rh=192&cw=320&ch=192&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&wtmkg=SouthEast&wtmkw=70&wtmkh=30&t=20251212092207`;
    } else if (v.Photo) {
        mainImage = `${imgBase}${v.Photo}001.jpg?impolicy=heightRate&rh=192&cw=320&ch=192&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&wtmkg=SouthEast&wtmkw=70&wtmkh=30&t=20251212092207`;
    }

    return {
        id: v.Id,
        title: `${v.FormYear || ''} ${v.Manufacturer || 'Manufacturer'} ${v.Model || 'Model'}`.trim(),
        price: v.Price !== undefined ? v.Price : "Price",
        year: v.FormYear || v.Year || "Year",
        mileage: v.Mileage !== undefined ? v.Mileage : "Mileage",
        fuel: v.FuelType || "Fuel Type",
        transmission: v.Transmission || "Transmission",
        img: mainImage,
        vin: v.VIN || v.Vin || v.vin || "-",

        engine_volume: v.EngineVolume || "Engine Volume",
        drive_type: v.DriveType || "Drive Type",
        vehicle_type: v.VehicleType || "Vehicle Type",
        seats: v.Seats || "Seats",
    };
};

export default function EncarListings() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortbyOpt, setSortbyOpt] = useState('Sort By');
    const [sortbyVal, setSortbyVal] = useState('default');

    // Load perPage from local storage
    useEffect(() => {
        const saved = localStorage.getItem("encar_per_page");
        if (saved) {
            setPerPage(Number(saved));
        }
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const data = await getEncarVehicles(page, perPage, sortbyVal);

        if (data && data.data) {
            const norm = data.data.map(normalizeEncarVehicle);
            setVehicles(norm);
            setTotalRecords(data.recordsTotal || 0);
        } else {
            setVehicles([]);
            setTotalRecords(0);
        }
        setLoading(false);
    }, [page, perPage, sortbyVal]);

    useEffect(() => {
        fetchData();
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [fetchData]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePerPageChange = (value) => {
        const val = Number(value);
        setPerPage(val);
        setPage(1);
        localStorage.setItem("encar_per_page", val);
    };

    const handleSortChange = (option, value) => {
        setSortbyOpt(option);
        setSortbyVal(value);
        setPage(1);
    };

    const totalPages = Math.ceil(totalRecords / perPage);
    const from = (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, totalRecords);

    // Helper for safe display
    const fmt = (val, suffix = "") => {
        if (val === undefined || val === null) return "-";
        if (typeof val === 'string' && ["Price", "Mileage", "Year", "Fuel Type", "Transmission", "Manufacturer", "Model", "Engine Volume", "Drive Type", "Vehicle Type", "Seats"].includes(val)) return val;
        // Format numbers
        if (typeof val === 'number') return val.toLocaleString("en-US") + suffix;
        return val;
    };

    const buildChips = (elm) => {
        return [
            fmt(elm.engine_volume, " CC"),
            fmt(elm.drive_type),
            fmt(elm.vehicle_type),
            fmt(elm.seats, " Seats"),
        ];
    };

    return (
        <section className="cars-section-thirteen layout-radius">
            <div className="boxcar-container">
                <div className="boxcar-title-three wow fadeInUp">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <span>Other Vehicles</span>
                        </li>
                    </ul>
                    <h2>Browse Encar Inventory</h2>
                </div>

                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                        <div className="sidebar-content-three">
                            <div className="sidebar-widget-three">
                                <h5 className="widget-title">Encar Filters</h5>
                                <div className="widget-content">
                                    <p className="text-muted">////////////</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Listing */}
                    <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                        <div className="right-box">

                            {/* Listing Header */}
                            <div className="text-box mb-4">
                                <div className="text d-flex align-items-center gap-2">
                                    {loading ? (
                                        <span>Loading...</span>
                                    ) : (
                                        <span>
                                            Showing {totalRecords > 0 ? from : 0} to {to} of {totalRecords} vehicles
                                        </span>
                                    )}
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                                        <div className="form_boxes v3 me-3">
                                            <SelectCompFunctional
                                                options={[
                                                    "Sort By",
                                                    "Price: Low to High",
                                                    "Price: High to Low",
                                                    "Mileage: Low to High",
                                                    "Mileage: High to Low",
                                                    "Year: New to Old"
                                                ]}
                                                values={[
                                                    "default",
                                                    "price_asc",
                                                    "price_desc",
                                                    "mileage_asc",
                                                    "mileage_desc",
                                                    "year_desc"
                                                ]}
                                                selectedValue={sortbyOpt}
                                                onChange={handleSortChange}
                                            />
                                        </div>

                                        <div className="form_boxes v3 ms-3">
                                            <small className="me-2">Per Page</small>
                                            <SelectCompFunctional
                                                options={["20", "30", "50", "80", "100"]}
                                                values={["20", "30", "50", "80", "100"]}
                                                selectedValue={perPage.toString()}
                                                onChange={(opt, val) => handlePerPageChange(val)}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Vehicles */}
                            {loading && (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {!loading && vehicles.length === 0 && (
                                <div className="py-5 text-center bg-light rounded">
                                    <h4>No vehicles found</h4>
                                </div>
                            )}

                            {!loading && vehicles.length > 0 && (
                                <div className="cars-container">
                                    {vehicles.map((elm, index) => {
                                        const chips = buildChips(elm);
                                        return (
                                            <div key={elm.id ?? index} className="service-block-thirteen cl-row-block">
                                                <div className="inner-box">
                                                    <div className="image-box cl-leftBox">
                                                        <figure className="image" style={{ height: "100%" }}>
                                                            <Link href="#">
                                                                <Image
                                                                    src={elm.img}
                                                                    alt={elm.title}
                                                                    width={260}
                                                                    height={195}
                                                                    style={{ objectFit: "fill", height: "100%" }}
                                                                    priority={index <= 2}
                                                                    onError={(e) => {
                                                                        e.target.srcset = "/images/resource/about-inner1-5.jpg";
                                                                    }}
                                                                />
                                                            </Link>
                                                        </figure>
                                                    </div>

                                                    <div className="right-box cl-rightBox">
                                                        <div className="content-box">
                                                            <h4 className="title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                <Link href="#" title={elm.title}>
                                                                    {elm.title}
                                                                </Link>
                                                            </h4>

                                                            <div className="text mb-1">VIN No. {elm.vin}</div>

                                                            <div className="inspection-sec mb-1">
                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Mileage</span>
                                                                        <small>{fmt(elm.mileage, " km")}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Fuel Type</span>
                                                                        <small>{elm.fuel}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Transmission</span>
                                                                        <small>{elm.transmission}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Year</span>
                                                                        <small>{elm.year}</small>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Dynamic Chips */}
                                                            <ul className="ul-cotent">
                                                                {chips.map((t, idx) => (
                                                                    <li key={idx}>
                                                                        <a href="#">{t}</a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="content-box-two cl-contentBoxTwo d-flex flex-column justify-content-between mb-3">
                                                            <h4 className="title">
                                                                {typeof elm.price === 'number' ? `₩${fmt(elm.price)}` : elm.price}
                                                            </h4>

                                                            <Link href="#" className="button">
                                                                View Details
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                    <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#405FF2" />
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalRecords > 0 && totalPages > 1 && (
                                <div className="pagination-sec mt-4">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                    <div className="text mt-3">
                                        Showing {from} to {to} of {totalRecords} vehicles
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
