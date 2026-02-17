// YoloCalc - Shared Data and Utilities

const EXPERIENCE_TEMPLATES = [
  // Adventure
  { id: 'everest', name: 'Everest Base Camp Trek', category: 'adventure', icon: '🏔️', cost: 8000, doorType: 'oneway', optimalAgeMin: 25, optimalAgeMax: 50 },
  { id: 'scuba', name: 'Scuba Certification + Trip', category: 'adventure', icon: '🤿', cost: 4000, doorType: 'oneway', optimalAgeMin: 25, optimalAgeMax: 55 },
  { id: 'safari', name: 'African Safari', category: 'adventure', icon: '🦁', cost: 12000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },
  { id: 'patagonia', name: 'Patagonia Trek', category: 'adventure', icon: '🥾', cost: 6000, doorType: 'oneway', optimalAgeMin: 25, optimalAgeMax: 55 },
  { id: 'newzealand', name: 'New Zealand Adventure', category: 'adventure', icon: '🏞️', cost: 10000, doorType: 'oneway', optimalAgeMin: 25, optimalAgeMax: 60 },

  // Family
  { id: 'disney', name: 'Disney World', category: 'family', icon: '🏰', cost: 6000, doorType: 'oneway', kidAgeMin: 4, kidAgeMax: 10, requiresKids: true },
  { id: 'europe-family', name: 'Europe Family Trip', category: 'family', icon: '🗼', cost: 15000, doorType: 'oneway', kidAgeMin: 8, kidAgeMax: 14, requiresKids: true },
  { id: 'national-parks', name: 'National Parks Road Trip', category: 'family', icon: '🏕️', cost: 5000, doorType: 'oneway', kidAgeMin: 6, kidAgeMax: 14, requiresKids: true },
  { id: 'heritage', name: 'Heritage/Ancestry Trip', category: 'family', icon: '🌍', cost: 10000, doorType: 'oneway', kidAgeMin: 10, kidAgeMax: 18, requiresKids: true },
  { id: 'ski-trip', name: 'Family Ski Trip', category: 'family', icon: '⛷️', cost: 5000, doorType: 'oneway', kidAgeMin: 6, kidAgeMax: 16, requiresKids: true },

  // Multi-generational
  { id: 'multigen', name: '3-Generation Trip', category: 'multigen', icon: '👨‍👩‍👧‍👦', cost: 20000, doorType: 'oneway', optimalAgeMin: 35, optimalAgeMax: 55 },
  { id: 'reunion-cruise', name: 'Family Reunion Cruise', category: 'multigen', icon: '🚢', cost: 15000, doorType: 'oneway', optimalAgeMin: 40, optimalAgeMax: 60 },

  // Culture
  { id: 'japan', name: 'Japan Deep Dive', category: 'culture', icon: '🗾', cost: 8000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },
  { id: 'italy', name: 'Italy Food & Wine Tour', category: 'culture', icon: '🍝', cost: 7000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },
  { id: 'peru', name: 'Peru & Machu Picchu', category: 'culture', icon: '🏛️', cost: 6000, doorType: 'oneway', optimalAgeMin: 25, optimalAgeMax: 65 },
  { id: 'greece', name: 'Greek Islands', category: 'culture', icon: '🏛️', cost: 6000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },

  // Relaxation
  { id: 'cruise', name: 'Caribbean Cruise', category: 'relaxation', icon: '🚢', cost: 5000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },
  { id: 'beach-resort', name: 'Beach Resort Week', category: 'relaxation', icon: '🏖️', cost: 4000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },
  { id: 'spa-retreat', name: 'Wellness Spa Retreat', category: 'relaxation', icon: '🧘', cost: 3000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },

  // Milestone
  { id: 'retirement-trip', name: 'Retirement Celebration Trip', category: 'milestone', icon: '🎉', cost: 10000, doorType: 'twoway', atRetirement: true },
  { id: 'anniversary', name: 'Anniversary Trip (Decade)', category: 'milestone', icon: '💑', cost: 6000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },
  { id: 'bucket-list', name: 'Ultimate Bucket List Trip', category: 'milestone', icon: '✨', cost: 15000, doorType: 'twoway', optimalAgeMin: 0, optimalAgeMax: 100 },
];

const CATEGORIES = {
  adventure: { name: 'Adventure', icon: '🏔️' },
  family: { name: 'Family', icon: '👨‍👩‍👧' },
  multigen: { name: 'Multi-Generational', icon: '👨‍👩‍👧‍👦' },
  culture: { name: 'Culture & Travel', icon: '🌍' },
  relaxation: { name: 'Relaxation', icon: '🏖️' },
  milestone: { name: 'Milestones', icon: '🎉' },
};

const DEFAULTS = {
  age: 35,
  retirementAge: 65,
  currentSavings: 100000,
  monthlyContribution: 1000,
  annualReturn: 7,
  lifeExpectancy: 85,
};

// Storage keys
const STORAGE_KEYS = {
  financials: 'yolocalc_financials',
  children: 'yolocalc_children',
  experiences: 'yolocalc_experiences',
};

// Save data to localStorage
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

// Load data from localStorage
function loadData(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.warn('Could not load from localStorage:', e);
    return defaultValue;
  }
}

// Format currency
function formatCurrency(amount) {
  if (amount >= 1000000) {
    return '$' + (amount / 1000000).toFixed(1) + 'M';
  } else if (amount >= 1000) {
    return '$' + (amount / 1000).toFixed(0) + 'K';
  }
  return '$' + amount.toLocaleString();
}

// Format currency full
function formatCurrencyFull(amount) {
  return '$' + Math.round(amount).toLocaleString();
}

// Calculate future value
function calculateFutureValue(presentValue, monthlyContribution, annualReturn, years) {
  const monthlyReturn = annualReturn / 100 / 12;
  const months = years * 12;

  // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
  const compoundFactor = Math.pow(1 + monthlyReturn, months);
  const fvPrincipal = presentValue * compoundFactor;
  const fvContributions = monthlyContribution * ((compoundFactor - 1) / monthlyReturn);

  return fvPrincipal + fvContributions;
}

// Calculate portfolio trajectory
function calculateTrajectory(financials, experiences, startAge, endAge) {
  const trajectory = [];
  let currentValue = financials.currentSavings;
  const monthlyReturn = financials.annualReturn / 100 / 12;

  // Sort experiences by scheduled year
  const sortedExperiences = [...experiences].sort((a, b) => a.scheduledAge - b.scheduledAge);

  for (let age = startAge; age <= endAge; age++) {
    // Find experiences at this age
    const experiencesThisYear = sortedExperiences.filter(exp => Math.floor(exp.scheduledAge) === age);
    const expensesThisYear = experiencesThisYear.reduce((sum, exp) => sum + exp.cost, 0);

    // Determine contribution (full until retirement, then withdrawal)
    let yearEndValue;
    if (age < financials.retirementAge) {
      // Accumulation phase
      for (let month = 0; month < 12; month++) {
        currentValue = currentValue * (1 + monthlyReturn) + financials.monthlyContribution;
      }
      currentValue -= expensesThisYear;
    } else {
      // Retirement phase - assume 4% withdrawal rule
      const annualWithdrawal = currentValue * 0.04;
      currentValue = currentValue * (1 + financials.annualReturn / 100) - annualWithdrawal - expensesThisYear;
    }

    trajectory.push({
      age,
      value: Math.max(0, currentValue),
      experiences: experiencesThisYear,
    });
  }

  return trajectory;
}

// Get optimal age for an experience
function getOptimalAge(experience, financials, children) {
  // If it requires kids, base it on oldest applicable child
  if (experience.requiresKids && children.length > 0) {
    const yearsUntilKidInRange = children.map(child => {
      const yearsUntilMin = Math.max(0, experience.kidAgeMin - child.age);
      return yearsUntilMin;
    });
    const soonestYear = Math.min(...yearsUntilKidInRange);
    return financials.age + soonestYear;
  }

  // If it's at retirement
  if (experience.atRetirement) {
    return financials.retirementAge;
  }

  // Otherwise use optimal age range
  const optimalStart = experience.optimalAgeMin || 0;
  const optimalEnd = experience.optimalAgeMax || 100;

  // Schedule at current age if within range, otherwise at start of range
  if (financials.age >= optimalStart && financials.age <= optimalEnd) {
    return financials.age + 1; // Next year
  } else if (financials.age < optimalStart) {
    return optimalStart;
  } else {
    return financials.age + 1; // Already past optimal, schedule ASAP
  }
}

// Check if experience window is closing
function getWindowStatus(experience, financials, children) {
  const currentAge = financials.age;

  if (experience.requiresKids && children.length > 0) {
    // Check each child's window
    const windowsRemaining = children.map(child => {
      const yearsRemaining = experience.kidAgeMax - child.age;
      return { child: child.name, yearsRemaining };
    });
    const shortestWindow = windowsRemaining.reduce((min, w) => w.yearsRemaining < min.yearsRemaining ? w : min, { yearsRemaining: Infinity });

    if (shortestWindow.yearsRemaining <= 0) {
      return { status: 'closed', message: `Window closed for ${shortestWindow.child}` };
    } else if (shortestWindow.yearsRemaining <= 3) {
      return { status: 'closing', message: `${shortestWindow.yearsRemaining} years left for ${shortestWindow.child}` };
    }
    return { status: 'open', message: `Window open` };
  }

  if (experience.doorType === 'oneway') {
    const yearsRemaining = (experience.optimalAgeMax || 100) - currentAge;
    if (yearsRemaining <= 0) {
      return { status: 'closed', message: 'Optimal window passed' };
    } else if (yearsRemaining <= 5) {
      return { status: 'closing', message: `${yearsRemaining} years remaining` };
    }
    return { status: 'open', message: 'Window open' };
  }

  return { status: 'flexible', message: 'Anytime' };
}

// Export for use in other files
window.YoloCalc = {
  EXPERIENCE_TEMPLATES,
  CATEGORIES,
  DEFAULTS,
  STORAGE_KEYS,
  saveData,
  loadData,
  formatCurrency,
  formatCurrencyFull,
  calculateFutureValue,
  calculateTrajectory,
  getOptimalAge,
  getWindowStatus,
};
