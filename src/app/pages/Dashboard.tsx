import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';
import { useUserContext } from '../context/UserContext';
import {
  Plus,
  Play,
  Download,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Target,
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { context } = useUserContext();

  const recentProjects = [
    {
      id: 1,
      name: 'Water Efficiency Solutions',
      date: '2026-02-15',
      stage: 'Analyze & Simulate',
      innovations: 3,
    },
    {
      id: 2,
      name: 'Post-Harvest Loss Reduction',
      date: '2026-02-10',
      stage: 'Explore & Compare',
      innovations: 5,
    },
  ];

  const regionalAlerts = [
    {
      type: 'warning',
      message: 'High climate risk alert for East Africa this season',
      date: '2 days ago',
    },
    {
      type: 'info',
      message: 'New drought-tolerant varieties available for your region',
      date: '5 days ago',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back{context.role ? `, ${context.role}` : ''}!
        </h1>
        <p className="text-green-100 mb-6">
          {context.region
            ? `Your decision dashboard for ${context.region}`
            : 'Start your agricultural decision journey'}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate('/workflow/context')}
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start New Decision
          </Button>
          {recentProjects.length > 0 && (
            <Button
              onClick={() => navigate('/workflow/explore')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-green-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume Last Project
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold mb-1">2,847</div>
          <div className="text-sm text-gray-600">Relevant Innovations</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{context.region || 'Not Set'}</div>
          <div className="text-sm text-gray-600">Primary Region</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">12</div>
          <div className="text-sm text-gray-600">Exported Reports</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">18%</div>
          <div className="text-sm text-gray-600">Avg. Post-Harvest Loss</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Decision Projects */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Decision Projects</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/saved')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border rounded-lg hover:border-green-300 cursor-pointer transition-colors"
                  onClick={() => navigate('/workflow/explore')}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="text-xs text-gray-500">{project.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {project.stage}
                    </span>
                    <span>{project.innovations} innovations</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No active projects</p>
                <Button
                  variant="link"
                  onClick={() => navigate('/workflow/context')}
                  className="mt-2"
                >
                  Start your first decision
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Regional Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Regional Alerts</h2>
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </div>
          <div className="space-y-4">
            {regionalAlerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 border-l-4 rounded-r-lg ${
                  alert.type === 'warning'
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{alert.message}</p>
                    <p className="text-xs text-gray-600">{alert.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sustainability Snapshot */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Sustainability Snapshot - {context.region || 'Your Region'}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Soil Health Index</span>
              <span className="text-sm font-semibold">62/100</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Water Efficiency</span>
              <span className="text-sm font-semibold">52/100</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Biodiversity Index</span>
              <span className="text-sm font-semibold">71/100</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-3">
          <Button variant="outline" className="justify-start" onClick={() => navigate('/workflow/context')}>
            <Plus className="w-4 h-4 mr-2" />
            New Decision
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => navigate('/workflow/explore')}>
            <Sparkles className="w-4 h-4 mr-2" />
            Explore Innovations
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => navigate('/reports')}>
            <Download className="w-4 h-4 mr-2" />
            Download Reports
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => navigate('/settings')}>
            <Target className="w-4 h-4 mr-2" />
            Update Context
          </Button>
        </div>
      </Card>
    </div>
  );
}
