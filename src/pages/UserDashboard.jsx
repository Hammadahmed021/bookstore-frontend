import React, { useState } from 'react';
import { useVerifyUserQuery, useSetNewPasswordMutation } from '../store/features/users/usersApi';
import { useSelector } from 'react-redux';
import { showSuccessToast, showErrorToast } from '../utils/toast';


const UserDashboard = () => {
  const { data: user, error, isLoading } = useVerifyUserQuery();
  const [setNewPassword] = useSetNewPasswordMutation();
  const checkUser = useSelector((state) => state.auth.user);

  const [newPassword, setNewPasswordState] = useState('');
  const [confirmPassword, setConfirmPasswordState] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      showErrorToast('Both password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showErrorToast('Passwords do not match.');
      return;
    }

    try {
      const idToken = checkUser?.token; // Ensure idToken is available from verify API
      const response = await setNewPassword({ idToken, newPassword }).unwrap();

      showSuccessToast(response.message || 'Password updated successfully!');
      setNewPasswordState('');
      setConfirmPasswordState('');
    } catch (error) {
      showErrorToast(error?.data?.message || 'Failed to update password.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">User Dashboard</h1>
      <div className="mb-6 p-4 bg-blue-50 rounded">
        <p>
          <strong>Name:</strong> {user?.user?.name || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong> {user?.user?.email || 'N/A'}
        </p>
      </div>

      <form onSubmit={handlePasswordChange} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPasswordState(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPasswordState(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 transition-all"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UserDashboard;
