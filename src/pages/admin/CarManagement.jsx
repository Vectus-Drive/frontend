import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import CarManageForm from "../../components/admin/CarManageForm";
import CarDeleteModal from "../../components/admin/CarDeleteModal";

import car1 from "../../assets/car_1.jpeg";

function CarManagement() {
  const [cars, setCars] = useState([
    {
      car_id: 1,
      license_no: "ADD3455",
      name: "Toyota",
      type: "Sedan",
      image: car1,
      seats: 4,
      fuel: "Petrol",
      transmission: "Automatic",
      doors: 2,
      description:
        "A reliable and fuel-efficient sedan, perfect for city driving and long trips.",
      features: "gd,gd",
      price_per_day: 50,
      availability_status: "Available",
      condition: "Good",
      services: "Last serviced on 2025-09-12",
    },
  ]);

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

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center border-b pb-4 border-gray-200 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Car Management</h1>
          <p className="text-gray-600">
            Manage the vehicle inventory and keep vehicle records accurate and up to date.
          </p>
        </div>
        <div >
          <button
            className=" bg-orange-600 hover:bg-orange-700 text-white mr-2 px-4 py-2 rounded "
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
                Car ID
              </th>
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
                Price/Day ($)
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Availability
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.car_id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{car.car_id}</td>
                <td className="px-4 py-3">{car.license_no}</td>
                <td className="px-4 py-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{car.name}</td>
                <td className="px-4 py-3">{car.type}</td>
                <td className="px-4 py-3">{car.fuel}</td>
                <td className="px-4 py-3 text-center">{car.seats}</td>
                <td className="px-4 py-3">${car.price_per_day.toFixed(2)}</td>
                <td
                  className={`px-4 py-3 text-center font-medium ${
                    car.availability_status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {car.availability_status}
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
