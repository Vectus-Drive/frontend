import { useState, useEffect } from "react";
import { FaEdit, FaUserTie, FaTrash } from "react-icons/fa";
import UserManageForm from "../../components/admin/UserManageForm";
import api from "../../api/api";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const getEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleDeleteEmployee = async (u_id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/auth/delete/${u_id}`);
        setEmployees(employees.filter((e) => e.user.u_id !== u_id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleUpdateEmployee = (emp) => {
    setEmployeeToEdit(emp);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = async (updatedEmp) => {
    try {
      await api.put(`/employees/${updatedEmp.user.u_id}`, updatedEmp);
      const updatedList = employees.map((e) =>
        e.user.u_id === updatedEmp.user.u_id ? updatedEmp : e
      );
      setEmployees(updatedList);
      setIsModalOpen(false);
      setEmployeeToEdit(null);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="border-b pb-4 border-gray-200 mb-10">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <p className="text-gray-600">Manage all employees and their details within the system.</p>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telephone No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => (
                <tr key={emp.user.u_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {emp.image ? <img className="h-10 w-10 rounded-full object-cover" src={emp.image} alt={emp.name} /> : <FaUserTie className="h-10 w-10 text-gray-400" />}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{emp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.nic}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{emp.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.telephone_no}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.user.username}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button onClick={() => handleUpdateEmployee(emp)} className="text-indigo-600 hover:text-indigo-900 mr-1">
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteEmployee(emp.user.u_id)} className="text-red-600 hover:text-red-900">
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
          role={employeeToEdit?.user.role || "employee"}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  );
}

export default EmployeeManagement;
