import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useUserContext } from '../context/UserContext';
import { Button } from './ui/button';
import {
  Target,
  Sprout,
  BarChart3,
  FileText,
  Home,
  BookmarkCheck,
  FileBarChart,
  Settings,
  LogOut,
  AlertCircle,
  Droplet,
  TrendingDown,
} from 'lucide-react';
import logo from '../../assets/1f89025c34d366be1fbcc0673e4d4ee160287f2b.png';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { context, logout } = useUserContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const workflowStages = [
    { path: '/workflow/context', label: 'Define Context', icon: Target, step: 1 },
    { path: '/workflow/explore', label: 'Explore & Compare', icon: Sprout, step: 2 },
    { path: '/workflow/analyze', label: 'Analyze & Simulate', icon: BarChart3, step: 3 },
    { path: '/workflow/output', label: 'Generate Action', icon: FileText, step: 4 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={logo}
                alt="SEEDi Logo"
                className="h-10 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              />
              {context.region && (
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Region:</span>
                    <span className="font-medium">{context.region}</span>
                  </div>
                  {context.agroEcologicalZone && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Zone:</span>
                      <span className="font-medium">{context.agroEcologicalZone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-6">
              {/* Context Indicators */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">Water: 52%</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-600">Soil: 62%</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-gray-600">Loss: 18%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-60px)] sticky top-[60px]">
          <div className="p-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">
                Main
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/saved')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/saved')
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  Saved Decisions
                </button>
                <button
                  onClick={() => navigate('/reports')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/reports')
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileBarChart className="w-4 h-4" />
                  Reports
                </button>
              </nav>
            </div>

            {/* Workflow Stages */}
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">
                Workflow Stages
              </div>
              <nav className="space-y-1">
                {workflowStages.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <button
                      key={stage.path}
                      onClick={() => navigate(stage.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(stage.path)
                          ? 'bg-green-50 text-green-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                            isActive(stage.path)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {stage.step}
                        </div>
                        <span className="truncate">{stage.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Settings */}
            <div className="pt-4 border-t">
              <button
                onClick={() => navigate('/settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/settings')
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
