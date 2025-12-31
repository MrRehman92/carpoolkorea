import { api } from "../api";

/**
 * Generic vehicle list fetcher
 * @param {"cars" | "suvs" | "buses" | "trucks"} type
 * @param {number} page
 * @param {number} perPage
 * @param {object} filters (optional)
 */

const cleanParams = (obj = {}) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

export const getVehicles = async (type, page = 1, perPage = 50, filters = {}) => {
  if (!type) throw new Error("Vehicle type is required");

  const res = await api.get(`/${type}`, {
    params: cleanParams({
      page,
      per_page: perPage,
      ...filters, // future: make, fuel, price, etc.
    }),
  });

  return res.data;
};
