import { useState } from 'react';
import { Phone, BarChart3, Users, Workflow } from 'lucide-react';
import { AgentDashboard } from './components/AgentDashboard';
import { AdminPanel } from './components/AdminPanel';
import { InsightsDashboard } from './components/InsightsDashboard';
import { CallRoutingConfig } from './components/CallRoutingConfig';

type Tab = 'agent' | 'admin' | 'insights' | 'routing';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('agent');

  const tabs = [
    { id: 'agent' as const, label: 'Agent Dashboard', icon: Phone },
    { id: 'insights' as const, label: 'Insights', icon: BarChart3 },
    { id: 'admin' as const, label: 'Admin Panel', icon: Users },
    { id: 'routing' as const, label: 'Call Routing', icon: Workflow },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">Helio AI Contact Center</h1>
                <p className="text-sm text-gray-500">Enterprise Customer Experience Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === 'agent' && <AgentDashboard />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'insights' && <InsightsDashboard />}
        {activeTab === 'routing' && <CallRoutingConfig />}
      </main>
    </div>
  );
}
