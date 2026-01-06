'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Upload, Edit2, Trash2, Image as ImageIcon, Search } from 'lucide-react';
import { type Project } from '@/lib/admin/admin-config';

interface ImageItem {
  id?: string;
  name: string;
  url: string;
  alt_text_ar: string;
  alt_text_en: string;
  category: string;
  project_id?: string;
  is_featured: boolean;
  display_order: number;
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<ImageItem>({
    name: '',
    url: '',
    alt_text_ar: '',
    alt_text_en: '',
    category: '',
    project_id: '',
    is_featured: false,
    display_order: 0,
  });

  const categories = [
    'hero',
    'project',
    'team',
    'gallery',
    'about',
    'logo',
    'other',
  ];

  useEffect(() => {
    fetchProjects();
    fetchImages();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin/images');
      const data = await res.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/admin/images';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchImages();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          name: '',
          url: '',
          alt_text_ar: '',
          alt_text_en: '',
          category: '',
          project_id: '',
          is_featured: false,
          display_order: 0,
        });
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleEdit = (image: ImageItem) => {
    setFormData(image);
    setEditingId(image.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      try {
        const res = await fetch(`/api/admin/images?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          await fetchImages();
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('الرجاء اختيار ملف صورة');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت');
      return;
    }

    // Read file as base64 for preview and storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Set the image URL (base64 for now, can be replaced with actual upload service)
      setFormData({ ...formData, url: base64String });
      
      // Auto-fill name if empty
      if (!formData.name) {
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        setFormData(prev => ({ ...prev, name: fileName }));
      }
    };
    reader.onerror = () => {
      alert('حدث خطأ أثناء قراءة الملف');
    };
    reader.readAsDataURL(file);
  };

  const filteredImages = images.filter((image) => {
    const matchesSearch = 
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt_text_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt_text_en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            <h1 className="text-4xl font-black text-gray-900 mb-2">إدارة الصور</h1>
            <p className="text-gray-600">رفع وتعديل الصور في الموقع</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                name: '',
                url: '',
                alt_text_ar: '',
                alt_text_en: '',
                category: '',
                project_id: '',
                is_featured: false,
                display_order: 0,
              });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            صورة جديدة
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="بحث في الصور..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
          >
            <option value="all">جميع الفئات</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingId ? 'تعديل الصورة' : 'إضافة صورة جديدة'}</h2>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">رفع الصورة *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-asawer-accent-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={32} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      اضغط للرفع أو اسحب الملف هنا
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG, GIF حتى 10 ميجابايت
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {formData.url && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">معاينة الصورة</label>
                  <div className="relative inline-block">
                    <img
                      src={formData.url}
                      alt="Preview"
                      className="max-w-full max-h-64 rounded-lg border-2 border-gray-200 shadow-sm object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الصورة *</label>
                  <input
                    type="text"
                    placeholder="اسم الصورة"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">رابط الصورة (URL) *</label>
                  <input
                    type="text"
                    placeholder="أو أدخل رابط الصورة مباشرة"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">يمكنك إدخال رابط مباشر أو رفع صورة من جهازك</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">النص البديل (عربي)</label>
                  <input
                    type="text"
                    placeholder="وصف الصورة بالعربي"
                    value={formData.alt_text_ar}
                    onChange={(e) => setFormData({ ...formData, alt_text_ar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">النص البديل (إنجليزي)</label>
                  <input
                    type="text"
                    placeholder="Image alt text (English)"
                    value={formData.alt_text_en}
                    onChange={(e) => setFormData({ ...formData, alt_text_en: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الفئة *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">المشروع</label>
                  <select
                    value={formData.project_id || ''}
                    onChange={(e) => setFormData({ ...formData, project_id: e.target.value || undefined })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                  >
                    <option value="">لا يوجد مشروع</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name_ar}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ترتيب العرض</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-accent-500"
                  />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label className="text-sm font-semibold text-gray-700 cursor-pointer">صورة مميزة</label>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                <Upload size={16} />
                حفظ
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    name: '',
                    url: '',
                    alt_text_ar: '',
                    alt_text_en: '',
                    category: '',
                    project_id: '',
                    is_featured: false,
                    display_order: 0,
                  });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div key={image.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.alt_text_ar || image.name}
                    className="w-full h-full object-cover"
                  />
                  {image.is_featured && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
                      مميزة
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{image.category}</span>
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(image)}
                      className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(image.id!)}
                      className="flex-1 px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">لا توجد صور حتى الآن</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

