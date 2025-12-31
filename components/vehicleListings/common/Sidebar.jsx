"use client";
import React, { useState } from "react";
import SelectComponent from "../../common/SelectComponent";
import SearchableDropdown from "../../common/SearchSelect";
import Image from "next/image";
import Slider from "rc-slider";
export default function Sidebar() {

  const fmtNumber = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return "0";
    return n.toLocaleString("en-US");
  };

  const [price, setPrice] = useState([5000, 35000]);
  const handlePrice = (value) => setPrice(value);
  const [mileage, setMileage] = useState([5432, 95195]);
  const handleMileage = (value) => setMileage(value);
  const [engineVolume, setEngineVolume] = useState([1980, 6000]);
  const handleEngineVolume = (value) => setEngineVolume(value);

  return (
    <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
      <div className="sidebar-handle">
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z"
            fill="#050B20"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z"
            fill="#050B20"
          />
        </svg>
        Show Filter
      </div>

      <div className="inventory-sidebar">
        <div className="inventroy-widget widget-location">
          <div className="row">


            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Make</label>
                {/* <SelectCompFunctional options={["Add Make", "Hyundai", "Kia", "BMW"]}
                            values={["", "13", "14", "17"]}
                            selectedValue={activeFilters.make}
                            onChange={(val, opt) => handleFilterUpdate('make', val, opt)}
                          /> */}
                <SearchableDropdown
                  options={["Add Make", "Hyundai", "Kia", "BMW"]}
                  placeholder="Search categories..."
                  onSelect={(val) => console.log("Category selected:", val)}
                />
              </div>

            </div>

            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Model</label>
                <SelectComponent options={["Add Model", "New York", "Los Vegas", "California"]} />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Model Detail</label>
                <SelectComponent options={["Add Model Detail", "New York", "Los Vegas", "California"]} />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form_boxes">
                <label>Min year</label>
                <SelectComponent options={["2019", "2020", "2021", "2022"]} />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form_boxes">
                <label>Max year</label>
                <SelectComponent options={["2023", "2020", "2021", "2022"]} />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="price-box">
                <h6 className="title">Mileage</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label>Min</label>
                      <div className="drop-menu">{fmtNumber(mileage[0])} km</div>
                    </div>
                  </div>
                  <div className="form-column v2 col-lg-6">
                    <div className="form_boxes">
                      <label>Max</label>
                      <div className="drop-menu">{fmtNumber(mileage[1])} km</div>
                    </div>
                  </div>
                </form>

                <div className="widget-price">
                  <Slider
                    formatLabel={() => ``}
                    range
                    max={200000}
                    min={0}
                    defaultValue={mileage}
                    onChange={(value) => handleMileage(value)}
                    id="mileage_slider"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="price-box">
                <h6 className="title">Price</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label>Min price</label>
                      <div className="drop-menu">${fmtNumber(price[0])}</div>
                    </div>
                  </div>
                  <div className="form-column v2 col-lg-6">
                    <div className="form_boxes">
                      <label>Max price</label>
                      <div className="drop-menu">${fmtNumber(price[1])}</div>
                    </div>
                  </div>
                </form>

                <div className="widget-price">
                  <Slider
                    formatLabel={() => ``}
                    range
                    max={50000}
                    min={0}
                    defaultValue={price}
                    onChange={(value) => handlePrice(value)}
                    id="slider"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="categories-box border-none-bottom">
                <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fuelType" aria-expanded="false" aria-controls="fuelType">
                  Fuel Type</h6>
                <div id="fuelType" className="cheak-box accordion-collapse collapse">
                  <label className="contain">
                    Diesel (1,456)
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Petrol (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Hybird (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Electric (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="categories-box border-none-bottom">
                <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#vehicleType" aria-expanded="false" aria-controls="vehicleType">
                  Vehicle Type</h6>
                <div id="vehicleType" className="cheak-box accordion-collapse collapse">
                  <label className="contain">
                    SUV (1,456)
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Sedan (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Hatchback (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Coupe (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Convertible (1,456)
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="categories-box border-none-bottom">
                <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#transmission" aria-expanded="false" aria-controls="transmission">
                  Transmission</h6>
                <div id="transmission" className="cheak-box accordion-collapse collapse">
                  <label className="contain">
                    Automatic (1,456)
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Manual (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    CVT (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="categories-box border-none-bottom">
                <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#driveType" aria-expanded="false" aria-controls="driveType">
                  Drive Type</h6>
                <div id="driveType" className="cheak-box accordion-collapse collapse">
                  <label className="contain">
                    Front 2WD
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    4 Wheel Drive
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="categories-box">
                <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#passenger" aria-expanded="false" aria-controls="passenger">
                  No. of Passenger</h6>
                <div id="passenger" className="cheak-box accordion-collapse collapse">
                  <label className="contain">
                    5
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    7
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    9
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="price-box">
                <h6 className="title">Engine Volume</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label>From</label>
                      <div className="drop-menu">{fmtNumber(engineVolume[0])}</div>
                    </div>
                  </div>
                  <div className="form-column v2 col-lg-6">
                    <div className="form_boxes">
                      <label>To</label>
                      <div className="drop-menu">{fmtNumber(engineVolume[1])}</div>
                    </div>
                  </div>
                </form>

                <div className="widget-price">
                  <Slider
                    formatLabel={() => ``}
                    range
                    max={10000}
                    min={0}
                    defaultValue={engineVolume}
                    onChange={(value) => handleEngineVolume(value)}
                    id="engVolSlider"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Exterior Color</label>
                <SelectComponent options={["Blue", "New York", "Los Vegas", "California"]} />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Doors</label>
                <SelectComponent options={["3", "New York", "Los Vegas", "California"]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
