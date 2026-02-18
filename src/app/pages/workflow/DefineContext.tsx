import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../context/UserContext';
import { ArrowRight, Edit2 } from 'lucide-react';

export default function DefineContext() {
  const navigate = useNavigate();
  const { context, updateContext } = useUserContext();
  
  const [formData, setFormData] = useState({
    role: context.role || '',
    region: context.region || '',
    subRegion: context.subRegion || '',
    agroEcologicalZone: context.agroEcologicalZone || '',
    objective: context.objective || '',
    crop: context.crop || '',
    budgetLevel: context.budgetLevel || '',
    farmSize: context.farmSize || '',
    climateRiskLevel: context.climateRiskLevel || '',
  });

  const handleSaveAndContinue = () => {
    updateContext(formData);
    navigate('/workflow/explore');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Stage 1 of 4</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Define Your Context</h1>
        <p className="text-gray-600">
          Provide details about your situation to get personalized innovation recommendations
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Edit2 className="w-5 h-5" />
            Basic Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select role...</option>
                <option value="farmer">Farmer</option>
                <option value="policymaker">Policymaker</option>
                <option value="sme">SME</option>
                <option value="researcher">Researcher</option>
                <option value="investor">Investor</option>
                <option value="extension">Extension Worker</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Primary Objective *</label>
              <select
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select objective...</option>
                <option value="increase-production">Increase Production</option>
                <option value="reduce-losses">Reduce Post-Harvest Losses</option>
                <option value="improve-sustainability">Improve Sustainability</option>
                <option value="add-value">Add Value to Products</option>
                <option value="increase-income">Increase Income</option>
                <option value="soil-health">Improve Soil Health</option>
                <option value="water-efficiency">Improve Water Efficiency</option>
                <option value="climate-adaptation">Climate Adaptation</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Geographic Context */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Geographic Context</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Region *</label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select region...</option>
                <option value="East Africa">East Africa</option>
                <option value="West Africa">West Africa</option>
                <option value="Southern Africa">Southern Africa</option>
                <option value="North Africa">North Africa</option>
                <option value="South Asia">South Asia</option>
                <option value="Southeast Asia">Southeast Asia</option>
                <option value="Latin America">Latin America</option>
                <option value="Central America">Central America</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Sub-Region</label>
              <input
                type="text"
                value={formData.subRegion}
                onChange={(e) => setFormData({ ...formData, subRegion: e.target.value })}
                placeholder="e.g., Rift Valley, Punjab"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Agro-Ecological Zone</label>
              <select
                value={formData.agroEcologicalZone}
                onChange={(e) => setFormData({ ...formData, agroEcologicalZone: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select zone...</option>
                <option value="Humid Tropics">Humid Tropics</option>
                <option value="Sub-Humid">Sub-Humid</option>
                <option value="Semi-Arid">Semi-Arid</option>
                <option value="Arid">Arid</option>
                <option value="Highland">Highland</option>
                <option value="Temperate">Temperate</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Primary Crop (Optional)</label>
              <input
                type="text"
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                placeholder="e.g., Maize, Rice, Wheat"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </Card>

        {/* Additional Context */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Additional Context (Optional)</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-2">Budget Level</label>
              <select
                value={formData.budgetLevel}
                onChange={(e) => setFormData({ ...formData, budgetLevel: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select budget...</option>
                <option value="low">Low (&lt; $500)</option>
                <option value="medium">Medium ($500-$5000)</option>
                <option value="high">High (&gt; $5000)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Farm Size</label>
              <select
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select size...</option>
                <option value="small">Small (&lt; 2 ha)</option>
                <option value="medium">Medium (2-10 ha)</option>
                <option value="large">Large (&gt; 10 ha)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Climate Risk Level</label>
              <select
                value={formData.climateRiskLevel}
                onChange={(e) => setFormData({ ...formData, climateRiskLevel: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select risk...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveAndContinue}
          disabled={!formData.role || !formData.region || !formData.objective}
          className="gap-2"
          size="lg"
        >
          Save & Continue to Explore <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
