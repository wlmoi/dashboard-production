export const modules = [
  {
    id: 'supply',
    label: 'Supply Dashboard',
    title: 'Real-time supply monitoring',
    description: 'Near miss, good catch, and incident tracking with status visibility.',
  },
  {
    id: 'quality',
    label: 'Quality Dashboard',
    title: 'Structured quality issue control',
    description: 'Capture material and product issues with owners, priority, and actions.',
  },
  {
    id: 'productivity',
    label: 'Productivity Dashboard',
    title: 'Production performance and yield analysis',
    description: 'Track output, MHP, daily trends, and yield against configurable targets.',
  },
];

export const supplyMetrics = [
  { label: 'Near Miss', value: 18, delta: '+12%', tone: 'good' },
  { label: 'Good Catch', value: 42, delta: '+8%', tone: 'blue' },
  { label: 'Incidents', value: 6, delta: '-3%', tone: 'warn' },
];

export const supplyTrend = [18, 22, 20, 26, 30, 35, 33, 38, 41, 45, 47, 52];

export const qualityIssues = [
  {
    title: 'Seal wear found at station 4',
    owner: 'A. Gomez',
    priority: 'High',
    status: 'In Progress',
    completed: false,
  },
  {
    title: 'Label mismatch on batch 2408',
    owner: 'M. Patel',
    priority: 'Medium',
    status: 'Not Started',
    completed: false,
  },
  {
    title: 'Packaging defect closed',
    owner: 'J. Chen',
    priority: 'Low',
    status: 'Completed',
    completed: true,
  },
];

export const productivityKpis = [
  { label: 'FOLG', value: 92, target: 100, accent: 'cyan' },
  { label: 'LP', value: 87, target: 100, accent: 'blue' },
  { label: 'HPC', value: 95, target: 100, accent: 'navy' },
];

export const dailyOutput = [
  { day: 'Mon', value: 88 },
  { day: 'Tue', value: 97 },
  { day: 'Wed', value: 92 },
  { day: 'Thu', value: 102 },
  { day: 'Fri', value: 94 },
  { day: 'Sat', value: 86 },
  { day: 'Sun', value: 101 },
];

export const yieldRows = [
  { label: 'FOLG', mtd: '96.4%', ytd: '95.7%' },
  { label: 'LP', mtd: '94.2%', ytd: '93.6%' },
  { label: 'HPC', mtd: '97.1%', ytd: '96.5%' },
];
