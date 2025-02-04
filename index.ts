export interface ProGolfer {
  id: string;
  name: string;
  imageUrl: string;
  activeYears: number[];
  stats: {
    fairwayAccuracy: number;
    greenAccuracy: number;
    averagePutts: number;
  };
}

export interface Course {
  id: string;
  name: string;
  location: string;
  par: number;
  length: number;
  difficulty: string;
  imageUrl: string;
  holes: Hole[];
}

export interface Hole {
  number: number;
  par: number;
  length: number;
  handicap: number;
  name: string;
  imageUrl: string;
  hazards: Hazard[];
  gpsCoordinates: {
    tee: google.maps.LatLngLiteral;
    green: google.maps.LatLngLiteral;
    fairway: google.maps.LatLngLiteral[];
  };
}

export interface Hazard {
  type: 'water' | 'bunker';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  gpsCoordinates: google.maps.LatLngLiteral;
  gpsOutline: google.maps.LatLngLiteral[];
}

export interface Wind {
  speed: number;
  direction: number;
}

export interface Shot {
  holeNumber: number;
  shotNumber: number;
  distance: number;
  club: string;
  startLocation: { x: number; y: number };
  endLocation: { x: number; y: number };
  gpsStartLocation: google.maps.LatLngLiteral;
  gpsEndLocation: google.maps.LatLngLiteral;
  result: string;
  inHazard?: {
    type: 'water' | 'bunker';
    position: { x: number; y: number };
  };
}

export interface SimulationState {
  currentHole: number;
  currentShot: number;
  shots: Shot[];
  score: number;
  complete: boolean;
  wind: Wind;
}