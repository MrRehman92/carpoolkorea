import React, { useState } from 'react';

const FilterInput = ({
    value,
    onChange,
    onBlur,
    placeholder,
    prefix = "",
    suffix = ""
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const formatNumber = (num) => {
        if (num === "" || num === undefined || num === null) return "";
        return Number(num).toLocaleString("en-US");
    };

    const getDisplayValue = () => {
        if (isFocused) {
            return value === "" || value === undefined ? "" : value;
        }
        if (value === "" || value === undefined) return "";
        return `${prefix}${formatNumber(value)}${suffix ? " " + suffix : ""}`;
    };

    const handleChange = (e) => {
        const val = e.target.value;
        const numeric = val.replace(/[^0-9]/g, '');
        onChange(numeric === "" ? "" : Number(numeric));
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(value);
        }
    };

    return (
        <input
            type="text"
            className="drop-menu"
            style={{ width: '100%', border: 'none', background: 'transparent' }}
            placeholder={placeholder}
            value={getDisplayValue()}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
        />
    );
};

export default FilterInput;
