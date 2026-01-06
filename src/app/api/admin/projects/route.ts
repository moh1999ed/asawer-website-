import { NextRequest, NextResponse } from 'next/server';
import { storageData } from '@/lib/admin-utils';
import { type Project } from '@/lib/admin-config';
import { allProjects } from '@/data/projects';

export async function GET(request: NextRequest) {
  try {
    // Merge website projects with admin projects
    // Convert website projects to admin format
    const websiteProjects = allProjects.map((p) => ({
      id: p.id.toString(),
      name_ar: p.name_ar,
      name_en: p.name_en,
      description_ar: '',
      description_en: '',
      price_from: parseFloat(p.price_from.replace(/,/g, '')) || 0,
      status: p.status || 'planning',
      type: p.type || 'residential',
      completion_date: p.completion,
      freehold: p.is_freehold,
      image_emoji: p.image,
      location_ar: p.location_ar,
      location_en: p.location_en,
      unit_types: p.unit_types,
      ideal_for: p.ideal_for,
      amenities: p.amenities,
      created_at: new Date().toISOString(),
    }));

    // Combine with admin projects (avoid duplicates)
    const adminProjectIds = new Set(storageData.projects.map((p: any) => p.id));
    const newWebsiteProjects = websiteProjects.filter((p) => !adminProjectIds.has(p.id));
    
    const allProjectsCombined = [...storageData.projects, ...newWebsiteProjects];
    
    return NextResponse.json({ projects: allProjectsCombined });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'خطأ في جلب المشاريع' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const project: Project & { amenities?: string[] } = await request.json();
    const newProject = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
    };
    storageData.projects.push(newProject);
    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'خطأ في إنشاء المشروع' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const project: Project & { id: string } = await request.json();
    
    // Check if it's a website project (numeric ID) or admin project (string ID)
    const isWebsiteProject = !isNaN(Number(project.id));
    
    if (isWebsiteProject) {
      // For website projects, update in storageData (they're synced from allProjects)
      const index = storageData.projects.findIndex((p: any) => p.id === project.id);
      
      if (index === -1) {
        // Add as new project if not found
        storageData.projects.push({
          ...project,
          created_at: new Date().toISOString(),
        });
      } else {
        storageData.projects[index] = { ...storageData.projects[index], ...project };
      }
      
      return NextResponse.json(storageData.projects[index] || storageData.projects[storageData.projects.length - 1]);
    } else {
      // For admin projects
      const index = storageData.projects.findIndex((p: any) => p.id === project.id);

      if (index === -1) {
        return NextResponse.json({ error: 'المشروع غير موجود' }, { status: 404 });
      }

      storageData.projects[index] = { ...storageData.projects[index], ...project };
      return NextResponse.json(storageData.projects[index]);
    }
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'خطأ في تحديث المشروع' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'معرّف المشروع مطلوب' }, { status: 400 });
    }

    // Check if it's a website project (numeric ID)
    const isWebsiteProject = !isNaN(Number(id));
    
    if (isWebsiteProject) {
      // For website projects, remove from storageData (they'll be re-added from allProjects on next GET)
      const index = storageData.projects.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        storageData.projects.splice(index, 1);
      }
      return NextResponse.json({ success: true, message: 'تم حذف المشروع من لوحة التحكم (سيظهر مرة أخرى من بيانات الموقع)' });
    } else {
      // For admin projects
      const index = storageData.projects.findIndex((p: any) => p.id === id);

      if (index === -1) {
        return NextResponse.json({ error: 'المشروع غير موجود' }, { status: 404 });
      }

      storageData.projects.splice(index, 1);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'خطأ في حذف المشروع' }, { status: 500 });
  }
}
