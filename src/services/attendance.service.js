import api from "../api/axios";

export const markAttendance = async (payload) => {
  const { data } = await api.post("/attendance", payload);
  return data;
};

export const getAttendance = async (employeeId, startDate, endDate) => {
  let url = `/attendance/${employeeId}`;

  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }

  const { data } = await api.get(url);
  return data;
};
