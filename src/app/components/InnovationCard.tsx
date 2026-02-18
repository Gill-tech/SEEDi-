import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Innovation, sdgInfo } from '../data/mockData';
import { Plus, Check, Info } from 'lucide-react';

interface InnovationCardProps {
  innovation: Innovation;
  score: number;
  isInComparison: boolean;
  onAddToCompare: () => void;
  onRemoveFromCompare: () => void;
  onViewDetails: () => void;
}

export default function InnovationCard({
  innovation,
  score,
  isInComparison,
  onAddToCompare,
  onRemoveFromCompare,
  onViewDetails,
}: InnovationCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getScalabilityColor = (scalability: string) => {
    switch (scalability) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{innovation.title}</h3>
            <Badge variant="outline" className="text-xs">
              {innovation.type}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{innovation.description}</p>
        </div>
        <div className="text-right ml-4">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-xs text-gray-500">Score</div>
        </div>
      </div>

      {/* Readiness & Adoption Bars */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Readiness Level</span>
            <span className="font-medium">{innovation.readinessLevel}/9</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(innovation.readinessLevel / 9) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Adoption Level</span>
            <span className="font-medium">{innovation.adoptionLevel}/9</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(innovation.adoptionLevel / 9) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {innovation.useCases.map((useCase, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {useCase}
            </Badge>
          ))}
        </div>
      </div>

      {/* SDGs */}
      <div className="mb-4">
        <div className="text-xs text-gray-600 mb-2">SDG Alignment:</div>
        <div className="flex flex-wrap gap-2">
          {innovation.sdgs.map((sdg) => (
            <div
              key={sdg}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
              style={{ backgroundColor: sdgInfo[sdg]?.color || '#666' }}
              title={sdgInfo[sdg]?.name}
            >
              {sdg}
            </div>
          ))}
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <div className="text-gray-600 text-xs mb-1">Risk Level</div>
          <Badge className={getRiskColor(innovation.riskLevel)}>
            {innovation.riskLevel}
          </Badge>
        </div>
        <div>
          <div className="text-gray-600 text-xs mb-1">Scalability</div>
          <span className={`font-medium capitalize ${getScalabilityColor(innovation.scalability)}`}>
            {innovation.scalability}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-xs text-gray-500">
          <div>{innovation.provider}</div>
          <div className="text-gray-400">{innovation.dataSource}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            <Info className="w-4 h-4 mr-1" />
            Details
          </Button>
          {isInComparison ? (
            <Button size="sm" onClick={onRemoveFromCompare} className="gap-1">
              <Check className="w-4 h-4" />
              Added
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={onAddToCompare} className="gap-1">
              <Plus className="w-4 h-4" />
              Compare
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
