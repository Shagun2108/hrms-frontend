import api from "../api/axios";

export const getSummary = async () => {
  const { data } = await api.get("/dashboard/summary");
  return data;
};
