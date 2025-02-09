import { useState } from 'react'
import { FaUserEdit, FaUser } from "react-icons/fa";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function AccountSet() {
  const [email, setEmail] = useState('user@gmail.com');
  const [name, setName] = useState('user profile');
  const [userName, setUserName] = useState('@user32');
  const [phone, setPhone] = useState('01019345623');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const InputField = ({ icon: Icon, label, type, value, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
        <Icon className="text-gray-500" /> {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white transition-colors duration-200"
      />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-6">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={FaUserEdit}
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            icon={FaUser}
            label="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputField
            icon={MdEmail}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={MdLocalPhone}
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Change Password */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-6">
          Change Password
        </h3>
        <div className="space-y-6 max-w-md">
          <InputField
            icon={RiLockPasswordFill}
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <InputField
            icon={RiLockPasswordFill}
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountSet
