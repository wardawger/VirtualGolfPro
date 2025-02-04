import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  UserIcon,
  PlayIcon,
  ClockIcon,
  MapIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const menuItems = [
    {
      title: 'Play Against Pro',
      description: 'Challenge a pro golfer to a match',
      icon: PlayIcon,
      path: '/select-pro',
    },
    {
      title: 'Past Rounds',
      description: 'View your match history',
      icon: ClockIcon,
      path: '/past-rounds',
    },
    {
      title: 'View Courses',
      description: 'Explore available golf courses',
      icon: MapIcon,
      path: '/courses',
    },
    {
      title: 'Profile',
      description: 'Manage your account settings',
      icon: UserIcon,
      path: '/profile',
    },
  ];

  return (
    <div 
      className="min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10">
        <header className="bg-white bg-opacity-95 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Virtual Golf Pro</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {currentUser?.username || 'Guest'}!
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {menuItems.map((item) => (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                className="bg-white bg-opacity-95 overflow-hidden shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}