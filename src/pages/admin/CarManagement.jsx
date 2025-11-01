import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import CarManageForm from "../../components/admin/CarManageForm";
import CarDeleteModal from "../../components/admin/CarDeleteModal";
import api from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [showCarForm, setShowCarForm] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const handleAdd = () => {
    setEditCar(null);
    setShowCarForm(true);
  };

  const handleEdit = (car) => {
    setEditCar(car);
    setShowCarForm(true);
  };

  const handleDelete = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/cars/${carToDelete.car_id}`);
      setCars((prev) => prev.filter((c) => c.car_id !== carToDelete.car_id));
      setShowDeleteModal(false);
      toast.success("Car deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete car");
    }
  };

  const handleStatusChange = async (carId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await api.put(`/cars/${carId}`, { availability_status: updatedStatus });
      setCars((prevCars) =>
        prevCars.map((c) =>
          c.car_id === carId ? { ...c, availability_status: updatedStatus } : c
        )
      );
      toast.success(
        `Car marked as ${updatedStatus ? "Available" : "Not Available"}`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleDownloadReport = () => {
    if (cars.length == 0) {
      toast.error("No Cars to generate remports");
      return;
    }

    const data = cars.flatMap((car) => {
      if (!car.services || car.services.length === 0) {
        return [
          {
            "License No": car.license_no,
            Make: car.make,
            Model: car.model,
            Availability: car.availability_status
              ? "Available"
              : "Not Available",
            Condition: car.condition,
            Description: car.description,
            Doors: car.doors,
            Features: car.features.join(", "),
            Fuel: car.fuel,
            "Price/Day": car.price_per_day,
            Seats: car.seats,
            Transmission: car.transmission,
            "Service Date": "",
            "Service Details": "",
            "Service Amount": "",
          },
        ];
      }

      return car.services.map((s) => ({
        "License No": car.license_no,
        Make: car.make,
        Model: car.model,
        Availability: car.availability_status ? "Available" : "Not Available",
        Condition: car.condition,
        Description: car.description,
        Doors: car.doors,
        Features: car.features.join(", "),
        Fuel: car.fuel,
        "Price/Day": car.price_per_day,
        Seats: car.seats,
        Transmission: car.transmission,
        "Service Date": new Date(s.service_date).toLocaleDateString(),
        "Service Details": s.details,
        "Service Amount": s.transaction_amount,
      }));
    });

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cars");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `car_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get("/cars");
        setCars(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch cars");
      }
    };
    fetchCars();
  }, [handleAdd, handleDelete, handleEdit]);

  return (
    <div className="p-6 relative">
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
      <div className="flex justify-between items-center border-b pb-4 border-gray-200 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Car Management</h1>
          <p className="text-gray-600">
            Manage the vehicle inventory and keep vehicle records accurate.
          </p>
        </div>
        <div>
          <button
            onClick={handleDownloadReport}
            className="bg-orange-600 hover:bg-orange-700 text-white mr-2 px-4 py-2 rounded"
          >
            Download Report
          </button>
          <button
            onClick={handleAdd}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                License No
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Make
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Model
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fuel
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Seats
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Price/Day (Rs)
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car.car_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{car.license_no}</td>
                  <td className="px-4 py-3">
                    <img
                      src={car.image ? `${car.image}` : "/default-car.jpg"}
                      alt={car.make}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{car.make}</td>
                  <td className="px-4 py-3">{car.model}</td>
                  <td className="px-4 py-3">{car.fuel}</td>
                  <td className="px-4 py-3 text-center">{car.seats}</td>
                  <td className="px-4 py-3">
                    Rs {Number(car.price_per_day || 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        handleStatusChange(car.car_id, car.availability_status)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        car.availability_status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {car.availability_status ? "Available" : "Not Available"}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(car)}
                      className="text-red-600 hover:text-red-800 mt-2"
                    >
                      <MdDeleteForever size={22} />
                    </button>
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-blue-600 hover:text-blue-800 mt-2"
                    >
                      <FaEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-5 text-gray-500 italic"
                >
                  No cars available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCarForm && (
        <CarManageForm
          car={editCar}
          onClose={() => setShowCarForm(false)}
          onSaved={(newCar) => {
            if (editCar) {
              setCars((prev) =>
                prev.map((c) => (c.car_id === newCar.car_id ? newCar : c))
              );
            } else {
              setCars((prev) => [...prev, newCar]);
            }
          }}
        />
      )}

      {showDeleteModal && (
        <CarDeleteModal
          car={carToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default CarManagement;
