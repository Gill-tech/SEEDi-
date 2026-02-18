import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useNavigate } from 'react-router';
import { useUserContext } from '../context/UserContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import logo from '../../assets/1f89025c34d366be1fbcc0673e4d4ee160287f2b.png';

export default function Signup() {
  const navigate = useNavigate();
  const { updateContext } = useUserContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    region: '',
    subRegion: '',
    agroEcologicalZone: '',
    objective: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      updateContext({
        ...formData,
        isAuthenticated: true,
      });
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.role !== '';
    if (step === 2) return formData.region !== '';
    if (step === 3) return formData.objective !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="SEEDi Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Welcome to SEEDi</h1>
          <p className="text-gray-600">Let's personalize your decision journey</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-12 bg-green-600' : s < step ? 'w-8 bg-green-400' : 'w-8 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Select Role */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">What's your role?</h2>
              <p className="text-gray-600 mb-6">
                This helps us tailor recommendations to your specific needs
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: 'farmer', label: 'Farmer', icon: '🌾' },
                { value: 'policymaker', label: 'Policymaker', icon: '🏛️' },
                { value: 'sme', label: 'SME', icon: '🏢' },
                { value: 'researcher', label: 'Researcher', icon: '🔬' },
                { value: 'investor', label: 'Investor', icon: '💰' },
                { value: 'extension', label: 'Extension Worker', icon: '👥' },
              ].map((role) => (
                <button
                  key={role.value}
                  onClick={() => setFormData({ ...formData, role: role.value })}
                  className={`p-6 rounded-lg border-2 text-center transition-all hover:shadow-md ${
                    formData.role === role.value
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{role.icon}</div>
                  <div className="font-medium">{role.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Region */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Where are you located?</h2>
              <p className="text-gray-600 mb-6">
                Regional context ensures relevant innovation recommendations
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Region</label>
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
                <label className="block font-medium mb-2">Sub-Region (Optional)</label>
                <input
                  type="text"
                  value={formData.subRegion}
                  onChange={(e) => setFormData({ ...formData, subRegion: e.target.value })}
                  placeholder="e.g., Rift Valley, Punjab, etc."
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Agro-Ecological Zone (Optional)</label>
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
            </div>
          </div>
        )}

        {/* Step 3: Primary Objective */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">What's your primary objective?</h2>
              <p className="text-gray-600 mb-6">
                We'll prioritize innovations that align with your goals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'increase-production', label: 'Increase Production', icon: '📈' },
                { value: 'reduce-losses', label: 'Reduce Post-Harvest Losses', icon: '🛡️' },
                { value: 'improve-sustainability', label: 'Improve Sustainability', icon: '🌍' },
                { value: 'add-value', label: 'Add Value to Products', icon: '⭐' },
                { value: 'increase-income', label: 'Increase Income', icon: '💵' },
                { value: 'soil-health', label: 'Improve Soil Health', icon: '🌱' },
                { value: 'water-efficiency', label: 'Improve Water Efficiency', icon: '💧' },
                { value: 'climate-adaptation', label: 'Climate Adaptation', icon: '🌦️' },
              ].map((obj) => (
                <button
                  key={obj.value}
                  onClick={() => setFormData({ ...formData, objective: obj.value })}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    formData.objective === obj.value
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{obj.icon}</div>
                    <div className="font-medium">{obj.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {step === 3 ? 'Complete Setup' : 'Next'} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Back to home
          </button>
        </div>
      </Card>
    </div>
  );
}
