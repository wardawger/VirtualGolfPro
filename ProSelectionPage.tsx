import { useNavigate } from 'react-router-dom'
import { ProGolfer } from '../types'
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline'

const proGolfers: ProGolfer[] = [
  {
    id: '1',
    name: 'Tiger Woods',
    imageUrl: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_350,q_auto,w_280/headshots_08793.png',
    activeYears: [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    stats: {
      fairwayAccuracy: 85,
      greenAccuracy: 90,
      averagePutts: 1.7
    }
  },
  {
    id: '2',
    name: 'Rory McIlroy',
    imageUrl: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,f_auto,g_face:center,h_350,q_auto,w_280/headshots_28237.png',
    activeYears: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    stats: {
      fairwayAccuracy: 82,
      greenAccuracy: 88,
      averagePutts: 1.8
    }
  }
]

export default function ProSelectionPage() {
  const navigate = useNavigate()

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
            <h1 className="text-2xl font-bold text-gray-900">Select Pro Golfer</h1>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proGolfers.map((pro) => (
            <div
              key={pro.id}
              onClick={() => navigate('/select-year', { state: { selectedPro: pro } })}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-4 aspect-h-5 bg-gray-200">
                <img 
                  src={pro.imageUrl} 
                  alt={pro.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">{pro.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Active Years: {pro.activeYears[0]} - {pro.activeYears[pro.activeYears.length - 1]}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fairway Accuracy:</span>
                    <span className="text-sm font-medium text-gray-900">{pro.stats.fairwayAccuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Green Accuracy:</span>
                    <span className="text-sm font-medium text-gray-900">{pro.stats.greenAccuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Putts:</span>
                    <span className="text-sm font-medium text-gray-900">{pro.stats.averagePutts}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}