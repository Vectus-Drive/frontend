import { useState, useEffect } from "react";
import { FaEdit, FaUserCircle, FaTrash } from "react-icons/fa";
import UserManageForm from "../../components/admin/UserManageForm";
import api from "../../api/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await api.get("/customers");
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (u_id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/auth/delete/${u_id}`);
        setUsers(users.filter((u) => u.user.u_id !== u_id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleUpdateUser = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (updatedUser) => {
    console.log(updatedUser);
    
    try {
      await api.put(`/customers/${updatedUser.user.u_id}`, updatedUser);
      const updatedList = users.map((u) =>
        u.user.u_id === updatedUser.user.u_id ? updatedUser : u
      );
      setUsers(updatedList);
      setIsModalOpen(false);
      setUserToEdit(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="border-b pb-4 border-gray-200 mb-10">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600">Track all customers and manage their details.</p>
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
                    <button onClick={() => handleUpdateUser(user)} className="text-indigo-600 hover:text-indigo-900 mr-1">
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteUser(user.user.u_id)} className="text-red-600 hover:text-red-900">
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
          user={userToEdit}
          role={userToEdit?.user.role || "customer"}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}

export default UserManagement;
