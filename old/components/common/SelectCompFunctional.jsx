"use client";

import { useEffect, useRef, useState } from "react";

export default function SelectComponent({
  options = ["New York", "Los Vegas", "California"],
  value, 
  onChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);
  
  const selectedOption = value || options[0];

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setIsDropdownOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div ref={ref} className={`drop-menu ${isDropdownOpen ? "active" : ""}`}>
      <div className="select" onClick={() => setIsDropdownOpen((pre) => !pre)}>
        <span>{selectedOption}</span>
        <i className="fa fa-angle-down" />
      </div>

      <ul
        className="dropdown"
        style={
          isDropdownOpen
            ? {
                display: "block",
                opacity: 1,
                visibility: "visible",
                transition: "0.4s",
              }
            : {
                display: "block",
                opacity: 0,
                visibility: "hidden",
                transition: "0.4s",
              }
        }
      >
        {options.map((option, index) => (
          <li
            onClick={() => handleOptionSelect(option)}
            key={index}
            className={`text-nowrap ${option === selectedOption ? "selected" : ""}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}