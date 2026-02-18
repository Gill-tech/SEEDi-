import { useState, useMemo } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../context/UserContext';
import { mockInnovations, Innovation, sdgInfo } from '../../data/mockData';
import InnovationCard from '../../components/InnovationCard';
import { ArrowRight, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Slider } from '../../components/ui/slider';

export default function ExploreCompare() {
  const navigate = useNavigate();
  const { context, addToComparison, removeFromComparison, clearComparison } = useUserContext();
  const [showWeights, setShowWeights] = useState(false);
  const [weights, setWeights] = useState(context.rankingWeights);
  const [selectedInnovation, setSelectedInnovation] = useState<Innovation | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'readiness' | 'adoption'>('score');

  // Calculate feasibility score for each innovation
  const calculateScore = (innovation: Innovation) => {
    const readinessScore = (innovation.readinessLevel / 9) * weights.readiness;
    const adoptionScore = (innovation.adoptionLevel / 9) * weights.adoption;
    
    // SDG match: higher if more SDGs align with user objective
    const sdgScore = (innovation.sdgs.length / 5) * weights.sdg;
    
    // Regional relevance: 1 if region matches, 0.5 if partially matches
    const regionalScore = innovation.regions.includes(context.region) ? weights.regional : weights.regional * 0.5;
    
    return Math.round((readinessScore + adoptionScore + sdgScore + regionalScore) * 100);
  };

  // Get filtered and ranked innovations
  const rankedInnovations = useMemo(() => {
    let filtered = mockInnovations;
    
    // Filter by region if set
    if (context.region) {
      filtered = filtered.filter(
        (inn) => inn.regions.includes(context.region) || inn.regions.includes('Global')
      );
    }
    
    // Calculate scores and sort
    const scored = filtered.map((innovation) => ({
      innovation,
      score: calculateScore(innovation),
    }));
    
    scored.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'readiness') return b.innovation.readinessLevel - a.innovation.readinessLevel;
      if (sortBy === 'adoption') return b.innovation.adoptionLevel - a.innovation.adoptionLevel;
      return 0;
    });
    
    return scored;
  }, [context.region, weights, sortBy]);

  const handleWeightChange = (key: keyof typeof weights, value: number[]) => {
    setWeights({ ...weights, [key]: value[0] });
  };

  const comparisonInnovations = rankedInnovations.filter((ri) =>
    context.comparisonList.includes(ri.innovation.id)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Stage 2 of 4</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Explore & Compare Innovations</h1>
        <p className="text-gray-600">
          Browse {rankedInnovations.length} innovations ranked for {context.region || 'your context'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant={showWeights ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowWeights(!showWeights)}
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Adjust Weights
          </Button>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500"
            >
              <option value="score">Sort by Score</option>
              <option value="readiness">Sort by Readiness</option>
              <option value="adoption">Sort by Adoption</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {context.comparisonList.length > 0 && (
            <>
              <Badge variant="secondary" className="text-sm">
                {context.comparisonList.length} selected for comparison
              </Badge>
              <Button variant="outline" size="sm" onClick={clearComparison}>
                Clear All
              </Button>
              <Button size="sm" onClick={() => setShowWeights(false)} className="gap-2">
                Compare Selected <ArrowRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Weight Adjustment Panel */}
      {showWeights && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h3 className="font-semibold mb-4">Ranking Weights</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Readiness Level</label>
                <span className="text-sm text-gray-600">{Math.round(weights.readiness * 100)}%</span>
              </div>
              <Slider
                value={[weights.readiness]}
                onValueChange={(v) => handleWeightChange('readiness', v)}
                min={0}
                max={1}
                step={0.05}
                className="mb-2"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Adoption Level</label>
                <span className="text-sm text-gray-600">{Math.round(weights.adoption * 100)}%</span>
              </div>
              <Slider
                value={[weights.adoption]}
                onValueChange={(v) => handleWeightChange('adoption', v)}
                min={0}
                max={1}
                step={0.05}
                className="mb-2"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">SDG Match</label>
                <span className="text-sm text-gray-600">{Math.round(weights.sdg * 100)}%</span>
              </div>
              <Slider
                value={[weights.sdg]}
                onValueChange={(v) => handleWeightChange('sdg', v)}
                min={0}
                max={1}
                step={0.05}
                className="mb-2"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Regional Relevance</label>
                <span className="text-sm text-gray-600">{Math.round(weights.regional * 100)}%</span>
              </div>
              <Slider
                value={[weights.regional]}
                onValueChange={(v) => handleWeightChange('regional', v)}
                min={0}
                max={1}
                step={0.05}
                className="mb-2"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Comparison View (if items selected) */}
      {context.comparisonList.length > 0 && !showWeights && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Side-by-Side Comparison</h2>
            <Button variant="ghost" size="sm" onClick={clearComparison}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Criteria</th>
                  {comparisonInnovations.map(({ innovation }) => (
                    <th key={innovation.id} className="text-left p-3 font-medium min-w-[200px]">
                      {innovation.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-3 text-gray-600">Score</td>
                  {comparisonInnovations.map(({ innovation, score }) => (
                    <td key={innovation.id} className="p-3">
                      <span className="text-lg font-bold text-green-600">{score}</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-600">Readiness</td>
                  {comparisonInnovations.map(({ innovation }) => (
                    <td key={innovation.id} className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${(innovation.readinessLevel / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span>{innovation.readinessLevel}/9</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-600">Adoption</td>
                  {comparisonInnovations.map(({ innovation }) => (
                    <td key={innovation.id} className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(innovation.adoptionLevel / 9) * 100}%` }}
                          ></div>
                        </div>
                        <span>{innovation.adoptionLevel}/9</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-600">SDGs</td>
                  {comparisonInnovations.map(({ innovation }) => (
                    <td key={innovation.id} className="p-3">
                      <div className="flex gap-1 flex-wrap">
                        {innovation.sdgs.map((sdg) => (
                          <div
                            key={sdg}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                            style={{ backgroundColor: sdgInfo[sdg]?.color }}
                            title={sdgInfo[sdg]?.name}
                          >
                            {sdg}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-600">Risk Level</td>
                  {comparisonInnovations.map(({ innovation }) => (
                    <td key={innovation.id} className="p-3">
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
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-600">Scalability</td>
                  {comparisonInnovations.map(({ innovation }) => (
                    <td key={innovation.id} className="p-3 capitalize">
                      {innovation.scalability}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-gray-600">Target Users</td>
                  {comparisonInnovations.map(({ innovation }) => (
                    <td key={innovation.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {innovation.targetUsers.map((user, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {user}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Innovation Cards Grid */}
      {!showWeights && context.comparisonList.length === 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {rankedInnovations.map(({ innovation, score }) => (
            <InnovationCard
              key={innovation.id}
              innovation={innovation}
              score={score}
              isInComparison={context.comparisonList.includes(innovation.id)}
              onAddToCompare={() => addToComparison(innovation.id)}
              onRemoveFromCompare={() => removeFromComparison(innovation.id)}
              onViewDetails={() => setSelectedInnovation(innovation)}
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={() => navigate('/workflow/context')}>
          Back to Context
        </Button>
        <Button
          onClick={() => navigate('/workflow/analyze')}
          disabled={context.comparisonList.length === 0}
          className="gap-2"
          size="lg"
        >
          Continue to Analysis <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
