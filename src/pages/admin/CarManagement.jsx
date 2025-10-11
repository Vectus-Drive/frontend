import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import CarModel from "../../components/admin/CarModel";
import DeleteMode from "../../components/admin/DeleteMode";

import car1 from "../../assets/car_1.jpeg";

function CarManagement() {
  const [cars, setCars] = useState([
    {
      id: 1,
      image: car1,
      name: "Toyota Corolla 2022",
      fuel_type: "Petrol",
      price: 200.0,
    },
    {
      id: 2,
      image: car1,
      name: "Honda Civic 2021",
      fuel_type: "Diesel",
      price: 180.0,
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Car Management</h1>
        <button
          onClick={handleAdd}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          + Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Car No
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Fuel Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Price (Rs)
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{car.id}</td>
                <td className="px-4 py-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{car.name}</td>
                <td className="px-4 py-3">{car.fuel_type}</td>
                <td className="px-4 py-3">Rs {car.price.toFixed(2)}</td>
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
        <CarModel
          car={editCar}
          onClose={() => setShowCarForm(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteMode
          car={carToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setCars(cars.filter((c) => c.id !== carToDelete.id));
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}

export default CarManagement;