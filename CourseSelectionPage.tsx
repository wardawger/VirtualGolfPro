import { useNavigate, useLocation } from 'react-router-dom';
import { ProGolfer } from '../types';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import { courses } from '../data/courses';

export default function CourseSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPro = location.state?.selectedPro as ProGolfer;
  const selectedYear = location.state?.selectedYear as number;

  if (!selectedPro || !selectedYear) {
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
            <h1 className="text-2xl font-bold text-gray-900">Select Course</h1>
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
            Playing as {selectedPro.name} in {selectedYear}
          </h2>
        </div>

        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate('/game', { 
                state: { selectedPro, selectedYear, selectedCourse: course } 
              })}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex">
                <img
                  src={course.imageUrl}
                  alt={course.name}
                  className="w-32 h-24 object-cover rounded"
                />
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                  <p className="text-gray-600">{course.location}</p>
                  <div className="mt-2 flex space-x-4">
                    <span className="text-sm text-gray-600">Par {course.par}</span>
                    <span className="text-sm text-gray-600">{course.length} yards</span>
                    <span className="text-sm text-gray-600">{course.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}