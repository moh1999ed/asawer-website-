'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Save, Edit2, Trash2, TrendingUp } from 'lucide-react';

interface Statistic {
  id?: string;
  key: string;
  value: number;
  unit: string;
  label_ar: string;
  label_en: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Statistic>({
    key: '',
    value: 0,
    unit: '',
    label_ar: '',
    label_en: '',
    icon: '📊',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const res = await fetch('/api/admin/statistics');
      const data = await res.json();
      setStatistics(data.statistics || []);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/admin/statistics';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchStatistics();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          key: '',
          value: 0,
          unit: '',
          label_ar: '',
          label_en: '',
          icon: '📊',
          display_order: 0,
          is_active: true,
        });
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'حدث خطأ أثناء الحفظ');
      }
    } catch (error) {
      console.error('Error saving statistic:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleEdit = (stat: Statistic) => {
    setFormData(stat);
    setEditingId(stat.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الإحصائية؟')) {
      try {
        const res = await fetch(`/api/admin/statistics?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          await fetchStatistics();
        }
      } catch (error) {
        console.error('Error deleting statistic:', error);
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/statistics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentStatus }),
      });
      if (res.ok) {
        await fetchStatistics();
      }
    } catch (error) {
      console.error('Error toggling statistic:', error);
    }
  };

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">إدارة الإحصائيات</h1>
            <p className="text-gray-600">تعديل الإحصائيات المعروضة في الموقع (المساحات، عدد البنايات، إلخ)</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                key: '',
                value: 0,
                unit: '',
                label_ar: '',
                label_en: '',
                icon: '📊',
                display_order: 0,
                is_active: true,
              });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            إحصائية جديدة
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingId ? 'تعديل الإحصائية' : 'إضافة إحصائية جديدة'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">المفتاح (Key) *</label>
                <input
                  type="text"
                  placeholder="مثال: total_area"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                  required
                  disabled={!!editingId}
                />
                <p className="text-xs text-gray-500 mt-1">المفتاح لا يمكن تغييره بعد الإنشاء</p>
              </div>
              <input
                type="number"
                step="0.01"
                placeholder="القيمة"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
                required
              />
              <input
                type="text"
                placeholder="الوحدة (م²، كم²، إلخ)"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
              />
              <input
                type="text"
                placeholder="الأيقونة (Emoji أو نص)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
              />
              <input
                type="text"
                placeholder="التسمية (عربي)"
                value={formData.label_ar}
                onChange={(e) => setFormData({ ...formData, label_ar: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
                required
              />
              <input
                type="text"
                placeholder="التسمية (إنجليزي)"
                value={formData.label_en}
                onChange={(e) => setFormData({ ...formData, label_en: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
                required
              />
              <input
                type="number"
                placeholder="ترتيب العرض"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
              />
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                نشط
              </label>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                <Save size={16} />
                حفظ
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    key: '',
                    value: 0,
                    unit: '',
                    label_ar: '',
                    label_en: '',
                    icon: '📊',
                    display_order: 0,
                    is_active: true,
                  });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}

        {/* Statistics Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الأيقونة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المفتاح</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">القيمة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التسمية (عربي)</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التسمية (إنجليزي)</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {statistics.length > 0 ? (
                  statistics
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((stat) => (
                      <tr key={stat.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 text-2xl">{stat.icon}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{stat.key}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {stat.value.toLocaleString()} {stat.unit}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{stat.label_ar}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{stat.label_en}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleToggleActive(stat.id!, stat.is_active)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              stat.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {stat.is_active ? 'نشط' : 'غير نشط'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(stat)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} className="text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleDelete(stat.id!)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} className="text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      لا توجد إحصائيات حتى الآن
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

