'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { PROJECT_STATUSES, PROJECT_TYPES, type Project } from '@/lib/admin-config';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project & { amenitiesString: string }>({
    name_ar: '',
    name_en: '',
    price_from: 0,
    status: 'planning',
    type: 'residential',
    freehold: false,
    description_ar: '',
    description_en: '',
    completion_date: '',
    location_ar: '',
    location_en: '',
    unit_types: '',
    ideal_for: '',
    image_emoji: '🏘️',
    amenitiesString: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/admin/projects';
      const method = editingId ? 'PUT' : 'POST';
      
      // Convert amenitiesString to array
      const amenities = formData.amenitiesString
        ? formData.amenitiesString.split(',').map(a => a.trim()).filter(a => a)
        : [];
      
      const body = {
        ...formData,
        amenities,
        id: editingId || undefined,
      };
      
      // Remove amenitiesString from body
      delete (body as any).amenitiesString;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchProjects();
        setShowForm(false);
        setEditingId(null);
        resetForm();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'حدث خطأ أثناء الحفظ');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const resetForm = () => {
        setFormData({
          name_ar: '',
          name_en: '',
          price_from: 0,
          status: 'planning',
          type: 'residential',
          freehold: false,
      description_ar: '',
      description_en: '',
      completion_date: '',
      location_ar: '',
      location_en: '',
      unit_types: '',
      ideal_for: '',
      image_emoji: '🏘️',
      amenitiesString: '',
    });
  };

  const handleEdit = (project: Project) => {
    setFormData({
      ...project,
      amenitiesString: Array.isArray(project.amenities) ? project.amenities.join(', ') : '',
    });
    setEditingId(project.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      try {
        const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          await fetchProjects();
        } else {
          const errorData = await res.json();
          alert(errorData.error || 'حدث خطأ أثناء الحذف');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin">
            <div className="w-16 h-16 border-4 border-asawer-accent-500/20 border-t-asawer-accent-500 rounded-full" />
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
            <h1 className="text-4xl font-black text-gray-900 mb-2">المشاريع</h1>
            <p className="text-gray-600">إدارة المشاريع العقارية - إضافة وتعديل المشاريع</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-asawer-accent-500 to-asawer-accent-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            مشروع جديد
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المشروع (عربي) *</label>
              <input
                type="text"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                required
              />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name (English) *</label>
              <input
                type="text"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                required
              />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف (عربي)</label>
                  <textarea
                    value={formData.description_ar || ''}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description (English)</label>
                  <textarea
                    value={formData.description_en || ''}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    rows={3}
                  />
                </div>
              </div>

              {/* Price and Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">السعر من (ر.ع) *</label>
              <input
                type="number"
                value={formData.price_from}
                onChange={(e) => setFormData({ ...formData, price_from: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                required
                    min="0"
              />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الحالة</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">النوع</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الموقع (عربي)</label>
                  <input
                    type="text"
                    value={formData.location_ar || ''}
                    onChange={(e) => setFormData({ ...formData, location_ar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    placeholder="مثال: مسقط، الخوير"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location (English)</label>
                  <input
                    type="text"
                    value={formData.location_en || ''}
                    onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    placeholder="e.g., Muscat, Khuwair"
                  />
                </div>
              </div>

              {/* Completion and Unit Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">تاريخ الإنجاز</label>
                  <input
                    type="text"
                    value={formData.completion_date || ''}
                    onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    placeholder="مثال: Q1 2028"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">أنواع الوحدات</label>
                  <input
                    type="text"
                    value={formData.unit_types || ''}
                    onChange={(e) => setFormData({ ...formData, unit_types: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    placeholder="مثال: Studio, 1–3 BR Apartments"
                  />
                </div>
              </div>

              {/* Ideal For */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">مثالي لـ</label>
                <input
                  type="text"
                  value={formData.ideal_for || ''}
                  onChange={(e) => setFormData({ ...formData, ideal_for: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                  placeholder="مثال: العائلات والمشترين لأول مرة"
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">المرافق (مفصولة بفواصل)</label>
                <input
                  type="text"
                  value={formData.amenitiesString}
                  onChange={(e) => setFormData({ ...formData, amenitiesString: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                  placeholder="مثال: صالة ألعاب، مسبح، حدائق"
                />
                <p className="text-xs text-gray-500 mt-1">افصل بين المرافق بفواصل (،)</p>
              </div>

              {/* Image Emoji */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الأيقونة (Emoji)</label>
                  <input
                    type="text"
                    value={formData.image_emoji || ''}
                    onChange={(e) => setFormData({ ...formData, image_emoji: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    placeholder="🏘️"
                  />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.freehold}
                  onChange={(e) => setFormData({ ...formData, freehold: e.target.checked })}
                    className="w-4 h-4"
                />
                  <label className="text-sm font-semibold text-gray-700">ملكية حرة</label>
                </div>
              </div>
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
                  resetForm();
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-asawer-accent-50 to-asawer-accent-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الأيقونة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الاسم</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">السعر من</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الموقع</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">النوع</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-2xl">{project.image_emoji || '🏘️'}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{project.name_ar}</div>
                        <div className="text-xs text-gray-500">{project.name_en}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {project.price_from.toLocaleString()} ر.ع
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {project.location_ar || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                          {PROJECT_TYPES.find((t) => t.value === project.type)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          project.status === 'completed' 
                            ? 'bg-green-100 text-green-700'
                            : project.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {PROJECT_STATUSES.find((s) => s.value === project.status)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id!)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      لا توجد مشاريع حتى الآن
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
