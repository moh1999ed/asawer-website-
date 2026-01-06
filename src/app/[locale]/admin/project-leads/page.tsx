'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Building2, User, Phone, Mail, MessageSquare, Calendar, Filter } from 'lucide-react';
import { type Project } from '@/lib/admin/admin-config';

interface ProjectLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  project_id: string;
  project_name?: string;
  status: string;
  created_at: string;
  notes?: string;
}

export default function ProjectLeadsPage() {
  const [leads, setLeads] = useState<ProjectLead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<ProjectLead | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchLeads();
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

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      // Group leads by project
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        await fetchLeads();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, notes }),
      });
      if (res.ok) {
        await fetchLeads();
        setSelectedLead(null);
      }
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesProject = selectedProject === 'all' || lead.project_id === selectedProject;
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesProject && matchesStatus;
  });

  // Group leads by project
  const leadsByProject = filteredLeads.reduce((acc, lead) => {
    const projectId = lead.project_id || 'no-project';
    if (!acc[projectId]) {
      acc[projectId] = [];
    }
    acc[projectId].push(lead);
    return acc;
  }, {} as Record<string, ProjectLead[]>);

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
          <h1 className="text-4xl font-black text-gray-900 mb-2">متابعة طلبات العملاء</h1>
          <p className="text-gray-600">متابعة طلبات العملاء لكل مشروع منفصل</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Building2 className="absolute right-3 top-3 text-gray-400" size={20} />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
            >
              <option value="all">جميع المشاريع</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name_ar}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 relative">
            <Filter className="absolute right-3 top-3 text-gray-400" size={20} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="new">جديد</option>
              <option value="assigned">مسند</option>
              <option value="contacted">تم التواصل</option>
              <option value="converted">محول</option>
              <option value="lost">فقدان</option>
            </select>
          </div>
        </div>

        {/* Leads by Project */}
        {Object.keys(leadsByProject).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(leadsByProject).map(([projectId, projectLeads]) => {
              const project = projects.find(p => p.id === projectId);
              return (
                <div key={projectId} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-asawer-primary-50 to-asawer-secondary-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="text-asawer-primary-500" size={24} />
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {project?.name_ar || 'مشروع غير محدد'}
                          </h2>
                          <p className="text-sm text-gray-600">{projectLeads.length} طلب</p>
                        </div>
                      </div>
                    </div>
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
                          <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectLeads.map((lead) => (
                          <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{lead.phone}</td>
                            <td className="px-6 py-4 text-sm">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 focus:outline-none"
                              >
                                <option value="new">جديد</option>
                                <option value="assigned">مسند</option>
                                <option value="contacted">تم التواصل</option>
                                <option value="converted">محول</option>
                                <option value="lost">فقدان</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(lead.created_at).toLocaleDateString('ar-SA')}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors"
                              >
                                عرض التفاصيل
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-500">لا توجد طلبات حتى الآن</p>
          </div>
        )}

        {/* Lead Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">تفاصيل الطلب</h2>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">الاسم</label>
                    <p className="text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">البريد الإلكتروني</label>
                    <p className="text-gray-900">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">الهاتف</label>
                    <p className="text-gray-900">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">التاريخ</label>
                    <p className="text-gray-900">{new Date(selectedLead.created_at).toLocaleString('ar-SA')}</p>
                  </div>
                </div>
                {selectedLead.message && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">الرسالة</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLead.message}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">ملاحظات</label>
                  <textarea
                    defaultValue={selectedLead.notes || ''}
                    onBlur={(e) => handleUpdateNotes(selectedLead.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-asawer-primary-500 min-h-[100px]"
                    placeholder="أضف ملاحظات عن هذا العميل..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

