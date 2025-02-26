// data/mockData.ts

export const weekNavigation = [
  {
    label: "This Week",
    date: "1st January",
    valueGreen: 200,
    valueRed: 200,
    active: true,
  },
  {
    label: "+ 1 Week",
    date: "8th January",
    valueGreen: 20,
    valueRed: 5,
    active: false,
  },
  {
    label: "+ 2 Weeks",
    date: "15th January",
    valueGreen: 5,
    valueRed: 20,
    active: false,
  },
  {
    label: "+ 3 Weeks",
    date: "23rd January",
    valueGreen: 0,
    valueRed: 10,
    active: false,
  },
  {
    label: "+ 4 Weeks",
    date: "30th January",
    valueGreen: 0,
    valueRed: 10,
    active: false,
  },
  {
    label: "+ 5 Weeks",
    date: "7th February",
    valueGreen: 50,
    valueRed: 10,
    active: false,
  },
];

export const seasonPatterns = {
  totalRestaurants: 100,
  totalServices: 2700,
  categories: [
    { label: "Busy", percentage: 25, color: "#A6AEB7" }, // Grey
    { label: "Average", percentage: 50, color: "#A8CF45" }, // Green
    { label: "Quiet", percentage: 25, color: "#E65045" }, // Red
  ],
};

export const trackingToExpectation = {
  aboveExpectation: 20,
  belowExpectation: 120,
  improvement: 4,
  weeksData: [
    { week: "-5 Weeks", above: 0, below: 190 },
    { week: "-4 Weeks", above: 1, below: 190 },
    { week: "-3 Weeks", above: 10, below: 155 },
    { week: "-2 Weeks", above: 20, below: 120 },
    { week: "-1 Week", above: 0, below: 0 },
    { week: "Current", above: 0, below: 0 },
  ],
};

export const trackingChartData = [
  { week: "-5 Weeks", above: 0, below: 190 },
  { week: "-4 Weeks", above: 1, below: 190 },
  { week: "-3 Weeks", above: 10, below: 155 },
  { week: "-2 Weeks", above: 20, below: 120 },
  { week: "-1 Week", above: 0, below: 0 },
  { week: "Current", above: 0, below: 0 },
];
