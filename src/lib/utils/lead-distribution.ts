import { supabaseAdmin } from './supabase';

const ASSIGNMENT_TIMEOUT_MINUTES = 5;

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  project_id?: string;
  message?: string;
  source?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp_link?: string;
  is_active: boolean;
}

/**
 * Get all active agents
 */
export async function getActiveAgents(): Promise<Agent[]> {
  const { data, error } = await supabaseAdmin
    .from('agents')
    .select('*')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching agents:', error);
    return [];
  }

  return data || [];
}

/**
 * Randomly select an agent from active agents
 */
export async function selectRandomAgent(): Promise<Agent | null> {
  const agents = await getActiveAgents();
  
  if (agents.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * agents.length);
  return agents[randomIndex];
}

/**
 * Create a new lead and assign it to a random agent
 */
export async function createLeadAndAssign(leadData: Lead): Promise<{
  leadId: string;
  agentId: string;
  timeoutAt: Date;
} | null> {
  try {
    // First, save lead to Marketing Master Table
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        project_id: leadData.project_id,
        message: leadData.message,
        source: leadData.source || 'website',
        status: 'new',
      })
      .select()
      .single();

    if (leadError || !lead) {
      console.error('Error creating lead:', leadError);
      return null;
    }

    // Select random agent
    const agent = await selectRandomAgent();
    if (!agent) {
      console.error('No active agents available');
      return null;
    }

    // Calculate timeout (5 minutes from now)
    const timeoutAt = new Date();
    timeoutAt.setMinutes(timeoutAt.getMinutes() + ASSIGNMENT_TIMEOUT_MINUTES);

    // Assign lead to agent
    const { error: assignError } = await supabaseAdmin
      .from('leads')
      .update({
        assigned_to: agent.id,
        assigned_at: new Date().toISOString(),
        timeout_at: timeoutAt.toISOString(),
        status: 'assigned',
      })
      .eq('id', lead.id);

    if (assignError) {
      console.error('Error assigning lead:', assignError);
      return null;
    }

    // Create assignment history record
    await supabaseAdmin
      .from('lead_assignments')
      .insert({
        lead_id: lead.id,
        agent_id: agent.id,
        status: 'pending',
        timeout_at: timeoutAt.toISOString(),
      });

    return {
      leadId: lead.id,
      agentId: agent.id,
      timeoutAt,
    };
  } catch (error) {
    console.error('Error in createLeadAndAssign:', error);
    return null;
  }
}

/**
 * Claim a lead by an agent
 */
export async function claimLead(leadId: string, agentId: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('leads')
      .update({
        status: 'claimed',
        claimed_at: new Date().toISOString(),
      })
      .eq('id', leadId)
      .eq('assigned_to', agentId)
      .eq('status', 'assigned');

    if (error) {
      console.error('Error claiming lead:', error);
      return false;
    }

    // Update assignment history
    await supabaseAdmin
      .from('lead_assignments')
      .update({
        status: 'claimed',
      })
      .eq('lead_id', leadId)
      .eq('agent_id', agentId)
      .eq('status', 'pending');

    return true;
  } catch (error) {
    console.error('Error in claimLead:', error);
    return false;
  }
}

/**
 * Check for timed-out leads and reassign them
 */
export async function checkAndReassignTimedOutLeads(): Promise<void> {
  try {
    const now = new Date().toISOString();

    // Find leads that have timed out
    const { data: timedOutLeads, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('status', 'assigned')
      .lte('timeout_at', now);

    if (error || !timedOutLeads || timedOutLeads.length === 0) {
      return;
    }

    // Reassign each timed-out lead
    for (const lead of timedOutLeads) {
      // Mark old assignment as timeout
      await supabaseAdmin
        .from('lead_assignments')
        .update({ status: 'timeout' })
        .eq('lead_id', lead.id)
        .eq('status', 'pending');

      // Select new random agent (excluding the previous one)
      const agents = await getActiveAgents();
      const availableAgents = agents.filter(a => a.id !== lead.assigned_to);
      
      if (availableAgents.length === 0) {
        // No other agents available, keep current assignment
        continue;
      }

      const randomIndex = Math.floor(Math.random() * availableAgents.length);
      const newAgent = availableAgents[randomIndex];

      // Calculate new timeout
      const timeoutAt = new Date();
      timeoutAt.setMinutes(timeoutAt.getMinutes() + ASSIGNMENT_TIMEOUT_MINUTES);

      // Reassign
      await supabaseAdmin
        .from('leads')
        .update({
          assigned_to: newAgent.id,
          assigned_at: new Date().toISOString(),
          timeout_at: timeoutAt.toISOString(),
        })
        .eq('id', lead.id);

      // Create new assignment record
      await supabaseAdmin
        .from('lead_assignments')
        .insert({
          lead_id: lead.id,
          agent_id: newAgent.id,
          status: 'pending',
          timeout_at: timeoutAt.toISOString(),
        });
    }
  } catch (error) {
    console.error('Error in checkAndReassignTimedOutLeads:', error);
  }
}

