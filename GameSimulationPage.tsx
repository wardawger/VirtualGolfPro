import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProGolfer, Course, Shot, SimulationState, Wind, Hazard } from '../types';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import HoleMap from '../components/HoleMap';
import { calculateDistance } from '../utils/geoUtils';

function generateWind(): Wind {
  return {
    speed: Math.floor(Math.random() * 20), // 0-20 mph
    direction: Math.floor(Math.random() * 360), // 0-360 degrees
  };
}

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
}

function checkHazards(x: number, y: number, hazards: Hazard[]): Hazard | null {
  return hazards.find(hazard => {
    const { position } = hazard;
    return (
      x >= position.x &&
      x <= position.x + position.width &&
      y >= position.y &&
      y <= position.y + position.height
    );
  }) || null;
}

function gameToGPS(
  x: number,
  y: number,
  hole: Course['holes'][0]
): { lat: number; lng: number } {
  const { tee, green } = hole.gpsCoordinates;
  const fraction = y / hole.length;
  
  // Calculate position along the line from tee to green
  const lat = tee.lat + (green.lat - tee.lat) * fraction;
  const lng = tee.lng + (green.lng - tee.lng) * fraction;
  
  // Add lateral offset based on x coordinate
  const latOffset = (x - 150) * 0.00001; // Adjust this multiplier as needed
  
  return {
    lat: lat + latOffset,
    lng
  };
}

export default function GameSimulationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPro = location.state?.selectedPro as ProGolfer;
  const selectedYear = location.state?.selectedYear as number;
  const selectedCourse = location.state?.selectedCourse as Course;
  
  const [simulation, setSimulation] = useState<SimulationState>({
    currentHole: 1,
    currentShot: 1,
    shots: [],
    score: 0,
    complete: false,
    wind: generateWind()
  });

  const [showNextButton, setShowNextButton] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!selectedPro || !selectedYear || !selectedCourse) {
      navigate('/select-pro');
    }
  }, [selectedPro, selectedYear, selectedCourse, navigate]);

  // Handle hole transition
  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  const simulateShot = () => {
    if (!selectedCourse) return;
    
    const currentHole = selectedCourse.holes[simulation.currentHole - 1];
    const remainingDistance = currentHole.length - (simulation.shots.length > 0 
      ? simulation.shots[simulation.shots.length - 1].endLocation.y 
      : 0);

    // Calculate shot distance considering wind
    const baseDistance = Math.min(
      remainingDistance,
      simulation.currentShot === 1 ? 280 : 150
    );
    const windEffect = Math.cos((simulation.wind.direction * Math.PI) / 180) * simulation.wind.speed;
    const adjustedDistance = baseDistance * (1 + windEffect / 100);

    // Calculate landing position
    const accuracy = selectedPro.stats.fairwayAccuracy / 100;
    const spreadX = (1 - accuracy) * 30; // Max lateral spread in yards
    const landingX = (Math.random() - 0.5) * spreadX;
    const landingY = Math.min(
      currentHole.length,
      (simulation.shots.length > 0 ? simulation.shots[simulation.shots.length - 1].endLocation.y : 0) + adjustedDistance
    );

    // Check for hazards
    const hitHazard = checkHazards(landingX + 150, landingY, currentHole.hazards);

    // Calculate start and end positions in both game and GPS coordinates
    const startLocation = simulation.shots.length > 0 
      ? { ...simulation.shots[simulation.shots.length - 1].endLocation }
      : { x: 150, y: 0 };
    const endLocation = { x: landingX + 150, y: landingY };

    const gpsStartLocation = gameToGPS(startLocation.x, startLocation.y, currentHole);
    const gpsEndLocation = gameToGPS(endLocation.x, endLocation.y, currentHole);

    const newShot: Shot = {
      holeNumber: simulation.currentHole,
      shotNumber: simulation.currentShot,
      distance: adjustedDistance,
      club: simulation.currentShot === 1 ? 'Driver' : 'Iron',
      startLocation,
      endLocation,
      gpsStartLocation,
      gpsEndLocation,
      result: hitHazard 
        ? `In ${hitHazard.type}!` 
        : landingY >= currentHole.length 
          ? 'In the hole!' 
          : 'On the fairway',
      inHazard: hitHazard ? { type: hitHazard.type, position: { x: landingX + 150, y: landingY } } : undefined
    };

    const newShots = [...simulation.shots, newShot];
    const isHoleComplete = landingY >= currentHole.length || simulation.currentShot >= currentHole.par;
    
    if (isHoleComplete) {
      if (simulation.currentHole >= selectedCourse.holes.length) {
        setSimulation({
          ...simulation,
          shots: newShots,
          complete: true,
          score: simulation.score + simulation.currentShot
        });
      } else {
        setTransitioning(true);
        setSimulation({
          currentHole: simulation.currentHole + 1,
          currentShot: 1,
          shots: [],
          score: simulation.score + simulation.currentShot,
          complete: false,
          wind: generateWind()
        });
      }
    } else {
      setSimulation({
        ...simulation,
        currentShot: simulation.currentShot + 1,
        shots: newShots
      });
    }
    
    setShowNextButton(true);
  };

  if (!selectedPro || !selectedYear || !selectedCourse) {
    return null;
  }

  const currentHole = selectedCourse.holes[simulation.currentHole - 1];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/select-course')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Game Simulation</h1>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedPro.name} - {selectedYear}
            </h2>
            <p className="text-gray-600">
              {selectedCourse.name} - Hole {simulation.currentHole} ({currentHole.name})
            </p>
          </div>

          {simulation.complete ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Round Complete!</h3>
              <p className="text-xl">Final Score: {simulation.score}</p>
              <button
                onClick={() => navigate('/select-pro')}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Hole Information</h3>
                  <div className="space-y-2">
                    <p>Par: {currentHole.par}</p>
                    <p>Length: {currentHole.length} yards</p>
                    <p>
                      Wind: {simulation.wind.speed} mph {getWindDirection(simulation.wind.direction)}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Current Shot</h3>
                  <p>Shot {simulation.currentShot} on Hole {simulation.currentHole}</p>
                  {simulation.shots.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold">Last Shot:</h4>
                      <p>{simulation.shots[simulation.shots.length - 1].result}</p>
                    </div>
                  )}
                </div>

                {showNextButton && !transitioning && (
                  <button
                    onClick={() => {
                      setShowNextButton(false);
                      simulateShot();
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Next Shot
                  </button>
                )}
              </div>

              <div>
                {!transitioning && (
                  <HoleMap
                    hole={currentHole}
                    shots={simulation.shots}
                    currentShot={simulation.currentShot}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}