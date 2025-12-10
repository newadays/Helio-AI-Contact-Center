import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Phone,
  Clock,
  CheckCircle,
  Smile,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const callVolumeData = [
  { time: '00:00', calls: 120 },
  { time: '02:00', calls: 80 },
  { time: '04:00', calls: 60 },
  { time: '06:00', calls: 150 },
  { time: '08:00', calls: 420 },
  { time: '10:00', calls: 580 },
  { time: '12:00', calls: 650 },
  { time: '14:00', calls: 720 },
  { time: '16:00', calls: 590 },
  { time: '18:00', calls: 380 },
  { time: '20:00', calls: 220 },
  { time: '22:00', calls: 150 },
];

const topCallReasons = [
  { reason: 'Account Access', count: 1456, percentage: 28 },
  { reason: 'Billing Inquiry', count: 1234, percentage: 24 },
  { reason: 'Technical Support', count: 987, percentage: 19 },
  { reason: 'Product Information', count: 765, percentage: 15 },
  { reason: 'Password Reset', count: 543, percentage: 10 },
  { reason: 'Other', count: 215, percentage: 4 },
];

const sentimentData = [
  { name: 'Positive', value: 65, color: '#10b981' },
  { name: 'Neutral', value: 25, color: '#f59e0b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const agentPerformance = [
  { name: 'Sarah Johnson', calls: 156, avgTime: '3:42', satisfaction: 4.8, resolved: 94 },
  { name: 'Michael Chen', calls: 148, avgTime: '4:15', satisfaction: 4.7, resolved: 92 },
  { name: 'Emily Rodriguez', calls: 142, avgTime: '3:58', satisfaction: 4.6, resolved: 89 },
  { name: 'David Kim', calls: 138, avgTime: '4:32', satisfaction: 4.5, resolved: 88 },
  { name: 'Lisa Anderson', calls: 135, avgTime: '4:05', satisfaction: 4.4, resolved: 86 },
];

const weeklyTrends = [
  { day: 'Mon', calls: 2340, resolved: 2105, avgTime: 245 },
  { day: 'Tue', calls: 2580, resolved: 2322, avgTime: 238 },
  { day: 'Wed', calls: 2720, resolved: 2448, avgTime: 252 },
  { day: 'Thu', calls: 2650, resolved: 2385, avgTime: 247 },
  { day: 'Fri', calls: 2890, resolved: 2601, avgTime: 241 },
  { day: 'Sat', calls: 1560, resolved: 1404, avgTime: 265 },
  { day: 'Sun', calls: 1280, resolved: 1152, avgTime: 272 },
];

export function InsightsDashboard() {
  const [dateRange, setDateRange] = useState('7days');

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 p-6">
      {/* Header Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-1">Analytics & Insights</h2>
          <p className="text-gray-500">Real-time contact center performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12%</span>
            </div>
          </div>
          <h3 className="text-2xl text-gray-900 mb-1">16,020</h3>
          <p className="text-sm text-gray-500">Total Calls</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>-8%</span>
            </div>
          </div>
          <h3 className="text-2xl text-gray-900 mb-1">4:12</h3>
          <p className="text-sm text-gray-500">Avg Handle Time</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+5%</span>
            </div>
          </div>
          <h3 className="text-2xl text-gray-900 mb-1">89.4%</h3>
          <p className="text-sm text-gray-500">First Call Resolution</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Smile className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+3%</span>
            </div>
          </div>
          <h3 className="text-2xl text-gray-900 mb-1">4.6/5.0</h3>
          <p className="text-sm text-gray-500">Customer Satisfaction</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Call Volume Over Time */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg text-gray-900 mb-1">Call Volume Trend</h3>
            <p className="text-sm text-gray-500">Hourly distribution over 24 hours</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg text-gray-900 mb-1">Sentiment Analysis</h3>
            <p className="text-sm text-gray-500">Customer emotion distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Weekly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg text-gray-900 mb-1">Weekly Performance</h3>
            <p className="text-sm text-gray-500">Calls vs. Resolved by day</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Call Reasons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg text-gray-900 mb-1">Top Call Reasons</h3>
            <p className="text-sm text-gray-500">Most common customer issues</p>
          </div>
          <div className="space-y-4">
            {topCallReasons.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{item.reason}</span>
                  <span className="text-sm text-gray-900">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Performance Leaderboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900 mb-1">Agent Performance Leaderboard</h3>
          <p className="text-sm text-gray-500">Top performing agents this week</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Agent Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Total Calls
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Avg Handle Time
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Resolution Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agentPerformance.map((agent, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                          idx === 0
                            ? 'bg-yellow-500'
                            : idx === 1
                            ? 'bg-gray-400'
                            : idx === 2
                            ? 'bg-orange-600'
                            : 'bg-gray-300'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-gray-900">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {agent.calls}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {agent.avgTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(agent.satisfaction)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{agent.satisfaction}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${agent.resolved}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{agent.resolved}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
