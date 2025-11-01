import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

export const getCars = async () => {
  const response = await api.get("/cars");
  return response.data;
}

export const addReview = async (reviewData) => {
  try {
    const response = await api.post("/reviews", reviewData)
    return response.data
  } catch (error) {
    console.log(error)    
  }
}

export const uploadImage = async (formData) => {
  try {
    const response = await api.post(`/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default api;