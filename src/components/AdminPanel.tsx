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

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50">
      <div className="flex h-[calc(100vh-140px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-gray-900 mb-4">Administration</h2>
            <nav className="space-y-1">
              <button
                onClick={() => setSelectedTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'users'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>User Management</span>
              </button>
              <button
                onClick={() => setSelectedTab('roles')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'roles'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Roles & Permissions</span>
              </button>
              <button
                onClick={() => setSelectedTab('departments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'departments'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Departments</span>
              </button>
              <button
                onClick={() => setSelectedTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'settings'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>System Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {selectedTab === 'users' && (
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl text-gray-900 mb-1">User Management</h2>
                <p className="text-gray-500">Manage agent accounts and permissions</p>
              </div>

              {/* Search and Actions */}
              <div className="mb-6 flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <UserPlus className="w-5 h-5" />
                  Add New Agent
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <p className="text-sm text-gray-500 mb-1">Total Agents</p>
                  <p className="text-2xl text-gray-900">{agents.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <p className="text-sm text-gray-500 mb-1">Active</p>
                  <p className="text-2xl text-green-600">
                    {agents.filter((a) => a.status === 'Active').length}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <p className="text-sm text-gray-500 mb-1">Inactive</p>
                  <p className="text-2xl text-gray-600">
                    {agents.filter((a) => a.status === 'Inactive').length}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <p className="text-sm text-gray-500 mb-1">Departments</p>
                  <p className="text-2xl text-gray-900">4</p>
                </div>
              </div>

              {/* Agents Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Agent
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Extension
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Hire Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAgents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-gray-900">{agent.name}</div>
                                <div className="text-sm text-gray-500">{agent.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {agent.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {agent.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-gray-900">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {agent.extension}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
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
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {agent.hireDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
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
            </div>
          )}

          {selectedTab === 'roles' && (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl text-gray-900 mb-1">Roles & Permissions</h2>
                <p className="text-gray-500">Define user roles and access levels</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {['Administrator', 'Team Lead', 'Senior Agent', 'Agent', 'Read Only'].map((role, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg text-gray-900">{role}</h3>
                      <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        View dashboards
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Handle calls
                      </div>
                      {idx <= 2 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          View reports
                        </div>
                      )}
                      {idx <= 1 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Manage team
                        </div>
                      )}
                      {idx === 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          System admin
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'departments' && (
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl text-gray-900 mb-1">Departments</h2>
                  <p className="text-gray-500">Organize teams and workgroups</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  Add Department
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'Customer Support', agents: 12, lead: 'Ngozi Okafor' },
                  { name: 'Technical Support', agents: 8, lead: 'Emeka Nwankwo' },
                  { name: 'Billing', agents: 6, lead: 'Tunde Bakare' },
                  { name: 'Sales', agents: 10, lead: 'Funmi Adeyemi' },
                ].map((dept, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg text-gray-900 mb-1">{dept.name}</h3>
                        <p className="text-sm text-gray-500">{dept.agents} agents</p>
                      </div>
                      <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">Team Lead</p>
                      <p className="text-gray-900">{dept.lead}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl text-gray-900 mb-1">System Settings</h2>
                <p className="text-gray-500">Configure contact center preferences</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Operating Hours</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>24/7</option>
                        <option>9 AM - 5 PM</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Call Recording</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">Enable call recording by default</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">Announce recording to customers</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">Require supervisor approval to pause recording</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg text-gray-900 mb-4">AI & Analytics</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">Enable real-time sentiment analysis</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">Show AI recommendations to agents</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">Enable fraud detection alerts</span>
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