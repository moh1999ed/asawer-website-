-- Extended Database Schema for Comprehensive Admin Panel

-- Staff/Employees Table (for admin login)
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin', -- super_admin, admin, editor
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Management Table (for editable texts)
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'hero_title_ar', 'about_text_en'
  value_ar TEXT,
  value_en TEXT,
  content_type VARCHAR(50) DEFAULT 'text', -- text, html, markdown
  section VARCHAR(100), -- hero, about, footer, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Images Management Table
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  alt_text_ar VARCHAR(255),
  alt_text_en VARCHAR(255),
  category VARCHAR(100), -- hero, project, team, gallery, etc.
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Statistics Table (for editable statistics)
CREATE TABLE IF NOT EXISTS statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'total_area', 'buildings_count'
  value DECIMAL(15, 2) NOT NULL,
  unit VARCHAR(50), -- m², km², etc.
  label_ar VARCHAR(255),
  label_en VARCHAR(255),
  icon VARCHAR(100), -- icon name or emoji
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto Statistics Table (for customer interaction stats - auto tracked)
CREATE TABLE IF NOT EXISTS auto_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL, -- page_view, project_view, form_submit, etc.
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  metadata JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- General Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, read, replied, archived
  replied_at TIMESTAMP WITH TIME ZONE,
  replied_by UUID REFERENCES staff(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Projects Table (add more fields)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS price_from DECIMAL(15, 2);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS price_to DECIMAL(15, 2);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS total_area DECIMAL(15, 2);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS buildings_count INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS units_count INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS parking_spaces INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Enhanced Leads Table (add project-specific tracking)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source_detail VARCHAR(255);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'normal'; -- low, normal, high, urgent

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_staff_email ON staff(email);
CREATE INDEX IF NOT EXISTS idx_staff_active ON staff(is_active);
CREATE INDEX IF NOT EXISTS idx_content_key ON content(key);
CREATE INDEX IF NOT EXISTS idx_content_section ON content(section);
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_images_project ON images(project_id);
CREATE INDEX IF NOT EXISTS idx_statistics_key ON statistics(key);
CREATE INDEX IF NOT EXISTS idx_statistics_active ON statistics(is_active);
CREATE INDEX IF NOT EXISTS idx_auto_stats_event ON auto_statistics(event_type);
CREATE INDEX IF NOT EXISTS idx_auto_stats_project ON auto_statistics(project_id);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_leads_project ON leads(project_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Triggers for updated_at
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_statistics_updated_at BEFORE UPDATE ON statistics
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: Asawer123!@#)
-- Password hash should be generated using bcrypt in production
INSERT INTO staff (name, email, password_hash, role) 
VALUES ('مدير النظام', 'admin@asawer.om', '$2b$10$placeholder_hash_replace_in_production', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Insert default statistics
INSERT INTO statistics (key, value, unit, label_ar, label_en, icon, display_order) VALUES
('total_area', 0, 'م²', 'إجمالي المساحة', 'Total Area', '📐', 1),
('buildings_count', 0, '', 'عدد البنايات', 'Buildings Count', '🏢', 2),
('units_count', 0, '', 'عدد الوحدات', 'Units Count', '🏠', 3),
('projects_count', 0, '', 'عدد المشاريع', 'Projects Count', '🏗️', 4)
ON CONFLICT (key) DO NOTHING;

