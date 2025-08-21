export interface Note {
  noteId: string;
  userId: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

