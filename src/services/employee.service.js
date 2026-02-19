import api from "../api/axios";

export const getEmployees = async () => {
  const { data } = await api.get("/employees/stats");
  return data;
};

export const createEmployee = async (payload) => {
  const { data } = await api.post("/employees", payload);
  return data;
};

export const deleteEmployee = async (id) => {
  await api.delete(`/employees/${id}`);
};
