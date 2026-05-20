import { Users, Activity, ShieldCheck, Zap } from 'lucide-react';
import type { MetricCard, ActivityItem, User, RevenueSeries, TrafficSource, OrderSeries } from './types';

export function getMetrics(): MetricCard[] {
  return [
    { id: 'total-users', title: 'Total Users', value: '4,821', delta: 12.4, icon: Users },
    { id: 'active-sessions', title: 'Active Sessions', value: '318', delta: -3.1, icon: Activity },
    { id: 'uptime', title: 'Uptime', value: '99.97%', delta: 0.02, icon: Zap },
    { id: 'issues', title: 'Open Issues', value: '7', delta: -42.0, icon: ShieldCheck },
  ];
}

export function getRecentActivity(): ActivityItem[] {
  return [
    { id: '1', user: 'Alice Chen', action: 'invited', target: 'bob@example.com', timestamp: '2 min ago', status: 'success' },
    { id: '2', user: 'Bob Markus', action: 'updated settings', target: 'Notifications', timestamp: '14 min ago', status: 'active' },
    { id: '3', user: 'System', action: 'deployment failed', target: 'v2.4.1', timestamp: '1 hr ago', status: 'error' },
    { id: '4', user: 'Carol Smith', action: 'exported', target: 'users-2026-05.csv', timestamp: '3 hr ago', status: 'success' },
    { id: '5', user: 'Dave Lin', action: 'submitted review', target: 'PR #84', timestamp: '5 hr ago', status: 'pending' },
    { id: '6', user: 'Eve Torres', action: 'deactivated account', target: 'guest_4421', timestamp: 'Yesterday', status: 'inactive' },
    { id: '7', user: 'Frank Osei', action: 'upgraded plan', target: 'Pro', timestamp: 'Yesterday', status: 'success' },
    { id: '8', user: 'Grace Kim', action: 'reset password', target: 'grace@example.com', timestamp: '2 days ago', status: 'active' },
  ];
}

export function getRevenueSeries(): RevenueSeries[] {
  return [
    { month: 'Jun', revenue: 28400, target: 30000 },
    { month: 'Jul', revenue: 33100, target: 32000 },
    { month: 'Aug', revenue: 31200, target: 32000 },
    { month: 'Sep', revenue: 37800, target: 35000 },
    { month: 'Oct', revenue: 41200, target: 38000 },
    { month: 'Nov', revenue: 39500, target: 40000 },
    { month: 'Dec', revenue: 52300, target: 45000 },
    { month: 'Jan', revenue: 44100, target: 46000 },
    { month: 'Feb', revenue: 48700, target: 48000 },
    { month: 'Mar', revenue: 53900, target: 50000 },
    { month: 'Apr', revenue: 57200, target: 53000 },
    { month: 'May', revenue: 61400, target: 58000 },
  ];
}

export function getTrafficBySource(): TrafficSource[] {
  return [
    { source: 'Organic', visitors: 14320 },
    { source: 'Direct', visitors: 9870 },
    { source: 'Referral', visitors: 6540 },
    { source: 'Social', visitors: 4210 },
    { source: 'Email', visitors: 2980 },
  ];
}

export function getOrdersSeries(): OrderSeries[] {
  const base = [
    42, 38, 55, 47, 60, 58, 72, 65, 80, 74,
    69, 83, 78, 91, 88, 95, 102, 97, 110, 104,
    99, 115, 108, 121, 118, 130, 124, 138, 132, 145,
  ];
  return base.map((orders, i) => {
    const date = new Date(2026, 3, i + 20); // Apr 20 – May 19
    return {
      day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      orders,
    };
  });
}

export function getUsers(): User[] {
  return [
    { id: 'u01', name: 'Alice Chen', email: 'alice@example.com', role: 'admin', status: 'active', joinedAt: '2024-01-10', createdAt: '2024-01-10' },
    { id: 'u02', name: 'Bob Markus', email: 'bob@example.com', role: 'editor', status: 'active', joinedAt: '2024-03-22', createdAt: '2024-03-22' },
    { id: 'u03', name: 'Carol Smith', email: 'carol@example.com', role: 'viewer', status: 'inactive', joinedAt: '2024-06-01', createdAt: '2024-06-01' },
    { id: 'u04', name: 'Dave Lin', email: 'dave@example.com', role: 'editor', status: 'invited', joinedAt: '2025-01-15', createdAt: '2025-01-15' },
    { id: 'u05', name: 'Eve Torres', email: 'eve@example.com', role: 'viewer', status: 'active', joinedAt: '2025-03-08', createdAt: '2025-03-08' },
    { id: 'u06', name: 'Frank Osei', email: 'frank@example.com', role: 'editor', status: 'active', joinedAt: '2025-03-15', createdAt: '2025-03-15' },
    { id: 'u07', name: 'Grace Kim', email: 'grace@example.com', role: 'viewer', status: 'suspended', joinedAt: '2025-04-02', createdAt: '2025-04-02' },
    { id: 'u08', name: 'Hiro Tanaka', email: 'hiro@example.com', role: 'admin', status: 'active', joinedAt: '2024-11-20', createdAt: '2024-11-20' },
    { id: 'u09', name: 'Isla Nguyen', email: 'isla@example.com', role: 'viewer', status: 'invited', joinedAt: '2025-05-01', createdAt: '2025-05-01' },
    { id: 'u10', name: 'Jake Rivera', email: 'jake@example.com', role: 'editor', status: 'active', joinedAt: '2024-08-14', createdAt: '2024-08-14' },
    { id: 'u11', name: 'Kira Patel', email: 'kira@example.com', role: 'viewer', status: 'active', joinedAt: '2024-09-30', createdAt: '2024-09-30' },
    { id: 'u12', name: 'Leo Dubois', email: 'leo@example.com', role: 'editor', status: 'inactive', joinedAt: '2024-07-18', createdAt: '2024-07-18' },
    { id: 'u13', name: 'Mia Johansson', email: 'mia@example.com', role: 'viewer', status: 'active', joinedAt: '2025-02-09', createdAt: '2025-02-09' },
    { id: 'u14', name: 'Nolan Park', email: 'nolan@example.com', role: 'editor', status: 'active', joinedAt: '2025-01-28', createdAt: '2025-01-28' },
    { id: 'u15', name: 'Olivia Brown', email: 'olivia@example.com', role: 'admin', status: 'active', joinedAt: '2024-02-14', createdAt: '2024-02-14' },
    { id: 'u16', name: 'Pedro Santos', email: 'pedro@example.com', role: 'viewer', status: 'suspended', joinedAt: '2024-12-05', createdAt: '2024-12-05' },
    { id: 'u17', name: 'Quinn Lee', email: 'quinn@example.com', role: 'editor', status: 'active', joinedAt: '2025-04-17', createdAt: '2025-04-17' },
    { id: 'u18', name: 'Rosa Müller', email: 'rosa@example.com', role: 'viewer', status: 'invited', joinedAt: '2025-05-10', createdAt: '2025-05-10' },
    { id: 'u19', name: 'Sam Okafor', email: 'sam@example.com', role: 'editor', status: 'active', joinedAt: '2024-10-22', createdAt: '2024-10-22' },
    { id: 'u20', name: 'Tanya Volkov', email: 'tanya@example.com', role: 'viewer', status: 'inactive', joinedAt: '2024-05-30', createdAt: '2024-05-30' },
    { id: 'u21', name: 'Uma Iyer', email: 'uma@example.com', role: 'editor', status: 'active', joinedAt: '2025-03-25', createdAt: '2025-03-25' },
    { id: 'u22', name: 'Vic Larsson', email: 'vic@example.com', role: 'viewer', status: 'active', joinedAt: '2025-02-18', createdAt: '2025-02-18' },
    { id: 'u23', name: 'Wren Nakamura', email: 'wren@example.com', role: 'admin', status: 'active', joinedAt: '2024-04-07', createdAt: '2024-04-07' },
    { id: 'u24', name: 'Xia Feng', email: 'xia@example.com', role: 'editor', status: 'invited', joinedAt: '2025-05-14', createdAt: '2025-05-14' },
    { id: 'u25', name: 'Yael Cohen', email: 'yael@example.com', role: 'viewer', status: 'active', joinedAt: '2025-01-03', createdAt: '2025-01-03' },
  ];
}
