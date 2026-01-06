# Complete Admin Panel Guide

## Overview

A comprehensive admin panel has been created to manage all aspects of the website, including:

### Main Features:

1. **Project Management** - Add, edit, and delete projects
2. **Customer Lead Tracking** - Track customer requests for each project separately
3. **Customer Management** - Manage customer database
4. **Agent Management** - Manage sales agents
5. **Content Management** - Edit all texts and content on the website
6. **Image Management** - Upload and edit images
7. **Statistics Management** - Edit displayed statistics (areas, number of buildings, etc.)
8. **Staff Management** - Add and edit staff members and permissions
9. **General Contact** - Manage contact messages from the website

## Login

### Method 1: Using Environment Variables
- Email: `admin@asawer.om`
- Password: `Asawer123!@#`

### Method 2: Using Database
1. Create a new staff member from the "Staff" page
2. Use the registered email and password

## Available Pages

### 1. Main Dashboard (`/admin/dashboard`)
- Display quick statistics
- Recent customers
- Overview of projects

### 2. Project Management (`/admin/projects`)
- Add new project
- Edit existing projects
- Delete projects
- Manage project details (name, price, status, type)

### 3. Customer Lead Tracking (`/admin/project-leads`)
- View customer requests grouped by project
- Change request status
- Add notes for each customer
- View complete details for each request

### 4. Customer Management (`/admin/leads`)
- View all customers
- Add new customer
- Edit customer data
- Change customer status

### 5. Agent Management (`/admin/agents`)
- Manage sales agents
- Activate/deactivate agent

### 6. Content Management (`/admin/content`)
- Edit all texts on the website
- Search content
- Filter by section
- Support for plain text, HTML, and Markdown

**Content Sections:**
- `hero` - Hero section
- `about` - About section
- `projects` - Projects section
- `team` - Team section
- `contact` - Contact section
- `footer` - Footer
- `stats` - Statistics
- `news` - News

### 7. Image Management (`/admin/images`)
- Upload new images
- Edit image information
- Delete images
- Categorize images by category
- Link images to projects

**Image Categories:**
- `hero` - Hero images
- `project` - Project images
- `team` - Team images
- `gallery` - Image gallery
- `about` - About section images
- `logo` - Logos
- `other` - Other

### 8. Statistics Management (`/admin/statistics`)
- Add new statistic
- Edit values (areas, number of buildings, etc.)
- Activate/deactivate statistic
- Order statistics display

**Note:** Statistics related to customer interaction (such as number of visits) are calculated automatically and don't need manual editing.

### 9. Staff Management (`/admin/staff`)
- Add new staff member
- Edit staff data
- Change password
- Set permissions (editor, admin, super admin)
- Activate/deactivate staff

**Roles:**
- `editor` - Editor: Can only edit content
- `admin` - Admin: Can manage all content
- `super_admin` - Super Admin: Full permissions

### 10. General Contact (`/admin/contact`)
- View all contact messages
- Filter by status (new, read, replied, archived)
- Reply to messages
- Archive messages

## Database

### New Tables:

1. **staff** - Staff members
2. **content** - Editable content
3. **images** - Images
4. **statistics** - Editable statistics
5. **auto_statistics** - Automatic statistics (for customer interaction)
6. **contact_messages** - Contact messages

### Running the Database:

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Run the file `src/lib/database-schema-extended.sql`

## Installation

### 1. Install Required Packages:

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### 2. Set Environment Variables:

Add to `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAIL=admin@asawer.om
ADMIN_PASSWORD=Asawer123!@#
ADMIN_SESSION_SECRET=your-secret-key-change-in-production
```

### 3. Run Database:

Run the SQL file located at `src/lib/database-schema-extended.sql`

## Security

- All pages are protected by authentication system
- Passwords are encrypted using bcrypt
- Sessions are protected with HTTP-only cookies
- Permission verification on every operation

## Important Notes

1. **Image Upload:** Currently uses direct links. In production, use a storage service like AWS S3 or Cloudinary.

2. **Automatic Statistics:** Calculated automatically when customers interact with the website. No manual editing needed.

3. **Backup:** Regular database backups are recommended.

4. **Performance:** Use filters and search to facilitate management of large data.

## Support

For help or to report issues, please contact the development team.
