"use client";

import { useState } from "react";
import { FilePlus, Clock, Search, Trash2 } from "lucide-react";
import type { Note } from "../types";
import { Tooltip } from "./Tooltip";

interface NotesListProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
  onNewNote: () => void;
}

export function NotesList({ notes, onNoteSelect, onNewNote }: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredNotes = notes.filter(note => 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getPreviewText = (content: string) => {
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  };
  
  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter(note => note.noteId !== noteId);
      localStorage.setItem('agentsynth-notes', JSON.stringify(updatedNotes));
      // Force a reload to update the notes list
      window.location.reload();
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold">My Notes</h3>
        <button
          onClick={onNewNote}
          className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
        >
          <FilePlus size={16} />
          <span className="text-sm">New Note</span>
        </button>
      </div>
      
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 input-field"
        />
      </div>
      
      {filteredNotes.length === 0 ? (
        <div className="text-center py-8">
          {notes.length === 0 ? (
            <div className="space-y-2">
              <p className="text-text-secondary">You don't have any notes yet.</p>
              <button
                onClick={onNewNote}
                className="text-accent hover:underline"
              >
                Create your first note
              </button>
            </div>
          ) : (
            <p className="text-text-secondary">No notes match your search.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotes.map(note => (
            <div
              key={note.noteId}
              onClick={() => onNoteSelect(note)}
              className="p-3 border border-primary/10 rounded-md hover:border-accent/30 hover:bg-surface transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary line-clamp-2 text-sm sm:text-base">
                    {getPreviewText(note.content)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">
                      {formatDate(new Date(note.updatedAt))}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteNote(note.noteId, e)}
                  className="ml-2 p-1 text-text-secondary hover:text-red-500 transition-colors"
                  aria-label="Delete note"
                >
                  <Tooltip content="Delete this note" position="left">
                    <Trash2 size={16} />
                  </Tooltip>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

