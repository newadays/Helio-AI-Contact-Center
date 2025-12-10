export interface Customer {
  id: string;
  name: string;
  accountNumber: string;
  phone: string;
  email: string;
  address: string;
  tier: 'VIP' | 'Standard';
  status: 'Active' | 'Inactive';
  memberSince: string;
  currentIssue: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated';
  recommendations: Array<{
    type: 'fraud' | 'upsell' | 'escalation' | 'response';
    title: string;
    message: string;
  }>;
}

export interface Interaction {
  id: string;
  customerId: string;
  date: string;
  time: string;
  channel: 'phone' | 'email' | 'chat';
  category: string;
  status: 'Resolved' | 'Pending' | 'Escalated';
  agent: string;
  duration: string;
  summary: string;
  notes: string;
  resolution?: string;
}

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Robert Martinez',
    accountNumber: 'ACC-2847593',
    phone: '+1 (555) 123-4567',
    email: 'robert.martinez@email.com',
    address: '742 Evergreen Terrace, Springfield, IL 62701',
    tier: 'VIP',
    status: 'Active',
    memberSince: 'March 2019',
    currentIssue: 'Customer unable to access online account. Reports password reset not working. Multiple failed login attempts detected.',
    sentiment: 'neutral',
    recommendations: [
      {
        type: 'response',
        title: 'Suggested Response',
        message: 'Offer to manually reset the password and send a temporary access link via email. Verify identity using security questions.',
      },
      {
        type: 'upsell',
        title: 'Upsell Opportunity',
        message: 'Customer is eligible for premium account features with enhanced security. Consider mentioning two-factor authentication.',
      },
    ],
  },
  {
    id: '2',
    name: 'Jennifer Thompson',
    accountNumber: 'ACC-1923847',
    phone: '+1 (555) 987-6543',
    email: 'jennifer.thompson@email.com',
    address: '123 Oak Avenue, Portland, OR 97201',
    tier: 'Standard',
    status: 'Active',
    memberSince: 'August 2021',
    currentIssue: 'Billing dispute regarding last month\'s charges. Customer claims unauthorized transaction of $49.99.',
    sentiment: 'frustrated',
    recommendations: [
      {
        type: 'fraud',
        title: 'Fraud Alert',
        message: 'Multiple chargebacks detected in the past 90 days. Verify transaction details carefully and consider security review.',
      },
      {
        type: 'escalation',
        title: 'Escalation Recommended',
        message: 'Customer sentiment is negative and issue involves financial dispute. Consider transferring to supervisor if not resolved quickly.',
      },
      {
        type: 'response',
        title: 'Suggested Response',
        message: 'Review transaction history, explain the charge, and offer refund if error is confirmed. Document all details for fraud prevention team.',
      },
    ],
  },
  {
    id: '3',
    name: 'Michael Chang',
    accountNumber: 'ACC-3928475',
    phone: '+1 (555) 246-8135',
    email: 'michael.chang@email.com',
    address: '456 Pine Street, Seattle, WA 98101',
    tier: 'VIP',
    status: 'Active',
    memberSince: 'January 2018',
    currentIssue: 'General inquiry about upgrading service plan. Interested in enterprise features.',
    sentiment: 'positive',
    recommendations: [
      {
        type: 'upsell',
        title: 'Upsell Opportunity - High Priority',
        message: 'Customer has excellent payment history and is actively seeking premium services. Present enterprise plan with 20% loyalty discount.',
      },
      {
        type: 'response',
        title: 'Suggested Response',
        message: 'Highlight enterprise features: priority support, dedicated account manager, advanced analytics, and custom integrations.',
      },
    ],
  },
];

export const mockInteractions: Interaction[] = [
  {
    id: '1',
    customerId: '1',
    date: '2024-12-08',
    time: '14:23',
    channel: 'phone',
    category: 'Technical Support',
    status: 'Resolved',
    agent: 'Sarah Johnson',
    duration: '8m 34s',
    summary: 'Mobile app sync issues',
    notes: 'Customer reported that mobile app was not syncing with web portal. Troubleshooting steps performed: cleared cache, reinstalled app, verified account settings.',
    resolution: 'Issue resolved by logging out and back in. App now syncing correctly. Customer confirmed resolution.',
  },
  {
    id: '2',
    customerId: '1',
    date: '2024-12-05',
    time: '10:15',
    channel: 'email',
    category: 'Billing Inquiry',
    status: 'Resolved',
    agent: 'David Kim',
    duration: 'N/A',
    summary: 'Question about annual subscription renewal',
    notes: 'Customer inquired about auto-renewal settings and payment method on file. Provided detailed explanation of renewal process.',
    resolution: 'Sent comprehensive email explaining renewal process. Updated payment method per customer request.',
  },
  {
    id: '3',
    customerId: '1',
    date: '2024-11-28',
    time: '16:45',
    channel: 'chat',
    category: 'Account Access',
    status: 'Resolved',
    agent: 'Emily Rodriguez',
    duration: '12m 18s',
    summary: 'Password reset assistance',
    notes: 'Customer forgot password and security question answer. Verified identity through alternative method (email confirmation code).',
    resolution: 'Password successfully reset. Customer able to access account. Recommended setting up 2FA.',
  },
  {
    id: '4',
    customerId: '2',
    date: '2024-12-09',
    time: '09:30',
    channel: 'phone',
    category: 'Billing Dispute',
    status: 'Pending',
    agent: 'Michael Chen',
    duration: '15m 42s',
    summary: 'Dispute regarding $49.99 charge',
    notes: 'Customer claims charge is unauthorized. Reviewed transaction history - charge is for premium feature upgrade made on 11/15. Customer does not recall making this purchase.',
    resolution: 'Escalated to fraud prevention team for review. Temporary credit issued while investigation is ongoing.',
  },
  {
    id: '5',
    customerId: '2',
    date: '2024-11-15',
    time: '13:20',
    channel: 'phone',
    category: 'Product Inquiry',
    status: 'Resolved',
    agent: 'Sarah Johnson',
    duration: '6m 15s',
    summary: 'Information about premium features',
    notes: 'Customer asked about premium plan benefits. Explained features and pricing.',
    resolution: 'Customer upgraded to premium plan during call. Confirmation email sent.',
  },
  {
    id: '6',
    customerId: '3',
    date: '2024-12-07',
    time: '11:00',
    channel: 'email',
    category: 'General Inquiry',
    status: 'Resolved',
    agent: 'Lisa Anderson',
    duration: 'N/A',
    summary: 'Enterprise plan details requested',
    notes: 'VIP customer inquired about enterprise features and pricing. Sent detailed proposal with custom quote.',
    resolution: 'Provided comprehensive enterprise plan documentation. Scheduled follow-up call with account manager.',
  },
];
