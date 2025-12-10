import { useState } from 'react';
import {
  Phone,
  Plus,
  Edit,
  Trash2,
  Clock,
  Users,
  Hash,
  Play,
  ChevronRight,
  Settings,
} from 'lucide-react';

interface PhoneNumber {
  id: string;
  number: string;
  name: string;
  status: 'Active' | 'Inactive';
  assignedTo: string;
  callsToday: number;
}

interface RoutingRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
}

const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '+234 800 555 0100',
    name: 'Main Customer Support',
    status: 'Active',
    assignedTo: 'Customer Support Queue',
    callsToday: 342,
  },
  {
    id: '2',
    number: '+234 800 555 0101',
    name: 'Technical Support',
    status: 'Active',
    assignedTo: 'Technical Support Queue',
    callsToday: 156,
  },
  {
    id: '3',
    number: '+234 800 555 0102',
    name: 'Billing Department',
    status: 'Active',
    assignedTo: 'Billing Queue',
    callsToday: 98,
  },
  {
    id: '4',
    number: '+234 800 555 0103',
    name: 'VIP Customer Line',
    status: 'Active',
    assignedTo: 'VIP Agent Group',
    callsToday: 45,
  },
];

const mockRoutingRules: RoutingRule[] = [
  {
    id: '1',
    name: 'VIP Customer Priority',
    condition: 'Customer Tier = VIP',
    action: 'Route to VIP Agent Group',
    priority: 1,
    enabled: true,
  },
  {
    id: '2',
    name: 'Business Hours Routing',
    condition: 'Time between 9:00 AM - 5:00 PM',
    action: 'Route to Available Agents',
    priority: 2,
    enabled: true,
  },
  {
    id: '3',
    name: 'After Hours IVR',
    condition: 'Time outside 9:00 AM - 5:00 PM',
    action: 'Play after-hours message',
    priority: 3,
    enabled: true,
  },
  {
    id: '4',
    name: 'High Call Volume Overflow',
    condition: 'Queue wait time > 5 minutes',
    action: 'Offer callback option',
    priority: 4,
    enabled: true,
  },
  {
    id: '5',
    name: 'Spanish Language Support',
    condition: 'Language preference = Spanish',
    action: 'Route to Spanish-speaking agents',
    priority: 5,
    enabled: true,
  },
];

export function CallRoutingConfig() {
  const [activeTab, setActiveTab] = useState<'numbers' | 'routing' | 'ivr' | 'queues'>('numbers');
  const [phoneNumbers] = useState<PhoneNumber[]>(mockPhoneNumbers);
  const [routingRules] = useState<RoutingRule[]>(mockRoutingRules);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl text-gray-900 mb-1">Call Routing Configuration</h2>
        <p className="text-gray-500">Manage phone numbers, IVR flows, and routing rules</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('numbers')}
            className={`px-6 py-3 transition-colors relative ${
              activeTab === 'numbers'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Phone Numbers
            {activeTab === 'numbers' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('routing')}
            className={`px-6 py-3 transition-colors relative ${
              activeTab === 'routing'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Routing Rules
            {activeTab === 'routing' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('ivr')}
            className={`px-6 py-3 transition-colors relative ${
              activeTab === 'ivr'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            IVR Flow Builder
            {activeTab === 'ivr' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('queues')}
            className={`px-6 py-3 transition-colors relative ${
              activeTab === 'queues'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Queue Management
            {activeTab === 'queues' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Phone Numbers Tab */}
      {activeTab === 'numbers' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600">Total Numbers: </span>
                <span className="text-gray-900">{phoneNumbers.length}</span>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600">Active: </span>
                <span className="text-green-600">
                  {phoneNumbers.filter((n) => n.status === 'Active').length}
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Add Phone Number
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Calls Today
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {phoneNumbers.map((number) => (
                  <tr key={number.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-gray-900">{number.number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {number.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {number.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${
                          number.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {number.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {number.callsToday}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Routing Rules Tab */}
      {activeTab === 'routing' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Define conditions and actions for intelligent call routing
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Add Routing Rule
            </button>
          </div>

          <div className="space-y-4">
            {routingRules.map((rule) => (
              <div
                key={rule.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">
                        {rule.priority}
                      </div>
                      <h3 className="text-lg text-gray-900">{rule.name}</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rule.enabled}
                          className="sr-only peer"
                          readOnly
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Condition</p>
                        <div className="flex items-center gap-2 text-gray-900">
                          <Settings className="w-4 h-4 text-gray-400" />
                          <span>{rule.condition}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Action</p>
                        <div className="flex items-center gap-2 text-gray-900">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span>{rule.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IVR Flow Builder Tab */}
      {activeTab === 'ivr' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Design interactive voice response flows for automated call handling
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Create New Flow
            </button>
          </div>

          {/* Visual Flow Diagram */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center gap-6">
              {/* Start Node */}
              <div className="w-64 bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-green-900">Start</h4>
                    <p className="text-sm text-green-700">Incoming Call</p>
                  </div>
                </div>
              </div>

              <div className="w-0.5 h-8 bg-gray-300"></div>

              {/* Welcome Message */}
              <div className="w-64 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-900 mb-2">Welcome Message</h4>
                <p className="text-sm text-blue-700">
                  "Thank you for calling Helio. Your call may be recorded..."
                </p>
              </div>

              <div className="w-0.5 h-8 bg-gray-300"></div>

              {/* Main Menu */}
              <div className="w-64 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="text-purple-900 mb-2">Main Menu</h4>
                <div className="space-y-1 text-sm text-purple-700">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span>1 - Customer Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span>2 - Technical Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span>3 - Billing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span>0 - Speak to Operator</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <div className="w-48 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="text-yellow-900 mb-1">Queue</h4>
                    <p className="text-sm text-yellow-700">Customer Support</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <div className="w-48 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="text-yellow-900 mb-1">Queue</h4>
                    <p className="text-sm text-yellow-700">Technical Support</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <div className="w-48 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="text-yellow-900 mb-1">Queue</h4>
                    <p className="text-sm text-yellow-700">Billing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Queue Management Tab */}
      {activeTab === 'queues' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Configure call queues and wait time settings
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Create Queue
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              {
                name: 'Customer Support Queue',
                agents: 12,
                maxWait: '5 minutes',
                currentCalls: 8,
                waitingCalls: 3,
              },
              {
                name: 'Technical Support Queue',
                agents: 8,
                maxWait: '8 minutes',
                currentCalls: 5,
                waitingCalls: 2,
              },
              {
                name: 'Billing Queue',
                agents: 6,
                maxWait: '5 minutes',
                currentCalls: 4,
                waitingCalls: 1,
              },
              {
                name: 'VIP Queue',
                agents: 4,
                maxWait: '2 minutes',
                currentCalls: 2,
                waitingCalls: 0,
              },
            ].map((queue, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">{queue.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{queue.agents} agents assigned</span>
                    </div>
                  </div>
                  <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Calls</span>
                    <span className="text-gray-900">{queue.currentCalls}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Waiting in Queue</span>
                    <span className="text-yellow-600">{queue.waitingCalls}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Max Wait Time</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{queue.maxWait}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Queue Status</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}