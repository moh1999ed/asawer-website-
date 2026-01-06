// Admin configuration
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@asawer.om';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Asawer123!@#';

// Lead statuses
export const LEAD_STATUSES = [
  { value: 'new', label: 'جديد' },
  { value: 'assigned', label: 'مسند' },
  { value: 'contacted', label: 'تم التواصل' },
  { value: 'converted', label: 'محول' },
  { value: 'lost', label: 'فقدان' },
] as const;

// Project statuses
export const PROJECT_STATUSES = [
  { value: 'planning', label: 'قيد التخطيط' },
  { value: 'in_progress', label: 'قيد الإنشاء' },
  { value: 'completed', label: 'مكتمل' },
] as const;

// Project types
export const PROJECT_TYPES = [
  { value: 'residential', label: 'سكني' },
  { value: 'commercial', label: 'تجاري' },
  { value: 'mixed', label: 'مختلط' },
] as const;

export type AdminUser = {
  id?: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
};

export type Project = {
  id?: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  price_from: number;
  status: 'planning' | 'in_progress' | 'completed';
  type: 'residential' | 'commercial' | 'mixed';
  completion_date?: string;
  freehold: boolean;
  image_emoji?: string;
  location_ar?: string;
  location_en?: string;
  unit_types?: string;
  ideal_for?: string;
  amenities?: string[];
  created_at?: string;
};

export type Lead = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  project_id?: string;
  agent_id?: string;
  status: 'new' | 'assigned' | 'contacted' | 'converted' | 'lost';
  message?: string;
  created_at?: string;
  updated_at?: string;
};

export type Agent = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  created_at?: string;
};
