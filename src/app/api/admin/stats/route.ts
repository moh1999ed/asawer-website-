import { NextRequest, NextResponse } from 'next/server';
import { storageData } from '@/lib/admin/admin-utils';

export async function GET(request: NextRequest) {
  try {
    const totalLeads = storageData.leads.length;
    const newLeads = storageData.leads.filter((l) => l.status === 'new').length;
    const convertedLeads = storageData.leads.filter((l) => l.status === 'converted').length;
    const totalProjects = storageData.projects.length;
    const activeProjects = storageData.projects.filter((p) => p.status !== 'completed').length;
    const activeAgents = storageData.agents.filter((a) => a.active).length;
    
    // Calculate additional stats for frontend display
    // Total area: estimate based on projects (average 6250 sqm per project)
    const totalArea = totalProjects * 6250;
    // Total clients: use total leads as clients
    const totalClients = totalLeads;
    // Total awards: use active projects as awards
    const totalAwards = activeProjects;

    const recentLeads = storageData.leads
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, 5);

    return NextResponse.json({
      statistics: {
        totalLeads,
        newLeads,
        convertedLeads,
        totalProjects,
        activeProjects,
        activeAgents,
        totalArea,
        totalClients,
        totalAwards,
      },
      recentLeads,
      timestamp: Date.now(), // Add timestamp for tracking
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Last-Modified': new Date().toUTCString(),
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'خطأ في جلب الإحصائيات' },
      { status: 500 }
    );
  }
}
