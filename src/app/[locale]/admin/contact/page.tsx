'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Mail, Phone, MessageSquare, Calendar, CheckCircle, XCircle, Archive } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  replied_at?: string;
}

export default function ContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/contact');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        await fetchMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: newStatus as any });
        }
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'حدث خطأ أثناء تحديث الحالة');
      }
    } catch (error) {
      console.error('Error updating message status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    return selectedStatus === 'all' || msg.status === selectedStatus;
  });

  const statusCounts = {
    all: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
    archived: messages.filter(m => m.status === 'archived').length,
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
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">التواصل العام</h1>
          <p className="text-gray-600">إدارة رسائل التواصل العام من الموقع</p>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'الكل', count: statusCounts.all },
              { value: 'new', label: 'جديد', count: statusCounts.new, color: 'bg-yellow-100 text-yellow-700' },
              { value: 'read', label: 'مقروء', count: statusCounts.read, color: 'bg-blue-100 text-blue-700' },
              { value: 'replied', label: 'تم الرد', count: statusCounts.replied, color: 'bg-green-100 text-green-700' },
              { value: 'archived', label: 'مؤرشف', count: statusCounts.archived, color: 'bg-gray-100 text-gray-700' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedStatus(tab.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedStatus === tab.value
                    ? 'bg-gradient-to-r from-asawer-primary-500 to-asawer-secondary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">البريد</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الهاتف</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الموضوع</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التاريخ</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <tr 
                      key={message.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        message.status === 'new' ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{message.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{message.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{message.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{message.subject || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={message.status}
                          onChange={(e) => handleStatusChange(message.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-semibold border focus:outline-none ${
                            message.status === 'new' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            message.status === 'read' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            message.status === 'replied' ? 'bg-green-100 text-green-700 border-green-200' :
                            'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          <option value="new">جديد</option>
                          <option value="read">مقروء</option>
                          <option value="replied">تم الرد</option>
                          <option value="archived">مؤرشف</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(message.created_at).toLocaleDateString('ar-SA')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedMessage(message)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors"
                        >
                          عرض
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      لا توجد رسائل حتى الآن
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Details Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMessage(null)}>
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">تفاصيل الرسالة</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">الاسم</label>
                    <p className="text-gray-900">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">البريد الإلكتروني</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">الهاتف</label>
                      <p className="text-gray-900">{selectedMessage.phone}</p>
                    </div>
                  )}
                  {selectedMessage.subject && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">الموضوع</label>
                      <p className="text-gray-900">{selectedMessage.subject}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">التاريخ</label>
                    <p className="text-gray-900">{new Date(selectedMessage.created_at).toLocaleString('ar-SA')}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">الرسالة</label>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Contact'}`}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-gradient-to-r from-asawer-accent-500 to-asawer-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Mail size={16} />
                    الرد عبر البريد
                  </a>
                  {selectedMessage.status !== 'replied' && (
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <CheckCircle size={16} />
                      تم الرد
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

