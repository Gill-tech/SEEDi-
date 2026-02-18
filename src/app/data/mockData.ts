// Mock ATIO Knowledge Base innovations data
export interface Innovation {
  id: string;
  title: string;
  description: string;
  type: string;
  useCases: string[];
  readinessLevel: number; // 1-9
  adoptionLevel: number; // 1-9
  sdgs: number[]; // SDG numbers
  regions: string[];
  provider: string;
  dataSource: string;
  impactType: string;
  riskLevel: 'low' | 'medium' | 'high';
  targetUsers: string[];
  scalability: 'low' | 'medium' | 'high';
}

export const mockInnovations: Innovation[] = [
  {
    id: '1',
    title: 'Solar-Powered Drip Irrigation System',
    description: 'An off-grid water-efficient irrigation solution that reduces water usage by 40% while increasing crop yields through precise water delivery.',
    type: 'Technology',
    useCases: ['Water Efficiency', 'Climate Adaptation', 'Yield Improvement'],
    readinessLevel: 8,
    adoptionLevel: 6,
    sdgs: [2, 6, 13],
    regions: ['East Africa', 'West Africa', 'South Asia'],
    provider: 'AgroTech Solutions',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Resource Efficiency',
    riskLevel: 'low',
    targetUsers: ['Smallholder Farmers', 'Commercial Farms'],
    scalability: 'high',
  },
  {
    id: '2',
    title: 'Hermetic Storage Technology',
    description: 'Airtight storage bags that prevent post-harvest losses from insects and moisture, reducing storage losses by up to 98%.',
    type: 'Post-Harvest',
    useCases: ['Loss Reduction', 'Storage', 'Food Security'],
    readinessLevel: 9,
    adoptionLevel: 7,
    sdgs: [2, 12],
    regions: ['East Africa', 'South Asia', 'Southeast Asia'],
    provider: 'GrainPro',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Loss Reduction',
    riskLevel: 'low',
    targetUsers: ['Smallholder Farmers', 'Cooperatives'],
    scalability: 'high',
  },
  {
    id: '3',
    title: 'Bio-Fertilizer with Nitrogen-Fixing Bacteria',
    description: 'Organic fertilizer enriched with beneficial bacteria that enhance soil health and reduce chemical fertilizer dependency by 30%.',
    type: 'Input',
    useCases: ['Soil Health', 'Sustainability', 'Cost Reduction'],
    readinessLevel: 7,
    adoptionLevel: 5,
    sdgs: [2, 15],
    regions: ['South Asia', 'Latin America', 'Sub-Saharan Africa'],
    provider: 'BioSoil Innovations',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Soil Enhancement',
    riskLevel: 'medium',
    targetUsers: ['Smallholder Farmers', 'Organic Farmers'],
    scalability: 'medium',
  },
  {
    id: '4',
    title: 'Mobile Grain Milling Service',
    description: 'On-demand mobile milling units that process grain at farm-gate, reducing transport costs and adding value locally.',
    type: 'Processing',
    useCases: ['Value Addition', 'Income Generation', 'Market Access'],
    readinessLevel: 8,
    adoptionLevel: 4,
    sdgs: [2, 8, 9],
    regions: ['East Africa', 'West Africa'],
    provider: 'AgriProcess Hub',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Value Addition',
    riskLevel: 'medium',
    targetUsers: ['Smallholder Farmers', 'SMEs'],
    scalability: 'medium',
  },
  {
    id: '5',
    title: 'Climate-Smart Crop Varieties (Drought-Tolerant)',
    description: 'Genetically improved seed varieties that maintain yields under water stress conditions, reducing crop failure risk by 45%.',
    type: 'Input',
    useCases: ['Climate Adaptation', 'Yield Stability', 'Risk Reduction'],
    readinessLevel: 9,
    adoptionLevel: 6,
    sdgs: [2, 13],
    regions: ['East Africa', 'Southern Africa', 'South Asia'],
    provider: 'CGIAR Research Centers',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Climate Resilience',
    riskLevel: 'low',
    targetUsers: ['Smallholder Farmers', 'Commercial Farms'],
    scalability: 'high',
  },
  {
    id: '6',
    title: 'IoT Soil Moisture Sensors',
    description: 'Real-time soil moisture monitoring system that optimizes irrigation scheduling and reduces water waste by 35%.',
    type: 'Technology',
    useCases: ['Water Efficiency', 'Precision Agriculture', 'Data-Driven Decisions'],
    readinessLevel: 7,
    adoptionLevel: 3,
    sdgs: [6, 9, 13],
    regions: ['Global'],
    provider: 'FarmSense Technologies',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Resource Efficiency',
    riskLevel: 'medium',
    targetUsers: ['Commercial Farms', 'Tech-Savvy Farmers'],
    scalability: 'high',
  },
  {
    id: '7',
    title: 'Integrated Pest Management (IPM) Kit',
    description: 'Comprehensive biological pest control system combining beneficial insects, pheromone traps, and organic sprays.',
    type: 'Practice',
    useCases: ['Pest Control', 'Sustainability', 'Health'],
    readinessLevel: 8,
    adoptionLevel: 5,
    sdgs: [2, 3, 12],
    regions: ['Global'],
    provider: 'EcoPest Solutions',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Sustainability',
    riskLevel: 'low',
    targetUsers: ['Smallholder Farmers', 'Organic Farmers'],
    scalability: 'high',
  },
  {
    id: '8',
    title: 'Cold Chain Solar Coolers',
    description: 'Solar-powered refrigeration units for perishable crops, extending shelf life by 7-10 days and reducing losses.',
    type: 'Post-Harvest',
    useCases: ['Loss Reduction', 'Value Addition', 'Market Access'],
    readinessLevel: 6,
    adoptionLevel: 3,
    sdgs: [2, 7, 12],
    regions: ['East Africa', 'South Asia', 'Southeast Asia'],
    provider: 'ColdSolar Inc.',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Loss Reduction',
    riskLevel: 'high',
    targetUsers: ['SMEs', 'Cooperatives'],
    scalability: 'medium',
  },
  {
    id: '9',
    title: 'Digital Farm Advisory Platform',
    description: 'Mobile app providing personalized agronomic advice, weather forecasts, and market prices using AI and local data.',
    type: 'Service',
    useCases: ['Decision Support', 'Market Access', 'Knowledge Transfer'],
    readinessLevel: 8,
    adoptionLevel: 5,
    sdgs: [2, 8, 9],
    regions: ['Global'],
    provider: 'FarmWise Digital',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Knowledge Enhancement',
    riskLevel: 'low',
    targetUsers: ['Smallholder Farmers', 'Extension Workers'],
    scalability: 'high',
  },
  {
    id: '10',
    title: 'Composting & Biogas System',
    description: 'Integrated waste management system converting farm waste into compost and biogas for cooking and energy.',
    type: 'Technology',
    useCases: ['Waste Management', 'Energy', 'Soil Health'],
    readinessLevel: 7,
    adoptionLevel: 4,
    sdgs: [7, 12, 13],
    regions: ['South Asia', 'Southeast Asia', 'East Africa'],
    provider: 'BioEnergy Solutions',
    dataSource: 'ATIO KB v2.1',
    impactType: 'Circular Economy',
    riskLevel: 'medium',
    targetUsers: ['Smallholder Farmers', 'Livestock Farmers'],
    scalability: 'medium',
  },
];

// Mock FAOSTAT data
export interface FAOSTATData {
  region: string;
  crop: string;
  production: number; // tonnes
  yield: number; // tonnes/ha
  postHarvestLoss: number; // percentage
  soilHealthIndex: number; // 0-100
  waterEfficiencyIndex: number; // 0-100
  biodiversityIndex: number; // 0-100
}

export const mockFAOSTATData: FAOSTATData[] = [
  {
    region: 'East Africa',
    crop: 'Maize',
    production: 45000000,
    yield: 2.1,
    postHarvestLoss: 23,
    soilHealthIndex: 62,
    waterEfficiencyIndex: 48,
    biodiversityIndex: 71,
  },
  {
    region: 'West Africa',
    crop: 'Rice',
    production: 32000000,
    yield: 3.2,
    postHarvestLoss: 18,
    soilHealthIndex: 58,
    waterEfficiencyIndex: 52,
    biodiversityIndex: 68,
  },
  {
    region: 'South Asia',
    crop: 'Wheat',
    production: 125000000,
    yield: 3.5,
    postHarvestLoss: 15,
    postHarvestLoss: 12,
    soilHealthIndex: 54,
    waterEfficiencyIndex: 45,
    biodiversityIndex: 63,
  },
];

// SDG information
export const sdgInfo: { [key: number]: { name: string; color: string } } = {
  1: { name: 'No Poverty', color: '#E5243B' },
  2: { name: 'Zero Hunger', color: '#DDA63A' },
  3: { name: 'Good Health', color: '#4C9F38' },
  6: { name: 'Clean Water', color: '#26BDE2' },
  7: { name: 'Clean Energy', color: '#FCC30B' },
  8: { name: 'Decent Work', color: '#A21942' },
  9: { name: 'Industry Innovation', color: '#FD6925' },
  12: { name: 'Responsible Consumption', color: '#BF8B2E' },
  13: { name: 'Climate Action', color: '#3F7E44' },
  15: { name: 'Life on Land', color: '#56C02B' },
};
