"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { authAPI } from "../../utils/api";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  {
    href: "/dashboard",
    src: "/images/icons/dash1.svg",
    width: 18,
    height: 18,
    label: "Dashboard",
  },
  {
    href: "/my-bookings",
    src: "/images/icons/dash2.svg",
    width: 22,
    height: 22,
    label: "My Bookings",
  },
  {
    href: "/add-listings",
    src: "/images/icons/dash3.svg",
    width: 22,
    height: 22,
    label: "Add Listings",
  },
  {
    href: "/favorite",
    src: "/images/icons/dash4.svg",
    width: 18,
    height: 18,
    label: "My Favorites",
  },
  {
    href: "/saved",
    src: "/images/icons/dash5.svg",
    width: 18,
    height: 18,
    label: "Saved Search",
  },
  {
    href: "/messages",
    src: "/images/icons/dash6.svg",
    width: 18,
    height: 18,
    label: "Messages",
  },
  {
    href: "/profile",
    src: "/images/icons/dash7.svg",
    width: 18,
    height: 18,
    label: "My Profile",
  },
  {
    href: "",
    src: "/images/icons/dash8.svg",
    width: 18,
    height: 18,
    label: "Logout",
    isExternal: true,
  },
];
export default function Sidebar() {
  const { user, setUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (e) => {
  if (e) e.preventDefault();
  try {
    await authAPI.logout();
    
    setUser(null);
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    document.cookie = `isAuthenticated=; Path=/; Max-Age=0; Domain=${domain}; Secure; SameSite=None;`;
    
    // router.replace("/login");
    window.location.href = "/login";
    
    console.log('Logged out successfully!');
  } catch (error) {
    console.error('Logout error:', error);
    router.push('/login');
  }
};
  return (
    <div className="side-bar">
      <ul className="nav-list">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.isExternal && item.label === "Logout" ? (
              <a href={item.href || '#'} onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <div style={{width: item.height+'px', marginRight: '16px'}}>
                  <Image
                  alt=""
                  src={item.src}
                  width={item.width}
                  height={item.height}
                />
                </div>
                {item.label}
              </a>
            ) : item.isExternal ? (
              <a href={item.href}>
                <div style={{width: item.height+'px', marginRight: '16px'}}>
                  <Image
                  alt=""
                  src={item.src}
                  width={item.width}
                  height={item.height}
                />
                </div>
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className={pathname == item.href ? "menuActive" : ""}
              >
                <div style={{width: item.height+'px', marginRight: '16px'}}>
                  <Image
                  alt=""
                  src={item.src}
                  width={item.width}
                  height={item.height}
                />
                </div>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}