import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

export const getCars = async () => {
  const response = await api.get("/cars");
  return response.data;
}

export default api;