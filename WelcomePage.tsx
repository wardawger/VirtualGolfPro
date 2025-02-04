import { useNavigate } from 'react-router-dom'

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover'
      }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Virtual Golf Pro Challenge</h1>
            <p className="mt-2 text-lg text-gray-600">Challenge pro golfers in head-to-head matches!</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <button
              onClick={() => navigate('/signin')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
            
            <button
              onClick={() => navigate('/signup')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
            
            <button
              onClick={() => navigate('/select-pro')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Play as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}