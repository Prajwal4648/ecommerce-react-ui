import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addresses: [''],
    city: '',
    zip: '',
  });

  const [editField, setEditField] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/users/1')
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          fullName: `${data.name.firstname} ${data.name.lastname}`,
          email: data.email,
          phone: data.phone,
          addresses: [data.address.street],
          city: data.address.city,
          zip: data.address.zipcode,
        });

        // show Edit for first address
        setEditField({
          address0Saved: true,
        });
      });
  }, []);

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'addresses') {
      const updated = [...formData.addresses];
      updated[index] = value;
      setFormData({ ...formData, addresses: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleEdit = (field) => {
    setEditField((prev) => {
      const isAddress = field.startsWith('address');
      if (isAddress) {
        const savedKey = `${field}Saved`;
        const isEditing = prev[field];
        return {
          ...prev,
          [field]: !isEditing,
          [savedKey]: isEditing ? true : prev[savedKey],
        };
      }
      return { ...prev, [field]: !prev[field] };
    });
  };

  const addAddress = () => {
    const last = formData.addresses[formData.addresses.length - 1];
    if (last.trim() === '') return;

    const newIndex = formData.addresses.length;

    setFormData((prev) => ({
      ...prev,
      addresses: [...prev.addresses, ''],
    }));

    setEditField((prev) => ({
      ...prev,
      [`address${newIndex}`]: true,
      [`address${newIndex}Saved`]: false,
    }));
  };

  const deleteAddress = (index) => {
    const updated = [...formData.addresses];
    updated.splice(index, 1);
    setFormData({ ...formData, addresses: updated });
  };

  const handlePasswordChange = () => {
    if (passwords.new.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else if (passwords.new !== passwords.confirm) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      alert('Password updated successfully!');
      setShowPasswordForm(false);
      setPasswords({ current: '', new: '', confirm: '' });
    }
  };

  const renderField = (label, name, value) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative w-full">
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleFieldChange}
          readOnly={!editField[name]}
          className={`w-full border border-gray-300 rounded-lg px-4 py-2 pr-16 h-11 ${!editField[name] ? 'bg-gray-100' : ''}`}
        />
        <button
          type="button"
          onClick={() => toggleEdit(name)}
          className="absolute top-5.5 right-3 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 text-sm rounded hover:opacity-90 cursor-pointer"
        >
          {editField[name] ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-300 px-4 py-10">
      <div className="max-w-screen-xl w-full mx-auto bg-white rounded-xl shadow p-10 border border-gray-300">
        <h2 className="text-3xl font-bold mb-8">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Full Name', 'fullName', formData.fullName)}
          {renderField('Email', 'email', formData.email)}
          {renderField('Phone', 'phone', formData.phone)}
          {renderField('City', 'city', formData.city)}
          {renderField('ZIP Code', 'zip', formData.zip)}

          {/* Addresses */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address(es)</label>
            {formData.addresses.map((addr, idx) => {
              const fieldKey = `address${idx}`;
              const isEditing = editField[fieldKey];
              const isSaved = editField[`${fieldKey}Saved`];

              return (
                <div key={idx} className="relative w-full mb-2">
                  <input
                    type="text"
                    name="addresses"
              
                    value={addr}
                    onChange={(e) => handleFieldChange(e, idx)}
                    readOnly={!isEditing}
                    autoFocus={isEditing && idx === formData.addresses.length - 1}
                    className={`w-full pr-28 border border-gray-300 rounded-lg px-4 py-2 ${!isEditing ? 'bg-gray-100' : ''}`}
                  />
                  <div className="absolute top-5.5 right-2 transform -translate-y-1/2 flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleEdit(fieldKey)}
                          className="bg-blue-500 text-white px-2.5 py-1 text-sm rounded cursor-pointer hover:opacity-90"
                        >
                          Save
                        </button>
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => deleteAddress(idx)}
                            className="border border-red-500 text-red-600 font-bold px-2.5 py-1 text-sm rounded cursor-pointer hover:bg-red-100"
                          >
                            Delete
                          </button>
                        )}
                      </>
                    ) : (
                      isSaved && (
                        <button
                          type="button"
                          onClick={() => toggleEdit(fieldKey)}
                          className="bg-blue-500 text-white px-2.5 py-1 text-sm rounded cursor-pointer hover:opacity-90"
                        >
                          Edit
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={addAddress}
              className="text-blue-600 text-sm mt-1 cursor-pointer"
            >
              + Add Address
            </button>
          </div>

          {/* Change Password Trigger */}
          <div className="md:col-span-2 mt-6">
            <button
              onClick={() => setShowPasswordForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition cursor-pointer"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordForm && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white w-11/12 max-w-xl p-6 sm:p-8 rounded-xl shadow-lg border border-gray-300">
          <h3 className="text-2xl font-semibold mb-6 text-center">Change Password</h3>
          <div className="grid gap-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowPasswordForm(false)}
                className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100 text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700 text-sm cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
