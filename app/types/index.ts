
export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress: string;
  createdAt: Date;
}

export interface Note {
  noteId: string;
  userId: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  linkedNotes?: string[];
}

export interface ContentJob {
  jobId: string;
  userId: string;
  type: 'draft' | 'summarize';
  inputContent: string;
  outputContent?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  cost: number;
  createdAt: Date;
}

export interface AppState {
  user: User | null;
  notes: Note[];
  activeNote: Note | null;
  balance: number;
  isConnected: boolean;
}
