import React, { useState, useEffect } from 'react';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';

function UserManageForm({ user, onClose, onSave }) {
  const isEdit = !!user; 

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    nic: '',
    customer_id: '',
    email: '',
    address: '',
    telephone_no: '',
    username: '',
    role: 'customer',
    image: '',
  });

  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        id: user.id,
        name: user.name || '',
        nic: user.nic || '',
        customer_id: user.customer_id || '',
        email: user.email || '',
        address: user.address || '',
        telephone_no: user.telephone_no || '',
        username: user.username || '',
        role: user.role || 'customer',
        image: user.image || '',
      });
      setPreviewImage(user.image || '');
    } else {
      setFormData({
        id: '',
        name: '',
        nic: '',
        customer_id: '',
        email: '',
        address: '',
        telephone_no: '',
        username: '',
        role: 'customer',
        image: '',
      });
      setPreviewImage('');
    }
  }, [user, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { ...formData, image: previewImage };
    onSave(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 relative animate-fadeIn">
 
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? `Edit User: ${user?.name}` : 'Add New User'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
            aria-label="Close form"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <div className="relative w-28 h-28 border-2 border-dashed border-gray-300 rounded-full flex justify-center items-center overflow-hidden bg-gray-50 hover:border-indigo-500 transition cursor-pointer shadow-sm">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <FaCloudUploadAlt className="text-2xl mx-auto mb-1" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Customer/Employee ID</label>
              <input
                type="text"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                className={`w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 ${isEdit ? 'bg-gray-100' : 'bg-white'} outline-none`}
                disabled={isEdit} 
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="customer">Customer</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Telephone No</label>
              <input
                type="tel"
                name="telephone_no"
                value={formData.telephone_no}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md hover:shadow-lg"
            >
              {isEdit ? 'Save Changes' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserManageForm;
