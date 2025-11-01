import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import api from "../../api/api";

function Services() {
  const [services, setServices] = useState([]);
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  const [formData, setFormData] = useState({
    license_no: "",
    details: "",
    transaction_amount: "",
  });

  const getServices = async () => {
    try {
      const response = await api.get("/services");
      const serviceData = response.data.data || [];

      const servicesWithLicense = await Promise.all(
        serviceData.map(async (service) => {
          try {
            const carResponse = await api.get(`/cars/${service.car_id}`);
            const license_no = carResponse.data.data?.license_no || "N/A";
            return { ...service, license_no };
          } catch {
            return { ...service, license_no: "N/A" };
          }
        })
      );

      setServices(servicesWithLicense);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services");
    }
  };

  const getCars = async () => {
    try {
      const response = await api.get("/cars");
      if (response.data.data) setCars(response.data.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to fetch cars");
    }
  };

  useEffect(() => {
    getCars();
    getServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const selectedCar = cars.find((c) => c.license_no === formData.license_no);
    if (!selectedCar) {
      toast.error("Please select a valid car license number");
      return;
    }

    const payload = {
      car_id: selectedCar.car_id,
      details: formData.details,
      transaction_amount: parseFloat(formData.transaction_amount),
    };

    try {
      if (editingService) {
        await api.put(`/services/${editingService.service_id}`, payload);
        setServices((prev) =>
          prev.map((s) =>
            s.service_id === editingService.service_id
              ? { ...s, ...payload, license_no: selectedCar.license_no }
              : s
          )
        );
        toast.success("Service updated successfully!");
      } else {
        const response = await api.post("/services", payload);
        const newServ = response.data.data || {
          ...payload,
          service_id: `SERV_${Date.now()}`,
          service_date: new Date().toUTCString(),
        };
        setServices((prev) => [
          ...prev,
          { ...newServ, license_no: selectedCar.license_no },
        ]);
        toast.success("Service added successfully!");
      }

      setFormData({ license_no: "", details: "", transaction_amount: "" });
      setShowModal(false);
      setEditingService(null);
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteServiceId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/services/${deleteServiceId}`);
      setServices((prev) =>
        prev.filter((s) => s.service_id !== deleteServiceId)
      );
      toast.success("Service deleted successfully!");
      setDeleteServiceId(null);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
      setDeleteServiceId(null);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      license_no: service.license_no,
      details: service.details,
      transaction_amount: service.transaction_amount,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({ license_no: "", details: "", transaction_amount: "" });
  };

  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "relative flex p-5 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-[#0f172a] text-white"
        }
      />
      <div className="px-8 py-6 border-b border-gray-200 mb-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Service Management
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage all vehicle service records.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-5 py-2.5 rounded hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add New
          </button>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-gray-300 border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  License No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Service Details
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Service Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Amount (Rs)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.service_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {service.license_no}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {service.details}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {service.service_date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    Rs {service.transaction_amount?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(service.service_id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
            <h2 className="text-2xl font-bold mb-5 text-gray-900">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car License No *
                </label>
                <select
                  name="license_no"
                  value={formData.license_no}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Car</option>
                  {cars.map((car) => (
                    <option key={car.car_id} value={car.license_no}>
                      {car.license_no}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Details *
                </label>
                <textarea
                  name="details"
                  placeholder="e.g., Repaired Engine"
                  value={formData.details}
                  onChange={handleChange}
                  rows="3"
                  className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Amount (Rs) *
                </label>
                <input
                  type="number"
                  name="transaction_amount"
                  placeholder="e.g., 20000"
                  value={formData.transaction_amount}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                {editingService ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteServiceId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this service record?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteServiceId(null)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
