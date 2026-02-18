import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../context/UserContext';
import { mockInnovations, mockFAOSTATData } from '../../data/mockData';
import { ArrowRight, TrendingUp, TrendingDown, Droplet, Leaf, DollarSign, BarChart3 } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyzeSimulate() {
  const navigate = useNavigate();
  const { context } = useUserContext();

  const selectedInnovations = mockInnovations.filter((inn) =>
    context.comparisonList.includes(inn.id)
  );

  const regionData = mockFAOSTATData.find((d) => d.region === context.region) || mockFAOSTATData[0];

  // Simulated impact projections
  const yieldProjection = [
    { year: '2026', baseline: 2.1, withInnovation: 2.1 },
    { year: '2027', baseline: 2.1, withInnovation: 2.5 },
    { year: '2028', baseline: 2.1, withInnovation: 2.8 },
    { year: '2029', baseline: 2.1, withInnovation: 3.1 },
    { year: '2030', baseline: 2.1, withInnovation: 3.4 },
  ];

  const lossReduction = [
    { category: 'Current', value: regionData.postHarvestLoss },
    { category: 'Year 1', value: regionData.postHarvestLoss * 0.85 },
    { category: 'Year 2', value: regionData.postHarvestLoss * 0.7 },
    { category: 'Year 3', value: regionData.postHarvestLoss * 0.55 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Stage 3 of 4</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Analyze & Simulate Impact</h1>
        <p className="text-gray-600">
          Project potential outcomes for {selectedInnovations.length} selected innovation(s)
        </p>
      </div>

      {/* Selected Innovations Summary */}
      <Card className="p-6 bg-green-50 border-green-200">
        <h2 className="text-lg font-semibold mb-4">Selected Innovations for Analysis</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {selectedInnovations.map((inn) => (
            <div key={inn.id} className="p-3 bg-white rounded-lg border">
              <div className="font-medium text-sm mb-1">{inn.title}</div>
              <div className="text-xs text-gray-600">{inn.type}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Impact Indicators */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">+48%</div>
              <div className="text-xs text-gray-600">Projected</div>
            </div>
          </div>
          <div className="text-sm font-medium">Yield Increase</div>
          <div className="text-xs text-gray-500 mt-1">By 2030 (5-year horizon)</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <TrendingDown className="w-8 h-8 text-blue-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">-65%</div>
              <div className="text-xs text-gray-600">Projected</div>
            </div>
          </div>
          <div className="text-sm font-medium">Loss Reduction</div>
          <div className="text-xs text-gray-500 mt-1">Post-harvest losses</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-amber-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">+$1,240</div>
              <div className="text-xs text-gray-600">Per hectare</div>
            </div>
          </div>
          <div className="text-sm font-medium">Income Potential</div>
          <div className="text-xs text-gray-500 mt-1">Annual increase</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Leaf className="w-8 h-8 text-green-600" />
            <div className="text-right">
              <div className="text-2xl font-bold text-green-700">+18%</div>
              <div className="text-xs text-gray-600">Improvement</div>
            </div>
          </div>
          <div className="text-sm font-medium">Soil Health</div>
          <div className="text-xs text-gray-500 mt-1">Health index score</div>
        </Card>
      </div>

      {/* Yield Projection Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Yield Projection (tonnes/ha)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yieldProjection}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeWidth={2} name="Current Baseline" />
            <Line type="monotone" dataKey="withInnovation" stroke="#16a34a" strokeWidth={2} name="With Innovation" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Loss Reduction Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Post-Harvest Loss Reduction (%)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={lossReduction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" name="Loss Percentage" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Sustainability Dashboard */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Sustainability Impact Dashboard</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-medium">Soil Health</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">{regionData.soilHealthIndex}</span>
                <span className="mx-1">→</span>
                <span className="text-green-600 font-semibold">
                  {regionData.soilHealthIndex + 18}
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${regionData.soilHealthIndex + 18}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Water Efficiency</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">{regionData.waterEfficiencyIndex}</span>
                <span className="mx-1">→</span>
                <span className="text-blue-600 font-semibold">
                  {regionData.waterEfficiencyIndex + 25}
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${regionData.waterEfficiencyIndex + 25}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Biodiversity</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">{regionData.biodiversityIndex}</span>
                <span className="mx-1">→</span>
                <span className="text-emerald-600 font-semibold">
                  {regionData.biodiversityIndex + 8}
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${regionData.biodiversityIndex + 8}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Climate Risk Assessment */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Climate Risk Assessment
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium">Moderate drought risk this season</div>
              <div className="text-sm text-gray-600">
                Recommended: Implement drip irrigation and drought-tolerant varieties
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium">Selected innovations reduce climate vulnerability</div>
              <div className="text-sm text-gray-600">
                Climate resilience score improved by 34%
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Value-Added Opportunities */}
      {context.objective === 'add-value' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Value-Added Processing Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">Mobile Grain Milling</div>
              <div className="text-sm text-gray-600 mb-2">
                Process grain at farm-gate to reduce transport costs
              </div>
              <div className="text-xs text-green-600">+$340/tonne potential revenue</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">Solar Drying Units</div>
              <div className="text-sm text-gray-600 mb-2">
                Extend shelf-life and improve quality for premium markets
              </div>
              <div className="text-xs text-green-600">+$220/tonne potential revenue</div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={() => navigate('/workflow/explore')}>
          Back to Explore
        </Button>
        <Button onClick={() => navigate('/workflow/output')} className="gap-2" size="lg">
          Generate Action Output <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
