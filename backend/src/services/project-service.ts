import { supabase } from '../db/client.js';
import { v4 as uuidv4 } from 'uuid';

export class ProjectService {
  async createProject(name: string, description: string, stack: string) {
    const project = {
      id: uuidv4(),
      name,
      description,
      status: 'creating',
      technology: stack,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: {}
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) {
      throw new Error(`DB Error: ${error.message}`);
    }

    return data;
  }

  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from('projects')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }
}
