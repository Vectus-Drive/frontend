import { useState, useEffect } from "react";
import { FaEdit, FaUserTie, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import UserManageForm from "../../components/admin/UserManageForm";
import AddEmployee from "../../components/admin/AddEmployee";
import api from "../../api/api";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [addEmployee, setAddEmployees] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    u_id: null,
  });

  const getEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees!");
    }
  };

  useEffect(() => {
    getEmployees();
  }, [employeeToEdit]);

  const handleAddEmployee = () => {
    setAddEmployees(true);
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const handleUpdateEmployee = (emp) => {
    setEmployeeToEdit(emp);
    setAddEmployees(false);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (u_id) => {
    setConfirmDelete({ open: true, u_id });
  };

  const confirmDeleteEmployee = async () => {
    try {
      await api.delete(`/auth/delete/${confirmDelete.u_id}`);
      setEmployees(employees.filter((e) => e.user.u_id !== confirmDelete.u_id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee!");
    } finally {
      setConfirmDelete({ open: false, u_id: null });
    }
  };

  const handleSaveEmployee = async (updatedEmp) => {
    console.log(updatedEmp);
    try {
      await api.put(`/employees/${updatedEmp.user.u_id}`, updatedEmp);
      const updatedList = employees.map((e) =>
        e.user.u_id === updatedEmp.user.u_id ? updatedEmp : e
      );
      setEmployees(updatedList);
      setIsModalOpen(false);
      setEmployeeToEdit(null);
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee!");
    }
  };

  console.log(employees);
  

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
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

      <div className="border-b pb-4 border-gray-200 mb-10">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Employee Management
            </h1>
            <p className="text-gray-600">
              Manage all employees and their details within the system.
            </p>
          </div>
          <button
            onClick={handleAddEmployee}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-200"
          >
            Add Employee
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  NIC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Telephone No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Username
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => ( 
                <tr key={emp.user.u_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {emp.image ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={emp.image}
                        alt={emp.name}
                      />
                    ) : (
                      <FaUserTie className="h-10 w-10 text-gray-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{emp.nic}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {emp.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                    {emp.address}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {emp.telephone_no}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {emp.user.username}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button
                      onClick={() => handleUpdateEmployee(emp)}
                      className="text-indigo-600 hover:text-indigo-900 mr-1"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(emp.user.u_id)}
                      className="text-red-600 hover:text-red-900"
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

      {isModalOpen && employeeToEdit && (
        <UserManageForm
          user={employeeToEdit}
          role={employeeToEdit?.user.role || "employee"}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEmployee}
        />
      )}

      {isModalOpen && addEmployee && (
        <AddEmployee
          onClose={() => {
            setIsModalOpen(false);
            setAddEmployees(false);
          }}
          onSave={(newEmp) => {
            console.log(newEmp);
            
            setEmployees([...employees, newEmp]);
            setIsModalOpen(false);
            setAddEmployees(false);
          }}
        />
      )}

      {confirmDelete.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this employee? This action cannot
              be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setConfirmDelete({ open: false, u_id: null })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteEmployee}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
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

export default EmployeeManagement;
