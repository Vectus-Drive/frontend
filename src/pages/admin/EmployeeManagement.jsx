import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserTie, FaPlus } from 'react-icons/fa';
import UserManageForm from '../../components/admin/UserManageForm';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: 'emp001',
      name: 'John Doe',
      nic: '921234567V',
      employee_id: 'EMP-001',
      email: 'john.doe@company.com',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      address: '45 Market Street, Citytown',
      telephone_no: '0776543210',
      username: 'john_d',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const handleDeleteEmployee = (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== empId));
    }
  };

  const handleUpdateEmployee = (emp) => {
    setEmployeeToEdit(emp);
    setIsModalOpen(true);
  };

  const handleAddEmployee = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (updatedEmployee) => {
    if (updatedEmployee.id) {
      const updatedList = employees.map(e => e.id === updatedEmployee.id ? updatedEmployee : e);
      setEmployees(updatedList);
    } else {
      const newEmployee = {
        ...updatedEmployee,
        id: `emp${employees.length + 1}`,
        employee_id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
        image: updatedEmployee.image || '',
      };
      setEmployees([...employees, newEmployee]);
    }

    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="border-b pb-4 border-gray-200 mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
          <p className="text-gray-600">
            Manage all employees and their details within the system.
          </p>
        </div>
        <button
          onClick={handleAddEmployee}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-700 transition"
        >
          <FaPlus />
          Add New Employee
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telephone No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {emp.image ? (
                      <img className="h-10 w-10 rounded-full object-cover" src={emp.image} alt={emp.name} />
                    ) : (
                      <FaUserTie className="h-10 w-10 text-gray-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.nic}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.employee_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{emp.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.telephone_no}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.username}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button
                      onClick={() => handleUpdateEmployee(emp)}
                      className="text-indigo-600 hover:text-indigo-900 mr-1"
                      title="Edit Employee"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Employee"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <UserManageForm
          user={employeeToEdit}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  );
}

export default EmployeeManagement;
