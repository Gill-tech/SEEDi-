import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../context/UserContext';
import { mockInnovations, mockFAOSTATData, sdgInfo } from '../../data/mockData';
import { Download, Share2, Printer, FileText, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';

export default function GenerateOutput() {
  const navigate = useNavigate();
  const { context } = useUserContext();

  const selectedInnovations = mockInnovations
    .filter((inn) => context.comparisonList.includes(inn.id))
    .slice(0, 3); // Top 3

  const regionData = mockFAOSTATData.find((d) => d.region === context.region) || mockFAOSTATData[0];

  const handleExport = (format: 'pdf' | 'csv' | 'link') => {
    alert(`Exporting as ${format.toUpperCase()}...`);
  };

  const calculateScore = (innovation: typeof mockInnovations[0]) => {
    const { readinessLevel, adoptionLevel, sdgs, regions } = innovation;
    const readinessScore = (readinessLevel / 9) * 0.35;
    const adoptionScore = (adoptionLevel / 9) * 0.30;
    const sdgScore = (sdgs.length / 5) * 0.20;
    const regionalScore = regions.includes(context.region) ? 0.15 : 0.075;
    return Math.round((readinessScore + adoptionScore + sdgScore + regionalScore) * 100);
  };

  const topInnovations = selectedInnovations.map((inn) => ({
    ...inn,
    score: calculateScore(inn),
  }));

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Stage 4 of 4</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Action Output & Recommendations</h1>
        <p className="text-gray-600">Your comprehensive decision brief is ready for export</p>
      </div>

      {/* Export Actions */}
      <Card className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Decision Report is Ready</h2>
            <p className="text-green-100">
              Export your analysis and share with stakeholders
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => handleExport('pdf')}
              className="bg-white text-green-700 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button
              onClick={() => handleExport('csv')}
              variant="outline"
              className="border-white text-white hover:bg-green-600"
            >
              <FileText className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button
              onClick={() => handleExport('link')}
              variant="outline"
              className="border-white text-white hover:bg-green-600"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </Card>

      {/* Context Summary */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Decision Context</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Role:</span>
            <span className="font-medium capitalize">{context.role || 'Not specified'}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Region:</span>
            <span className="font-medium">{context.region || 'Not specified'}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Primary Objective:</span>
            <span className="font-medium capitalize">
              {context.objective?.replace(/-/g, ' ') || 'Not specified'}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Agro-Ecological Zone:</span>
            <span className="font-medium">{context.agroEcologicalZone || 'Not specified'}</span>
          </div>
          {context.crop && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Primary Crop:</span>
              <span className="font-medium">{context.crop}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Analysis Date:</span>
            <span className="font-medium">February 17, 2026</span>
          </div>
        </div>
      </Card>

      {/* Top 3 Recommended Innovations */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Top 3 Recommended Innovations</h2>
        <div className="space-y-6">
          {topInnovations.map((innovation, idx) => (
            <div key={innovation.id} className="border-l-4 border-green-500 pl-6 pb-6 border-b last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{innovation.title}</h3>
                    <p className="text-gray-600 text-sm">{innovation.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{innovation.score}</div>
                  <div className="text-xs text-gray-500">Feasibility</div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid md:grid-cols-4 gap-3 mb-4 ml-13">
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Readiness</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(innovation.readinessLevel / 9) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{innovation.readinessLevel}/9</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Adoption</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(innovation.adoptionLevel / 9) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{innovation.adoptionLevel}/9</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Risk</div>
                  <Badge
                    className={
                      innovation.riskLevel === 'low'
                        ? 'bg-green-100 text-green-700'
                        : innovation.riskLevel === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }
                  >
                    {innovation.riskLevel}
                  </Badge>
                </div>
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Scalability</div>
                  <div className="font-medium capitalize">{innovation.scalability}</div>
                </div>
              </div>

              {/* SDGs */}
              <div className="ml-13 mb-3">
                <div className="text-xs text-gray-600 mb-2">SDG Alignment:</div>
                <div className="flex gap-2">
                  {innovation.sdgs.map((sdg) => (
                    <div
                      key={sdg}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      style={{ backgroundColor: sdgInfo[sdg]?.color }}
                      title={sdgInfo[sdg]?.name}
                    >
                      {sdg}
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="ml-13">
                <div className="flex flex-wrap gap-2">
                  {innovation.useCases.map((useCase, i) => (
                    <Badge key={i} variant="secondary">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Expected Impact Indicators */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Expected Impact Indicators</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-medium">Yield Improvement</div>
                <div className="text-2xl font-bold text-green-600">+48%</div>
                <div className="text-xs text-gray-600">Projected by 2030</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-medium">Loss Reduction</div>
                <div className="text-2xl font-bold text-blue-600">-65%</div>
                <div className="text-xs text-gray-600">Post-harvest losses</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-amber-600" />
              <div>
                <div className="font-medium">Income Increase</div>
                <div className="text-2xl font-bold text-amber-600">+$1,240</div>
                <div className="text-xs text-gray-600">Per hectare annually</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Soil Health Index</span>
                <span className="font-medium">
                  {regionData.soilHealthIndex} → {regionData.soilHealthIndex + 18}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${regionData.soilHealthIndex + 18}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Water Efficiency</span>
                <span className="font-medium">
                  {regionData.waterEfficiencyIndex} → {regionData.waterEfficiencyIndex + 25}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${regionData.waterEfficiencyIndex + 25}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Biodiversity Index</span>
                <span className="font-medium">
                  {regionData.biodiversityIndex} → {regionData.biodiversityIndex + 8}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${regionData.biodiversityIndex + 8}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Risks & Considerations */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Risks & Implementation Considerations
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium">Climate Risk</div>
              <div className="text-sm text-gray-600">
                Moderate drought risk this season - ensure water-efficient technologies are prioritized
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium">Initial Investment</div>
              <div className="text-sm text-gray-600">
                Some innovations require upfront capital - consider phased implementation or microfinance options
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium">Training Requirement</div>
              <div className="text-sm text-gray-600">
                Extension support recommended for optimal adoption and impact
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Implementation Steps */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Implementation Steps</h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-semibold text-green-700 flex-shrink-0">
              1
            </div>
            <div>
              <div className="font-medium">Pilot Testing (Months 1-3)</div>
              <div className="text-sm text-gray-600">
                Start with small-scale pilot of top-ranked innovation on 0.5-1 hectare
              </div>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-semibold text-green-700 flex-shrink-0">
              2
            </div>
            <div>
              <div className="font-medium">Training & Capacity Building (Month 2-4)</div>
              <div className="text-sm text-gray-600">
                Engage with local extension services for technical training and support
              </div>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-semibold text-green-700 flex-shrink-0">
              3
            </div>
            <div>
              <div className="font-medium">Monitoring & Evaluation (Ongoing)</div>
              <div className="text-sm text-gray-600">
                Track yield, losses, soil health, and income metrics against baseline
              </div>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-semibold text-green-700 flex-shrink-0">
              4
            </div>
            <div>
              <div className="font-medium">Scaling Up (Months 6-12)</div>
              <div className="text-sm text-gray-600">
                Expand successful innovations to full farm operation based on pilot results
              </div>
            </div>
          </li>
        </ol>
      </Card>

      {/* Policy Considerations (if policymaker) */}
      {context.role === 'policymaker' && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-semibold mb-4">Policy Recommendations</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                Establish subsidy programs for water-efficient irrigation systems in {context.region}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                Support farmer cooperatives to access hermetic storage technology at scale
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                Integrate climate-smart varieties into national seed distribution systems
              </div>
            </li>
          </ul>
        </Card>
      )}

      {/* Investment Readiness (if investor) */}
      {context.role === 'investor' && (
        <Card className="p-6 bg-purple-50 border-purple-200">
          <h2 className="text-xl font-semibold mb-4">Investment Readiness Assessment</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Market Readiness</div>
              <div className="text-2xl font-bold text-purple-600">High</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">ROI Potential</div>
              <div className="text-2xl font-bold text-purple-600">125%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Payback Period</div>
              <div className="text-2xl font-bold text-purple-600">2.3 yrs</div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={() => navigate('/workflow/analyze')}>
          Back to Analysis
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Save to Dashboard
          </Button>
          <Button onClick={() => navigate('/workflow/context')} className="gap-2">
            Start New Decision
          </Button>
        </div>
      </div>
    </div>
  );
}
