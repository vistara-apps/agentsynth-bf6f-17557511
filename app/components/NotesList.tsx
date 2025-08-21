
"use client";

import { useState } from "react";
import { FileText, Clock, Hash, Plus, Search } from "lucide-react";
import type { Note } from "../types";

interface NotesListProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
  onNewNote: () => void;
}

export function NotesList({ notes, onNoteSelect, onNewNote }: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => 
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="space-y-4">
      {/* Header with Search */}
      <div className="flex items-center justify-between">
        <h2 className="text-heading">Your Notes</h2>
        <button
          onClick={onNewNote}
          className="btn-accent flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes and tags..."
          className="input-field w-full pl-10"
        />
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="card text-center py-8">
            <FileText className="w-12 h-12 text-text-secondary mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
            <p className="text-text-secondary mb-4">
              Start by creating your first note to organize your thoughts.
            </p>
            <button onClick={onNewNote} className="btn-primary">
              Create First Note
            </button>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.noteId}
              onClick={() => onNoteSelect(note)}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-body line-clamp-3 mb-2">
                    {note.content.substring(0, 150)}
                    {note.content.length > 150 && '...'}
                  </p>
                  
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {note.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-sm text-xs"
                        >
                          <Hash className="w-2 h-2" />
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span className="text-xs text-text-secondary">
                          +{note.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-3 h-3" />
                {formatDate(new Date(note.updatedAt))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
