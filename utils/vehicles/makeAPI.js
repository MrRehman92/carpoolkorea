import { api } from "../api";

export const getMakers = async () => {
  const res = await api.get(`cars/makers`);
  // your response: { success:true, data:[{id,name}] }
  return res.data?.data || [];
};
