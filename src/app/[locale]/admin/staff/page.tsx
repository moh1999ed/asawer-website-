'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Save, Edit2, Trash2, Lock, Mail, User } from 'lucide-react';

interface StaffMember {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'super_admin' | 'admin' | 'editor';
  is_active: boolean;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StaffMember>({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    is_active: true,
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch('/api/admin/staff');
      const data = await res.json();
      setStaff(data.staff || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/admin/staff';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? { ...formData, id: editingId, password: formData.password || undefined }
        : formData;

      if (!editingId && !formData.password) {
        alert('كلمة المرور مطلوبة للموظفين الجدد');
        return;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchStaff();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'admin',
          is_active: true,
        });
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'حدث خطأ');
      }
    } catch (error) {
      console.error('Error saving staff:', error);
      alert('حدث خطأ في حفظ البيانات');
    }
  };

  const handleEdit = (member: StaffMember) => {
    setFormData({ ...member, password: '' });
    setEditingId(member.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      try {
        const res = await fetch(`/api/admin/staff?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          await fetchStaff();
        }
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/staff', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentStatus }),
      });
      if (res.ok) {
        await fetchStaff();
      }
    } catch (error) {
      console.error('Error toggling staff status:', error);
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
            <h1 className="text-4xl font-black text-gray-900 mb-2">إدارة الموظفين</h1>
            <p className="text-gray-600">إضافة وتعديل الموظفين والصلاحيات</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                name: '',
                email: '',
                password: '',
                role: 'admin',
                is_active: true,
              });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            موظف جديد
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">{editingId ? 'تعديل الموظف' : 'إضافة موظف جديد'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
                  required
                  disabled={!!editingId}
                />
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder={editingId ? 'اتركه فارغاً للحفاظ على كلمة المرور الحالية' : 'كلمة المرور'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
                  required={!editingId}
                />
              </div>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
              >
                <option value="editor">محرر</option>
                <option value="admin">مدير</option>
                <option value="super_admin">مدير عام</option>
              </select>
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                نشط
              </label>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
              >
                <Save size={16} />
                حفظ
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الدور</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {staff.length > 0 ? (
                  staff.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          member.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                          member.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {member.role === 'super_admin' ? 'مدير عام' :
                           member.role === 'admin' ? 'مدير' : 'محرر'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleToggleActive(member.id!, member.is_active)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            member.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {member.is_active ? 'نشط' : 'غير نشط'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id!)}
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
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      لا يوجد موظفين حتى الآن
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

