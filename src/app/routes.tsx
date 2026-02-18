import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DefineContext from './pages/workflow/DefineContext';
import ExploreCompare from './pages/workflow/ExploreCompare';
import AnalyzeSimulate from './pages/workflow/AnalyzeSimulate';
import GenerateOutput from './pages/workflow/GenerateOutput';
import Layout from './components/Layout';

// Wrapper for pages that need the layout
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <LayoutWrapper>
        <Dashboard />
      </LayoutWrapper>
    ),
  },
  {
    path: '/workflow/context',
    element: (
      <LayoutWrapper>
        <DefineContext />
      </LayoutWrapper>
    ),
  },
  {
    path: '/workflow/explore',
    element: (
      <LayoutWrapper>
        <ExploreCompare />
      </LayoutWrapper>
    ),
  },
  {
    path: '/workflow/analyze',
    element: (
      <LayoutWrapper>
        <AnalyzeSimulate />
      </LayoutWrapper>
    ),
  },
  {
    path: '/workflow/output',
    element: (
      <LayoutWrapper>
        <GenerateOutput />
      </LayoutWrapper>
    ),
  },
  {
    path: '/saved',
    element: (
      <LayoutWrapper>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Saved Decisions</h1>
          <p className="text-gray-600">Your saved decision projects will appear here.</p>
        </div>
      </LayoutWrapper>
    ),
  },
  {
    path: '/reports',
    element: (
      <LayoutWrapper>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Reports</h1>
          <p className="text-gray-600">Your exported reports and analytics.</p>
        </div>
      </LayoutWrapper>
    ),
  },
  {
    path: '/settings',
    element: (
      <LayoutWrapper>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences.</p>
        </div>
      </LayoutWrapper>
    ),
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <a href="/" className="text-green-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    ),
  },
]);
