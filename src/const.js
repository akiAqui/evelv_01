// Debug mode
const DEBUG_MODE = true;
const DEBUG_POINT_INDEX = 3;
const DEBUG_START_TIME = 0;
const DEBUG_END_TIME = 20 * 0.1; // 20 * DT

// Canvas dimensions
const WIDTH = 400;
const HEIGHT = 400;

// Simulation parameters
const DT = 0.1;
const MAX_TIME = 100000;

// Spiral parameters
const A = 20.0;

// Point parameters
const N = 10000;
const RMIN = 10;
const RMAX = 20;
const LMIN = 10;
const LMAX = 90;

// Hue
const HMAX = 360;
const HMIN = 0;

// Perturbation parameters
const PRM = 0.04;
const DTHETA = 2 * Math.PI / 180; // Convert to radians

// Metropolis algorithm parameters
const H = 20.0;
const L = 10.0;

// Radius perturbation parameters
const A_RADIUS = 0.1;
const B_RADIUS = 2.0;
const B1_RADIUS = 2.0;
const B2_RADIUS = 50.0;
const C_RADIUS = 13.0;
const C1_RADIUS = 0.02;
const C2_RADIUS = 2.0;
