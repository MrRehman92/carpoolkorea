import { DEFAULT_BOUNDS } from "@/constants/filters";
import { api } from "../api";

export const getCarMakes = async () => {
  try {
    const res = await api.get('cars/makes');
    return res.data;
  } catch (error) {
    console.error("Failed to fetch car makes:", error);
    return { success: false, data: [] };
  }
};

export const getFilterOptions = async (filters = {}) => {
  try {
    const res = await api.get('cars/filter-options', { params: filters });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch filter options:", error);
    return { success: false, data: {} };
  }
};


/**
 * Main function to get vehicles with filters
 * @param {string} endpoint - API endpoint (cars, suvs, buses, trucks)
 * @param {number} page - Page number
 * @param {number} perPage - Items per page
 * @param {string} sortbyVal - Sort value
 * @param {object} filters - Filter object
 */
export const getVehicles = async (endpoint = "cars", page = 1, perPage = 50, sortbyVal = "default", filters = {}) => {
  try {
    // query parameters
    const params = {
      page,
      per_page: perPage,
      sort_by: sortbyVal,
      ...filters
    };

    // Clean up the params
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null || params[key] === '') {
        delete params[key];
      }

      if (Array.isArray(params[key]) && params[key].length === 0) {
        delete params[key];
      }

      // Remove default values for ranges (if match with DEFAULT_BOUNDS)
      if (key.includes('min_') || key.includes('max_')) {
        if (params[key] === DEFAULT_BOUNDS[key]) {
          delete params[key];
        }
      }
    });

    // console.log(`API Call Params [${endpoint}]:`, params);

    const res = await api.get(`/${endpoint}`, { params });
    return res.data;

  } catch (error) {
    console.error(`Failed to load ${endpoint}:`, error);

    return {
      success: false,
      message: error.message,
      data: [],
      pagination: null
    };
  }
};

export const SORT_OPTIONS = [
  { value: "default", label: "Sort by" },
  { value: "recent", label: "Recent Date" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
  { value: "mileage_low_high", label: "Mileage: Low to High" },
  { value: "mileage_high_low", label: "Mileage: High to Low" },
  { value: "year_new_old", label: "Year: New to Old" },
  { value: "year_old_new", label: "Year: Old to New" },
];
