'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { TrendingUp, Home, Users, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface Stats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  totalProjects: number;
  activeProjects: number;
  activeAgents: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) {
        throw new Error('فشل في جلب الإحصائيات');
      }
      const data = await res.json();
      setStats(data.statistics || {
        totalLeads: 0,
        newLeads: 0,
        convertedLeads: 0,
        totalProjects: 0,
        activeProjects: 0,
        activeAgents: 0,
      });
      setRecentLeads(data.recentLeads || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats on error
      setStats({
        totalLeads: 0,
        newLeads: 0,
        convertedLeads: 0,
        totalProjects: 0,
        activeProjects: 0,
        activeAgents: 0,
      });
      setRecentLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    color,
  }: {
    icon: any;
    title: string;
    value: number;
    color: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">{title}</p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin">
            <div className="w-16 h-16 border-4 border-asawer-primary-500/20 border-t-asawer-primary-500 rounded-full" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً بك في لوحة التحكم الإدارية</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={Users}
            title="إجمالي العملاء"
            value={stats?.totalLeads || 0}
            color="bg-blue-500"
          />
          <StatCard
            icon={AlertCircle}
            title="عملاء جدد"
            value={stats?.newLeads || 0}
            color="bg-yellow-500"
          />
          <StatCard
            icon={CheckCircle}
            title="عملاء محولون"
            value={stats?.convertedLeads || 0}
            color="bg-green-500"
          />
          <StatCard
            icon={Home}
            title="إجمالي المشاريع"
            value={stats?.totalProjects || 0}
            color="bg-purple-500"
          />
          <StatCard
            icon={TrendingUp}
            title="مشاريع نشطة"
            value={stats?.activeProjects || 0}
            color="bg-indigo-500"
          />
          <StatCard
            icon={Users}
            title="وكلاء نشطون"
            value={stats?.activeAgents || 0}
            color="bg-pink-500"
          />
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">آخر العملاء</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">البريد</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الهاتف</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(lead.created_at).toLocaleDateString('ar-SA')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      لا توجد عملاء حتى الآن
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
