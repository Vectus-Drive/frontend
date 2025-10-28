import { useState, useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import CarManageForm from "../../components/admin/CarManageForm";
import CarDeleteModal from "../../components/admin/CarDeleteModal";
import { CarContext } from "../../context/CarProvider";

function CarManagement() {
  const { cars, setCars } = useContext(CarContext);

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

  const handleStatusChange = (carId, newStatus) => {
    setCars((prevCars) =>
      prevCars.map((c) =>
        c.car_id === carId
          ? { ...c, availability_status: newStatus === "Available" }
          : c
      )
    );
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center border-b pb-4 border-gray-200 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Car Management</h1>
          <p className="text-gray-600">
            Manage the vehicle inventory and keep vehicle records accurate and up to date.
          </p>
        </div>
        <div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white mr-2 px-4 py-2 rounded">
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">License No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Make</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Model</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fuel</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Seats</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price/Day ($)</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.car_id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{car.license_no}</td>
                <td className="px-4 py-3">
                  <img
                    src={`../${car.image}`}
                    alt={car.make}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{car.make}</td>
                <td className="px-4 py-3">{car.model}</td>
                <td className="px-4 py-3">{car.fuel}</td>
                <td className="px-4 py-3 text-center">{car.seats}</td>
                <td className="px-4 py-3">${car.price_per_day.toFixed(2)}</td>

                <td className="px-4 py-3 text-center">
                  <select
                    value={car.availability_status ? "Available" : "Not Available"}
                    onChange={(e) => handleStatusChange(car.car_id, e.target.value)}
                    className={`px-2 py-1 rounded text-sm font-medium border 
                      ${
                        car.availability_status
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-red-100 text-red-700 border-red-300"
                      }`}
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
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
            ))}
          </tbody>
        </table>
      </div>

      {showCarForm && (
        <CarManageForm car={editCar} onClose={() => setShowCarForm(false)} />
      )}

      {showDeleteModal && (
        <CarDeleteModal
          car={carToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setCars(cars.filter((c) => c.car_id !== carToDelete.car_id));
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}

export default CarManagement;
