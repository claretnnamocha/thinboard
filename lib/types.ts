import type { LucideIcon } from 'lucide-react';

export type Status = 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'invited' | 'suspended';

export type MetricCard = {
  id: string;
  title: string;
  value: string;
  delta: number;
  icon: LucideIcon;
};

export type ActivityItem = {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  status: Status;
};

export type UserRole = 'admin' | 'editor' | 'viewer';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: Status;
  joinedAt: string;
  createdAt: string;
};

export type RevenueSeries = {
  month: string;
  revenue: number;
  target: number;
};

export type TrafficSource = {
  source: string;
  visitors: number;
};

export type OrderSeries = {
  day: string;
  orders: number;
};
