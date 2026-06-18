import { Aquarium, Fish, WaterReading, Reminder, Alert, StoreItem } from '../types';

export const mockAquariums: Aquarium[] = [
  {
    id: 'aq-1',
    name: 'Living Room Reef',
    volume: 55,
    volumeUnit: 'gallons',
    type: 'saltwater',
    healthScore: 92,
    createdDate: '2025-01-15',
    fishCount: 4,
    temperature: 78,
    pH: 8.2,
  },
  {
    id: 'aq-2',
    name: 'Bedside Nano Tank',
    volume: 10,
    volumeUnit: 'gallons',
    type: 'freshwater',
    healthScore: 95,
    createdDate: '2025-03-10',
    fishCount: 2,
    temperature: 76,
    pH: 6.8,
  },
  {
    id: 'aq-3',
    name: 'Community Planted Tank',
    volume: 40,
    volumeUnit: 'gallons',
    type: 'freshwater',
    healthScore: 82,
    createdDate: '2024-11-01',
    fishCount: 12,
    temperature: 75,
    pH: 7.2,
  }
];

export const mockFish: Fish[] = [
  {
    id: 'fish-1',
    aquariumId: 'aq-1',
    name: 'Nemo',
    species: 'Ocellaris Clownfish',
    age: 1.5,
    ageUnit: 'years',
    addedDate: '2025-01-20',
    status: 'healthy',
    lastFed: 'Today, 8:00 AM',
  },
  {
    id: 'fish-2',
    aquariumId: 'aq-1',
    name: 'Marlin',
    species: 'Ocellaris Clownfish',
    age: 2,
    ageUnit: 'years',
    addedDate: '2025-01-20',
    status: 'healthy',
    lastFed: 'Today, 8:00 AM',
  },
  {
    id: 'fish-3',
    aquariumId: 'aq-1',
    name: 'Dory',
    species: 'Blue Tang',
    age: 1,
    ageUnit: 'years',
    addedDate: '2025-02-05',
    status: 'monitoring',
    lastFed: 'Today, 8:00 AM',
  },
  {
    id: 'fish-4',
    aquariumId: 'aq-1',
    name: 'Bubbles',
    species: 'Yellow Tang',
    age: 8,
    ageUnit: 'months',
    addedDate: '2025-03-01',
    status: 'healthy',
    lastFed: 'Today, 8:00 AM',
  },
  {
    id: 'fish-5',
    aquariumId: 'aq-2',
    name: 'Finley',
    species: 'Betta Fish (Halfmoon)',
    age: 6,
    ageUnit: 'months',
    addedDate: '2025-03-12',
    status: 'healthy',
    lastFed: 'Today, 9:15 AM',
  },
  {
    id: 'fish-6',
    aquariumId: 'aq-2',
    name: 'Gary',
    species: 'Mystery Snail',
    age: 3,
    ageUnit: 'months',
    addedDate: '2025-03-15',
    status: 'healthy',
    lastFed: 'Yesterday, 9:15 AM',
  },
  {
    id: 'fish-7',
    aquariumId: 'aq-3',
    name: 'Neon 1',
    species: 'Neon Tetra',
    age: 10,
    ageUnit: 'months',
    addedDate: '2024-11-10',
    status: 'healthy',
    lastFed: 'Today, 7:30 AM',
  },
  {
    id: 'fish-8',
    aquariumId: 'aq-3',
    name: 'Neon 2',
    species: 'Neon Tetra',
    age: 10,
    ageUnit: 'months',
    addedDate: '2024-11-10',
    status: 'healthy',
    lastFed: 'Today, 7:30 AM',
  },
  {
    id: 'fish-9',
    aquariumId: 'aq-3',
    name: 'Spike',
    species: 'Bristlenose Pleco',
    age: 1.2,
    ageUnit: 'years',
    addedDate: '2024-11-15',
    status: 'sick',
    lastFed: 'Today, 7:30 AM',
  }
];

export const mockWaterReadings: WaterReading[] = [
  {
    id: 'wr-1',
    aquariumId: 'aq-1',
    timestamp: '2026-06-18T08:00:00Z',
    pH: 8.2,
    temperature: 78,
    tempUnit: 'F',
    ammonia: 0,
    nitrite: 0,
    nitrate: 5,
    salinity: 35,
    alkalinity: 9.0,
    notes: 'Weekly baseline check. Corals looking full.',
  },
  {
    id: 'wr-2',
    aquariumId: 'aq-2',
    timestamp: '2026-06-17T09:00:00Z',
    pH: 6.8,
    temperature: 76,
    tempUnit: 'F',
    ammonia: 0,
    nitrite: 0,
    nitrate: 10,
    notes: 'Post-water change check. Betta highly active.',
  },
  {
    id: 'wr-3',
    aquariumId: 'aq-3',
    timestamp: '2026-06-16T18:00:00Z',
    pH: 7.2,
    temperature: 75,
    tempUnit: 'F',
    ammonia: 0.25,
    nitrite: 0.1,
    nitrate: 25,
    notes: 'Ammonia spiking slightly. Scheduled urgent 20% water change.',
  }
];

export const mockWaterTrendData = [
  { date: '06-12', pH: 7.2, temperature: 75, ammonia: 0.0, nitrite: 0.0, nitrate: 15 },
  { date: '06-13', pH: 7.1, temperature: 75, ammonia: 0.0, nitrite: 0.0, nitrate: 18 },
  { date: '06-14', pH: 7.2, temperature: 76, ammonia: 0.1, nitrite: 0.0, nitrate: 20 },
  { date: '06-15', pH: 7.3, temperature: 75, ammonia: 0.2, nitrite: 0.05, nitrate: 22 },
  { date: '06-16', pH: 7.2, temperature: 75, ammonia: 0.25, nitrite: 0.1, nitrate: 25 },
  { date: '06-17', pH: 7.1, temperature: 76, ammonia: 0.15, nitrite: 0.05, nitrate: 20 },
  { date: '06-18', pH: 7.2, temperature: 75, ammonia: 0.05, nitrite: 0.0, nitrate: 15 }
];

export const mockReminders: Reminder[] = [
  {
    id: 'rem-1',
    aquariumId: 'aq-1',
    title: 'Saltwater Fish Feed',
    type: 'feeding',
    status: 'pending',
    dueDate: '2026-06-18T18:00:00Z',
    frequency: 'daily',
    notes: 'Feed Mysis shrimp, add drops of CoralVite.',
  },
  {
    id: 'rem-2',
    aquariumId: 'aq-2',
    title: 'Weekly 15% Water Change',
    type: 'cleaning',
    status: 'pending',
    dueDate: '2026-06-19T10:00:00Z',
    frequency: 'weekly',
    notes: 'Use dechlorinated RO water.',
  },
  {
    id: 'rem-3',
    aquariumId: 'aq-3',
    title: 'Water Chemistry Testing',
    type: 'testing',
    status: 'completed',
    dueDate: '2026-06-16T17:00:00Z',
    frequency: 'weekly',
    notes: 'Check Ammonia & Nitrates closely due to Pleco feeding frequency.',
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alt-1',
    type: 'danger',
    title: 'Ammonia Spike Detected',
    message: 'Community Planted Tank has Ammonia reading of 0.25 ppm. Ammonia is toxic to fish. Perform immediate water change.',
    date: '2026-06-18T09:12:00Z',
    read: false,
  },
  {
    id: 'alt-2',
    type: 'warning',
    title: 'High Temperature Warn',
    message: 'Living Room Reef reached 79.2°F. Close monitoring suggested if it exceeds 80°F.',
    date: '2026-06-18T08:30:00Z',
    read: false,
  },
  {
    id: 'alt-3',
    type: 'info',
    title: 'Filter Replacement Due',
    message: 'Nano Tank filter cartridge replacement schedule is due in 2 days.',
    date: '2026-06-17T14:00:00Z',
    read: true,
  }
];

export const mockStoreItems: StoreItem[] = [
  {
    id: 'st-1',
    name: 'Fancy Guppies (Assorted)',
    category: 'animals',
    stockStatus: 'in-stock',
    quantity: 45,
    price: 3.99,
    sku: 'ANI-GUP-001',
    supplier: 'Aquatic Wonders Breeder',
  },
  {
    id: 'st-2',
    name: 'Rose Bubble Tip Anemone',
    category: 'animals',
    stockStatus: 'low-stock',
    quantity: 3,
    price: 69.99,
    sku: 'ANI-RBA-022',
    supplier: 'Marine Reef Imports',
  },
  {
    id: 'st-3',
    name: 'Aqueon QuietFlow Filter 30',
    category: 'products',
    stockStatus: 'in-stock',
    quantity: 12,
    price: 29.99,
    sku: 'PRO-FLT-030',
    supplier: 'Aqueon Corp Dist.',
  },
  {
    id: 'st-4',
    name: 'Prime Water Conditioner 500ml',
    category: 'products',
    stockStatus: 'out-of-stock',
    quantity: 0,
    price: 18.99,
    sku: 'PRO-PRM-500',
    supplier: 'Seachem Laboratories',
  },
  {
    id: 'st-5',
    name: 'Synthetic Salt Mix (Bucket)',
    category: 'inventory',
    stockStatus: 'in-stock',
    quantity: 8,
    price: 54.99,
    sku: 'INV-SLT-200',
    supplier: 'Instant Ocean Dist.',
  }
];

export const mockBeginnerGuides = [
  {
    id: 'bg-1',
    title: 'Step 1: The Nitrogen Cycle Explained',
    difficulty: 'Introductory',
    readTime: '5 mins',
    summary: 'The most important process in aquarium keeping: establishing helpful bacteria to turn poisonous fish waste (ammonia) into safer chemical components.',
    steps: [
      'Set up the tank hardware: filter, heater, substrate, and treated water.',
      'Add a source of ammonia (e.g., small pinches of fish food or pure laboratory ammonia).',
      'Establish nitrifying bacteria over 2-4 weeks. Monitor parameters with test kits.',
      'Wait for ammonia and nitrite levels to hit exactly 0 ppm, indicating nitrates are being produced.'
    ],
    tips: 'Never add fish during the initial cycling process. It can harm or kill them!'
  },
  {
    id: 'bg-2',
    title: 'Step 2: Choosing Your First Aquarium Inhabitants',
    difficulty: 'Introductory',
    readTime: '8 mins',
    summary: 'Match fish requirements with tank properties. Beginners should prioritize hardy fish like Tetras, Guppies, or snails.',
    steps: [
      'Decide on freshwater vs saltwater (freshwater is highly recommended for beginners).',
      'Evaluate your water source properties (hardness and natural pH range).',
      'Check adult sizes to avoid overcrowding: the classic rule is 1 inch of fish per gallon (only a loose estimate!).'
    ],
    tips: 'Avoid goldfish or plecos for small desks. They produce a lot of waste and grow extremely large!'
  }
];

export const mockPredefinedQuestions = [
  'How do I cycle my new 10-gallon freshwater tank?',
  'Why is my aquarium water cloudy, and what should I do?',
  'How often should I feed my Betta fish?',
  'What parameters should I test for a saltwater reef setup?'
];

// Helper to calculate status messages in beginner mode
export const getParameterFeedback = (param: string, value: number): { text: string; status: 'good' | 'warning' | 'danger' } => {
  if (param === 'pH') {
    if (value < 6.5) {
      return {
        text: 'Your water is slightly acidic. AquaKeeper will later compare this reading with the needs of your fish.',
        status: 'warning'
      };
    } else if (value > 8.0) {
      return {
        text: 'Your water is alkaline, perfect for reef and livebearer tanks, but high for soft-water setups.',
        status: 'good'
      };
    } else {
      return {
        text: 'pH is neutral and optimal for a wide range of common community fish species.',
        status: 'good'
      };
    }
  }

  if (param === 'ammonia') {
    if (value > 0) {
      return {
        text: `Ammonia is ${value} ppm! Toxic levels detected. Perform water change immediately.`,
        status: 'danger'
      };
    }
    return {
      text: 'Ammonia is 0 ppm. Excellent! Safe level.',
      status: 'good'
    };
  }

  if (param === 'nitrite') {
    if (value > 0) {
      return {
        text: `Nitrite is ${value} ppm! Dangerous for gills. Water changes required.`,
        status: 'danger'
      };
    }
    return {
      text: 'Nitrite is 0 ppm. Safe and cycled!',
      status: 'good'
    };
  }

  if (param === 'nitrate') {
    if (value > 20) {
      return {
        text: `Nitrate is ${value} ppm. Slightly high. Schedule water changes soon.`,
        status: 'warning'
      };
    }
    return {
      text: `Nitrate is ${value} ppm. Safe range for freshwater community environments.`,
      status: 'good'
    };
  }

  return {
    text: `Value registered at ${value}. Watch limits.`,
    status: 'good'
  };
};
