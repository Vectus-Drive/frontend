import { useState, useEffect } from "react";
import { FaEdit, FaUserCircle, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserManageForm from "../../components/admin/UserManageForm";
import api from "../../api/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, u_id: null });

  const getUsers = async () => {
    try {
      const res = await api.get("/customers");
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteClick = (u_id) => {
    setConfirmDelete({ open: true, u_id });
  };

  const confirmDeleteUser = async () => {
    try {
      await api.delete(`/auth/delete/${confirmDelete.u_id}`);
      setUsers(users.filter((u) => u.user.u_id !== confirmDelete.u_id));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user!");
    } finally {
      setConfirmDelete({ open: false, u_id: null });
    }
  };

  const handleUpdateUser = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      await api.put(`/customers/${updatedUser.user.u_id}`, updatedUser);
      const updatedList = users.map((u) =>
        u.user.u_id === updatedUser.user.u_id ? updatedUser : u
      );
      setUsers(updatedList);
      setIsModalOpen(false);
      setUserToEdit(null);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user!");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="border-b pb-4 border-gray-200 mb-10">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600">
          Track all customers and manage their details.
        </p>
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
              {users.map((user) => (
                <tr key={user.user.u_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.image ? (
                      <img className="h-10 w-10 rounded-full object-cover" src={user.image} alt={user.name} />
                    ) : (
                      <FaUserCircle className="h-10 w-10 text-gray-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.nic}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{user.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.telephone_no}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.user.username}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button
                      onClick={() => handleUpdateUser(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-1"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.user.u_id)}
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

      {/* User Edit Modal */}
      {isModalOpen && (
        <UserManageForm
          user={userToEdit}
          role={userToEdit?.user.role || "customer"}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}

      {/* Custom Delete Confirmation Modal */}
      {confirmDelete.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setConfirmDelete({ open: false, u_id: null })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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

    </div>
  );
}

export default UserManagement;
