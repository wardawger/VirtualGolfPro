import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { currentUser, logout, checkUsernameAvailability, updateUsername } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkUsername = async () => {
      if (newUsername.length >= 3 && newUsername !== currentUser?.username) {
        setIsCheckingUsername(true);
        try {
          const isAvailable = await checkUsernameAvailability(newUsername);
          if (!isAvailable) {
            setUsernameError('This username is not available');
          } else {
            setUsernameError('');
          }
        } catch (err) {
          setUsernameError('Error checking username availability');
        }
        setIsCheckingUsername(false);
      }
    };

    if (newUsername) {
      timeoutId = setTimeout(checkUsername, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [newUsername, currentUser?.username, checkUsernameAvailability]);

  async function handleUsernameChange(e: React.FormEvent) {
    e.preventDefault();
    
    if (newUsername.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (usernameError) {
      setError('Please choose a different username');
      return;
    }

    try {
      setError('');
      await updateUsername(newUsername);
      setSuccess('Username updated successfully');
      setNewUsername('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update username');
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setError('');
      // In demo mode, we'll just show a success message
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password');
    }
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      setError('Failed to log out');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-full hover:bg-gray-100 inline-flex items-center"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              <span className="ml-2">Back to Dashboard</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
            <p className="mt-1 text-sm text-gray-500">Email: {currentUser?.email}</p>
            <p className="mt-1 text-sm text-gray-500">Username: {currentUser?.username}</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
              {success}
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Username</h3>
            <form onSubmit={handleUsernameChange} className="space-y-4">
              <div>
                <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">
                  New Username
                </label>
                <input
                  id="newUsername"
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    usernameError ? 'border-red-300' : 'border-gray-300'
                  }`}
                  minLength={3}
                />
                {isCheckingUsername && (
                  <p className="mt-1 text-sm text-gray-500">Checking username...</p>
                )}
                {usernameError && (
                  <p className="mt-1 text-sm text-red-600">{usernameError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Username
              </button>
            </form>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}