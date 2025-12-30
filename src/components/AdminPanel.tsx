import { useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Shield,
  Users,
  Settings,
  Phone,
  Menu,
  X,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  extension: string;
  hireDate: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Funmi Adeyemi',
    email: 'funmi.adeyemi@helio.com',
    role: 'Senior Agent',
    department: 'Customer Support',
    status: 'Active',
    extension: '1001',
    hireDate: '2022-01-15',
  },
  {
    id: '2',
    name: 'Emeka Nwankwo',
    email: 'emeka.nwankwo@helio.com',
    role: 'Agent',
    department: 'Technical Support',
    status: 'Active',
    extension: '1002',
    hireDate: '2022-03-20',
  },
  {
    id: '3',
    name: 'Ngozi Okafor',
    email: 'ngozi.okafor@helio.com',
    role: 'Team Lead',
    department: 'Customer Support',
    status: 'Active',
    extension: '1003',
    hireDate: '2021-08-10',
  },
  {
    id: '4',
    name: 'Tunde Bakare',
    email: 'tunde.bakare@helio.com',
    role: 'Agent',
    department: 'Billing',
    status: 'Active',
    extension: '1004',
    hireDate: '2023-02-05',
  },
  {
    id: '5',
    name: 'Chioma Eze',
    email: 'chioma.eze@helio.com',
    role: 'Senior Agent',
    department: 'Technical Support',
    status: 'Inactive',
    extension: '1005',
    hireDate: '2022-06-12',
  },
];

export function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [agents] = useState<Agent[]>(mockAgents);
  const [selectedTab, setSelectedTab] = useState<'users' | 'roles' | 'departments' | 'settings'>('users');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TabButton = ({ tab, icon: Icon, label }: { tab: typeof selectedTab; icon: typeof Users; label: string }) => (
    <button
      onClick={() => {
        setSelectedTab(tab);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        selectedTab === tab
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50">
      <div className="flex h-auto lg:h-[calc(100vh-140px)]">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static
          inset-y-0 left-0
          z-40
          w-64
          bg-white
          border-r border-gray-200
          transition-transform duration-200
          lg:transition-none
        `}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg text-gray-900">Administration</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <nav className="space-y-1">
              <TabButton tab="users" icon={Users} label="User Management" />
              <TabButton tab="roles" icon={Shield} label="Roles & Permissions" />
              <TabButton tab="departments" icon={Users} label="Departments" />
              <TabButton tab="settings" icon={Settings} label="System Settings" />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {selectedTab === 'users' && (
            <div className="p-4 md:p-6">
              {/* Header */}
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl text-gray-900 mb-1">User Management</h2>
                <p className="text-sm md:text-base text-gray-500">Manage agent accounts and permissions</p>
              </div>

              {/* Search and Actions */}
              <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                  <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
                  Add New Agent
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Total Agents</p>
                  <p className="text-xl md:text-2xl text-gray-900">{agents.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Active</p>
                  <p className="text-xl md:text-2xl text-green-600">
                    {agents.filter((a) => a.status === 'Active').length}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Inactive</p>
                  <p className="text-xl md:text-2xl text-gray-600">
                    {agents.filter((a) => a.status === 'Inactive').length}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Departments</p>
                  <p className="text-xl md:text-2xl text-gray-900">4</p>
                </div>
              </div>

              {/* Agents Table - Desktop */}
              <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Agent
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Extension
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Hire Date
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAgents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mr-3 flex-shrink-0">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm md:text-base text-gray-900 truncate">{agent.name}</div>
                                <div className="text-xs md:text-sm text-gray-500 truncate">{agent.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-900">
                            {agent.role}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-900">
                            {agent.department}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm md:text-base text-gray-900">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {agent.extension}
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                                agent.status === 'Active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {agent.status === 'Active' ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <XCircle className="w-3 h-3" />
                              )}
                              {agent.status}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-900">
                            {agent.hireDate}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Agents Cards - Mobile */}
              <div className="md:hidden space-y-3">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm flex-shrink-0">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 truncate">{agent.name}</h3>
                          <p className="text-sm text-gray-500 truncate">{agent.email}</p>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs mt-2 ${
                              agent.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {agent.status === 'Active' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {agent.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Role</p>
                        <p className="text-gray-900">{agent.role}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Department</p>
                        <p className="text-gray-900">{agent.department}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Extension</p>
                        <div className="flex items-center gap-1 text-gray-900">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {agent.extension}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500">Hire Date</p>
                        <p className="text-gray-900">{agent.hireDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'roles' && (
            <div className="p-4 md:p-6">
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl text-gray-900 mb-1">Roles & Permissions</h2>
                <p className="text-sm md:text-base text-gray-500">Define user roles and access levels</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {['Administrator', 'Team Lead', 'Senior Agent', 'Agent', 'Read Only'].map((role, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base md:text-lg text-gray-900">{role}</h3>
                      <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>View dashboards</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Handle calls</span>
                      </div>
                      {idx <= 2 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>View reports</span>
                        </div>
                      )}
                      {idx <= 1 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>Manage team</span>
                        </div>
                      )}
                      {idx === 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>System admin</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'departments' && (
            <div className="p-4 md:p-6">
              <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl text-gray-900 mb-1">Departments</h2>
                  <p className="text-sm md:text-base text-gray-500">Organize teams and workgroups</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  Add Department
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { name: 'Customer Support', agents: 12, lead: 'Ngozi Okafor' },
                  { name: 'Technical Support', agents: 8, lead: 'Emeka Nwankwo' },
                  { name: 'Billing', agents: 6, lead: 'Tunde Bakare' },
                  { name: 'Sales', agents: 10, lead: 'Funmi Adeyemi' },
                ].map((dept, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-base md:text-lg text-gray-900 mb-1">{dept.name}</h3>
                        <p className="text-sm text-gray-500">{dept.agents} agents</p>
                      </div>
                      <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">Team Lead</p>
                      <p className="text-sm md:text-base text-gray-900">{dept.lead}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="p-4 md:p-6">
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl text-gray-900 mb-1">System Settings</h2>
                <p className="text-sm md:text-base text-gray-500">Configure contact center preferences</p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                  <h3 className="text-base md:text-lg text-gray-900 mb-4">Business Hours</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>West Africa Time (WAT)</option>
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Operating Hours</label>
                      <select className="w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>24/7</option>
                        <option>9 AM - 5 PM</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                  <h3 className="text-base md:text-lg text-gray-900 mb-4">Call Recording</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm md:text-base text-gray-700">Enable call recording by default</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm md:text-base text-gray-700">Announce recording to customers</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm md:text-base text-gray-700">Require supervisor approval to pause recording</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                  <h3 className="text-base md:text-lg text-gray-900 mb-4">AI & Analytics</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm md:text-base text-gray-700">Enable real-time sentiment analysis</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm md:text-base text-gray-700">Show AI recommendations to agents</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm md:text-base text-gray-700">Enable fraud detection alerts</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
