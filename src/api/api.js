import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const getCars = async () => {
  const response = await api.get("/cars");
  return response.data;
};

export const addReview = async (reviewData) => {
  try {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (formData, id=null) => {
  try {
    const reqUrl = id ? `/upload-image?uid=${id}` : `/upload-image`
    const response = await api.post(reqUrl, formData, {
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

export const getCustomerData = async (id) => {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer = async (userData, id) => {
  try {
    const response = await api.put(`/customers/${id}`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getNotifications = async (id) => {
  try {
    const response = await api.get(`/notifications?user_id=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookingsFromCustomerId = async (id) => {
  try {
    const response = await api.get(`/bookings?customer_id=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getCarData = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default api;
