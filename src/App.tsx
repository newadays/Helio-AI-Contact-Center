import { useState } from 'react';
import { Phone, BarChart3, Users, Workflow, Menu, X } from 'lucide-react';
import { AgentDashboard } from './components/AgentDashboard';
import { AdminPanel } from './components/AdminPanel';
import { InsightsDashboard } from './components/InsightsDashboard';
import { CallRoutingConfig } from './components/CallRoutingConfig';

type Tab = 'agent' | 'admin' | 'insights' | 'routing';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('agent');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'agent' as const, label: 'Agent Dashboard', icon: Phone },
    { id: 'insights' as const, label: 'Insights', icon: BarChart3 },
    { id: 'admin' as const, label: 'Admin Panel', icon: Users },
    { id: 'routing' as const, label: 'Call Routing', icon: Workflow },
  ];

  const handleTabChange = (tabId: Tab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base md:text-xl text-gray-900">Helio AI Contact Center</h1>
                <p className="text-xs md:text-sm text-gray-500 hidden sm:block">Enterprise Customer Experience Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm text-gray-600">System Online</span>
              </div>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <nav className="px-4 md:px-6 hidden md:block">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 lg:px-6 py-3 transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm lg:text-base">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
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