'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Save, Edit2, Trash2, Search } from 'lucide-react';

interface ContentItem {
  id?: string;
  key: string;
  value_ar: string;
  value_en: string;
  content_type: 'text' | 'html' | 'markdown';
  section: string;
}

export default function ContentPage() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [formData, setFormData] = useState<ContentItem>({
    key: '',
    value_ar: '',
    value_en: '',
    content_type: 'text',
    section: '',
  });

  const sections = [
    'all',
    'hero',
    'about',
    'projects',
    'team',
    'contact',
    'footer',
    'stats',
    'news',
  ];

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      setContents(data.contents || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/admin/content';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchContents();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          key: '',
          value_ar: '',
          value_en: '',
          content_type: 'text',
          section: '',
        });
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'حدث خطأ أثناء الحفظ');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleEdit = (content: ContentItem) => {
    setFormData(content);
    setEditingId(content.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
      try {
        const res = await fetch(`/api/admin/content?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          await fetchContents();
        } else {
          const errorData = await res.json();
          alert(errorData.error || 'حدث خطأ أثناء الحذف');
        }
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };

  const filteredContents = contents.filter((content) => {
    const matchesSearch = 
      content.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.value_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.value_en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'all' || content.section === selectedSection;
    return matchesSearch && matchesSection;
  });

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
            <h1 className="text-4xl font-black text-gray-900 mb-2">إدارة المحتوى</h1>
            <p className="text-gray-600">تعديل جميع النصوص والمحتوى في الموقع</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                key: '',
                value_ar: '',
                value_en: '',
                content_type: 'text',
                section: '',
              });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            محتوى جديد
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="بحث في المحتوى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
            />
          </div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
          >
            {sections.map((section) => (
              <option key={section} value={section}>
                {section === 'all' ? 'جميع الأقسام' : section}
              </option>
            ))}
          </select>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingId ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">المفتاح (Key) *</label>
                  <input
                    type="text"
                    placeholder="مثال: hero_title_ar"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    required
                    disabled={!!editingId}
                  />
                  {editingId && (
                    <p className="text-xs text-gray-500 mt-1">المفتاح لا يمكن تغييره بعد الإنشاء</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">القسم *</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    required
                  >
                    <option value="">اختر القسم</option>
                    {sections.filter(s => s !== 'all').map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">نوع المحتوى</label>
                <select
                  value={formData.content_type}
                  onChange={(e) => setFormData({ ...formData, content_type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                >
                  <option value="text">نص عادي</option>
                  <option value="html">HTML</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">المحتوى (عربي) *</label>
                <textarea
                  value={formData.value_ar}
                  onChange={(e) => setFormData({ ...formData, value_ar: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500 min-h-[120px]"
                  required
                  placeholder="أدخل المحتوى بالعربي..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">المحتوى (إنجليزي) *</label>
                <textarea
                  value={formData.value_en}
                  onChange={(e) => setFormData({ ...formData, value_en: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500 min-h-[120px]"
                  required
                  placeholder="Enter content in English..."
                />
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
                  setFormData({
                    key: '',
                    value_ar: '',
                    value_en: '',
                    content_type: 'text',
                    section: '',
                  });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}

        {/* Contents Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المفتاح</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">القسم</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المحتوى (عربي)</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المحتوى (إنجليزي)</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">النوع</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredContents.length > 0 ? (
                  filteredContents.map((content) => (
                    <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{content.key}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                          {content.section}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {content.value_ar}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {content.value_en}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-700">
                          {content.content_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(content)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(content.id!)}
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
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      لا يوجد محتوى حتى الآن
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

