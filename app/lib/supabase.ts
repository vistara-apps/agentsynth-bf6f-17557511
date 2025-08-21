
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createUser(userData: { userId: string; walletAddress: string; farcasterId?: string }) {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserByWallet(walletAddress: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('walletAddress', walletAddress)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function createNote(noteData: { userId: string; content: string; tags: string[] }) {
  const { data, error } = await supabase
    .from('notes')
    .insert({
      ...noteData,
      noteId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserNotes(userId: string) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('userId', userId)
    .order('updatedAt', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function updateNote(noteId: string, updates: { content?: string; tags?: string[] }) {
  const { data, error } = await supabase
    .from('notes')
    .update({
      ...updates,
      updatedAt: new Date().toISOString(),
    })
    .eq('noteId', noteId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createContentJob(jobData: { 
  userId: string; 
  type: 'draft' | 'summarize'; 
  inputContent: string; 
  cost: number 
}) {
  const { data, error } = await supabase
    .from('content_jobs')
    .insert({
      ...jobData,
      jobId: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateContentJob(jobId: string, updates: { 
  outputContent?: string; 
  status?: 'pending' | 'processing' | 'completed' | 'failed' 
}) {
  const { data, error } = await supabase
    .from('content_jobs')
    .update(updates)
    .eq('jobId', jobId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
