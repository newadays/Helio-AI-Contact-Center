import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  Pause,
  Mic,
  MicOff,
  PhoneForwarded,
  Calendar,
  Clock,
  Circle,
  Mail,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Save,
  ChevronDown,
  ChevronRight,
  Smile,
  Meh,
  Frown,
  AlertCircle,
  User,
  MapPin,
  Hash,
  Shield,
  Star,
} from 'lucide-react';
import { mockCustomers, mockInteractions } from '../utils/mockData';

export function AgentDashboard() {
  const [activeCustomer, setActiveCustomer] = useState(mockCustomers[0]);
  const [callStatus, setCallStatus] = useState<'incoming' | 'active' | 'on-hold' | 'transferred'>('active');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [expandedInteractions, setExpandedInteractions] = useState<Set<string>>(new Set());
  const [mobileView, setMobileView] = useState<'call' | 'customer'>('call');
  const [transcript, setTranscript] = useState<Array<{ speaker: string; text: string; timestamp: string }>>([
    { speaker: 'Customer', text: "Hi, I'm having trouble accessing my account online.", timestamp: '14:32:15' },
    { speaker: 'Agent', text: 'I understand. Let me help you with that. Can you tell me what error message you\'re seeing?', timestamp: '14:32:22' },
    { speaker: 'Customer', text: "It says my password is incorrect, but I'm sure it's right.", timestamp: '14:32:35' },
    { speaker: 'Agent', text: 'I see. Let me check your account status first to make sure everything is in order.', timestamp: '14:32:45' },
    { speaker: 'Customer', text: 'Okay, thank you.', timestamp: '14:32:50' },
    { speaker: 'Agent', text: 'I can see your account is active. Would you like me to send you a password reset link to your registered email?', timestamp: '14:33:05' },
  ]);
  
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Call timer
  useEffect(() => {
    if (callStatus === 'active') {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [callStatus]);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleInteraction = (id: string) => {
    const newExpanded = new Set(expandedInteractions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedInteractions(newExpanded);
  };

  const customerInteractions = mockInteractions.filter(
    (i) => i.customerId === activeCustomer.id
  );

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'neutral':
        return 'text-yellow-600';
      case 'negative':
        return 'text-orange-600';
      case 'frustrated':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-4 h-4 md:w-5 md:h-5" />;
      case 'neutral':
        return <Meh className="w-4 h-4 md:w-5 md:h-5" />;
      case 'negative':
      case 'frustrated':
        return <Frown className="w-4 h-4 md:w-5 md:h-5" />;
      default:
        return <Meh className="w-4 h-4 md:w-5 md:h-5" />;
    }
  };

  const getSentimentPosition = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '10%';
      case 'neutral':
        return '50%';
      case 'negative':
        return '75%';
      case 'frustrated':
        return '90%';
      default:
        return '50%';
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] md:h-[calc(100vh-140px)] bg-gray-50 p-3 md:p-6">
      {/* Mobile View Toggle */}
      <div className="lg:hidden mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex gap-1">
        <button
          onClick={() => setMobileView('call')}
          className={`flex-1 py-2.5 px-4 rounded-md transition-colors ${
            mobileView === 'call'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Call Controls
        </button>
        <button
          onClick={() => setMobileView('customer')}
          className={`flex-1 py-2.5 px-4 rounded-md transition-colors ${
            mobileView === 'customer'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Customer Info
        </button>
      </div>

      <div className="h-full flex flex-col lg:flex-row gap-3 md:gap-6">
        {/* Left Panel - Live Call Information */}
        <div className={`${mobileView === 'call' ? 'flex' : 'hidden'} lg:flex lg:w-[40%] flex-col gap-3 md:gap-4`}>
          {/* Call Status Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  callStatus === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Phone className={`w-5 h-5 md:w-6 md:h-6 ${callStatus === 'active' ? 'text-blue-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base md:text-lg text-gray-900 truncate">{activeCustomer.name}</h3>
                    {activeCustomer.tier === 'VIP' && (
                      <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 truncate">{activeCustomer.phone}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                  <Circle className={`w-2 h-2 ${callStatus === 'active' ? 'fill-blue-600 text-blue-600 animate-pulse' : 'fill-gray-400 text-gray-400'}`} />
                  <span className="text-xs md:text-sm text-gray-600 capitalize">{callStatus}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-900">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-base md:text-lg tabular-nums">{formatTime(callDuration)}</span>
                </div>
              </div>
            </div>

            {/* Call Actions */}
            <div className="grid grid-cols-3 gap-2 mb-3 md:mb-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2.5 md:py-3 rounded-lg border transition-colors ${
                  isMuted
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span className="text-xs md:text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              <button
                onClick={() => setCallStatus(callStatus === 'on-hold' ? 'active' : 'on-hold')}
                className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2.5 md:py-3 rounded-lg border transition-colors ${
                  callStatus === 'on-hold'
                    ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Pause className="w-4 h-4" />
                <span className="text-xs md:text-sm">{callStatus === 'on-hold' ? 'Resume' : 'Hold'}</span>
              </button>
              <button className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                <PhoneForwarded className="w-4 h-4" />
                <span className="text-xs md:text-sm">Transfer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-xs md:text-sm">Schedule</span>
              </button>
              <button className="flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2.5 md:py-3 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
                <PhoneOff className="w-4 h-4" />
                <span className="text-xs md:text-sm">End Call</span>
              </button>
            </div>

            {/* Recording Status */}
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200 flex items-center gap-2 text-xs md:text-sm text-gray-600">
              <Circle className="w-2 h-2 fill-red-600 text-red-600 animate-pulse" />
              <span>Recording in progress</span>
            </div>
          </div>

          {/* Live Transcript */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col min-h-[300px] lg:min-h-0">
            <div className="p-3 md:p-4 border-b border-gray-200">
              <h3 className="text-base md:text-lg text-gray-900">Live Transcript</h3>
              <p className="text-xs md:text-sm text-gray-500">Real-time speech-to-text</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3">
              {transcript.map((entry, idx) => (
                <div key={idx} className={`flex gap-2 md:gap-3 ${entry.speaker === 'Agent' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs md:text-sm ${
                    entry.speaker === 'Agent' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {entry.speaker[0]}
                  </div>
                  <div className={`flex-1 ${entry.speaker === 'Agent' ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-1.5 md:gap-2 mb-1 ${entry.speaker === 'Agent' ? 'justify-end' : ''}`}>
                      <span className="text-xs md:text-sm text-gray-900">{entry.speaker}</span>
                      <span className="text-xs text-gray-400">{entry.timestamp}</span>
                    </div>
                    <div className={`inline-block px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm ${
                      entry.speaker === 'Agent'
                        ? 'bg-blue-100 text-gray-900'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {entry.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          </div>

          {/* Notes Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-3 md:p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-base md:text-lg text-gray-900">Call Notes</h3>
                <p className="text-xs md:text-sm text-gray-500">Auto-saved</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Save className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your notes here..."
              className="w-full p-3 md:p-4 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
              rows={4}
            />
          </div>
        </div>

        {/* Right Panel - Customer Details */}
        <div className={`${mobileView === 'customer' ? 'flex' : 'hidden'} lg:flex lg:w-[60%] flex-col gap-3 md:gap-4`}>
          {/* Customer Context Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 md:mb-6 gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-lg md:text-xl text-gray-900">{activeCustomer.name}</h2>
                  <span className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs ${
                    activeCustomer.tier === 'VIP'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {activeCustomer.tier}
                  </span>
                  <span className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs ${
                    activeCustomer.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {activeCustomer.status}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-500">Customer since {activeCustomer.memberSince}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <Hash className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-500">Account Number</p>
                    <p className="text-sm md:text-base text-gray-900 truncate">{activeCustomer.accountNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-500">Phone Number</p>
                    <p className="text-sm md:text-base text-gray-900 truncate">{activeCustomer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-500">Email</p>
                    <p className="text-sm md:text-base text-gray-900 break-all">{activeCustomer.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-500">Address</p>
                    <p className="text-sm md:text-base text-gray-900">{activeCustomer.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Issue */}
            <div className="p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-xs md:text-sm text-blue-900 mb-2">Current Issue (AI-Generated from IVR)</h4>
              <p className="text-xs md:text-sm text-blue-800">{activeCustomer.currentIssue}</p>
            </div>
          </div>

          {/* Sentiment & Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* Sentiment Indicator */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 className="text-base md:text-lg text-gray-900 mb-3 md:mb-4">Customer Sentiment</h3>
              <div className="flex items-center justify-center mb-3 md:mb-4">
                <div className={`${getSentimentColor(activeCustomer.sentiment)}`}>
                  {getSentimentIcon(activeCustomer.sentiment)}
                </div>
              </div>
              <div className="relative h-2.5 md:h-3 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full mb-2">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 bg-white border-2 border-gray-800 rounded-full shadow-lg transition-all"
                  style={{ left: getSentimentPosition(activeCustomer.sentiment) }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Positive</span>
                <span>Neutral</span>
                <span>Negative</span>
              </div>
              <p className="text-center text-xs md:text-sm text-gray-600 mt-2 md:mt-3 capitalize">{activeCustomer.sentiment}</p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 className="text-base md:text-lg text-gray-900 mb-3 md:mb-4">Customer Stats</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600">Total Interactions</span>
                  <span className="text-sm md:text-base text-gray-900">{customerInteractions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600">Resolved Issues</span>
                  <span className="text-sm md:text-base text-green-600">{customerInteractions.filter(i => i.status === 'Resolved').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600">Avg. Resolution Time</span>
                  <span className="text-sm md:text-base text-gray-900">4.2 mins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600">Last Contact</span>
                  <span className="text-sm md:text-base text-gray-900">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <h3 className="text-base md:text-lg text-gray-900">AI-Powered Recommendations</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              {activeCustomer.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-3 md:p-4 rounded-lg border ${
                    rec.type === 'fraud'
                      ? 'bg-red-50 border-red-200'
                      : rec.type === 'upsell'
                      ? 'bg-green-50 border-green-200'
                      : rec.type === 'escalation'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    {rec.type === 'fraud' && <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600 mt-0.5 flex-shrink-0" />}
                    {rec.type === 'upsell' && <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600 mt-0.5 flex-shrink-0" />}
                    {rec.type === 'escalation' && <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600 mt-0.5 flex-shrink-0" />}
                    {rec.type === 'response' && <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs md:text-sm mb-1 ${
                        rec.type === 'fraud'
                          ? 'text-red-900'
                          : rec.type === 'upsell'
                          ? 'text-green-900'
                          : rec.type === 'escalation'
                          ? 'text-orange-900'
                          : 'text-blue-900'
                      }`}>
                        {rec.title}
                      </h4>
                      <p className={`text-xs md:text-sm ${
                        rec.type === 'fraud'
                          ? 'text-red-700'
                          : rec.type === 'upsell'
                          ? 'text-green-700'
                          : rec.type === 'escalation'
                          ? 'text-orange-700'
                          : 'text-blue-700'
                      }`}>
                        {rec.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interaction History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col min-h-[300px] lg:min-h-0">
            <div className="p-3 md:p-4 border-b border-gray-200">
              <h3 className="text-base md:text-lg text-gray-900">Interaction History</h3>
              <p className="text-xs md:text-sm text-gray-500">{customerInteractions.length} previous interactions</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 md:p-4">
              <div className="space-y-2 md:space-y-3">
                {customerInteractions.map((interaction) => (
                  <div key={interaction.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleInteraction(interaction.id)}
                      className="w-full p-3 md:p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            interaction.channel === 'phone'
                              ? 'bg-blue-100'
                              : interaction.channel === 'email'
                              ? 'bg-purple-100'
                              : 'bg-green-100'
                          }`}>
                            {interaction.channel === 'phone' && <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />}
                            {interaction.channel === 'email' && <Mail className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />}
                            {interaction.channel === 'chat' && <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-green-600" />}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-sm md:text-base text-gray-900">{interaction.category}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                interaction.status === 'Resolved'
                                  ? 'bg-green-100 text-green-700'
                                  : interaction.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {interaction.status}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm text-gray-500">{interaction.date} • {interaction.duration}</p>
                          </div>
                          {expandedInteractions.has(interaction.id) ? (
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </button>
                    {expandedInteractions.has(interaction.id) && (
                      <div className="px-3 md:px-4 pb-3 md:pb-4 bg-gray-50 border-t border-gray-200">
                        <div className="mt-3 space-y-2">
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Agent</p>
                            <p className="text-sm md:text-base text-gray-900">{interaction.agent}</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Summary</p>
                            <p className="text-sm md:text-base text-gray-900">{interaction.summary}</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Notes</p>
                            <p className="text-sm md:text-base text-gray-700">{interaction.notes}</p>
                          </div>
                          {interaction.resolution && (
                            <div>
                              <p className="text-xs md:text-sm text-gray-500">Resolution</p>
                              <p className="text-sm md:text-base text-gray-900">{interaction.resolution}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
