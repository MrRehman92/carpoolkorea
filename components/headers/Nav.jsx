"use client";

import {
  truckLinks,
  carLinks,
  megaMenuData,
  tempPagesA,
  busesLinks,
  moreLinks,
} from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathname = usePathname();

  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem?.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem?.length) {
      active = menuItem.some(
        (elm) => elm?.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem?.length) {
      menuItem.forEach((item) => {
        item?.links?.forEach((elm2) => {
          if (elm2?.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2?.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3?.href?.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item?.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const li = e.currentTarget.closest("li.current-dropdown");
    if (li) li.classList.toggle("open");
  };

  const topLinkStyle = { display: "inline-flex", alignItems: "center", color: "#ffffff" };

  return (
    <>
      <li>
        <Link className={pathname == "/home" ? "menuActive" : ""} href={`/home`}>
          Home
        </Link>
      </li>

      {/* CARS */}
      <li className="current-dropdown current">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/cars"
            className={isMenuActive(carLinks) || pathname === "/cars" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Cars
          </Link>

          <button
            type="button"
            aria-label="Open Cars menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <ul className="dropdown">
          {carLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* SUVs (MEGA MENU) */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/suvs"
            className={isMenuActive(megaMenuData) || pathname === "/suvs" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            SUVs
          </Link>

          <button
            type="button"
            aria-label="Open SUVs menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <div className="mega-menu">
          {megaMenuData.map((column, index) => (
            <div className="mega-column" key={index}>
              <h3 className={isMenuActive(column) ? "menuActive" : ""}>{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      className={
                        !link.inactive
                          ? isMenuActive(link)
                            ? "menuActive"
                            : ""
                          : ""
                      }
                      href={link.href}
                      title=""
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </li>

      {/* TRUCKS */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/trucks"
            className={isMenuActive(truckLinks) || pathname === "/trucks" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Trucks
          </Link>

          <button
            type="button"
            aria-label="Open Trucks menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <ul className="dropdown">
          {truckLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* BUSES */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/buses"
            className={isMenuActive(busesLinks) || pathname === "/buses" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Buses
          </Link>

          <button
            type="button"
            aria-label="Open Buses menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <ul className="dropdown">
          {busesLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* OTHERS */}
      <li className="current-dropdown current">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/encar"
            className={isMenuActive(carLinks) || pathname === "/encar" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Encar
          </Link>

          <button
            type="button"
            aria-label="Open Cars menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <ul className="dropdown">
          {carLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      <li>
        {/* <Link className={pathname == "/events" ? "menuActive" : ""} href={`/events`}> */}
        <Link className={pathname == "/events" ? "menuActive" : ""} href={`/blog-list-03`}>
          Events
        </Link>
      </li>

      <li>
        {/* <Link className={pathname == "/shipping" ? "menuActive" : ""} href={`/shipping`}> */}
        <Link className={pathname == "/shipping" ? "menuActive" : ""} href={`/terms`}>
          Shipping
        </Link>
      </li>

      {/* MORE */}
      <li className="current-dropdown current">
        <span className={isMenuActive(moreLinks) ? "menuActive" : ""}>
          More <i className="fa-solid fa-angle-down" />
        </span>
        <ul className="dropdown">
          {moreLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* THEME PAGES */}
      <li className="current-dropdown right-one">
        <span className={isMenuActive(tempPagesA) ? "menuActive" : ""}>
          tempPagesA <i className="fa-solid fa-angle-down" />
        </span>
        <ul className="dropdown">
          {tempPagesA.map((page, index) => (
            <li className={page.links ? "nav-sub" : ""} key={index}>
              {page.href?.includes("/") ? (
                <Link href={page.href} className={isMenuActive(page) ? "menuActive" : ""}>
                  {page.title} {page.iconClass && <i className={page.iconClass} />}
                </Link>
              ) : (
                <a className={isMenuActive(page.links) ? "menuActive" : ""}>
                  {page.title} {page.iconClass && <i className={page.iconClass} />}
                </a>
              )}

              {page.links && (
                <ul className="dropdown deep subnav-menu">
                  {page.links.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link className={isMenuActive(subItem) ? "menuActive" : ""} href={subItem.href} title="">
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </li>
    </>
  );
}
