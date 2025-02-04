import { useNavigate, useLocation } from 'react-router-dom';
import { ProGolfer } from '../types';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function YearSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPro = location.state?.selectedPro as ProGolfer;

  if (!selectedPro) {
    navigate('/select-pro');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Select Year</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <HomeIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Select a year for {selectedPro.name}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
          {selectedPro.activeYears.map((year) => (
            <button
              key={year}
              onClick={() => navigate('/select-course', { 
                state: { selectedPro, selectedYear: year } 
              })}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <span className="text-xl font-bold text-gray-900">{year}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}