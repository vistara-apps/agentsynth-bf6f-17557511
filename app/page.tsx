"use client";

import { useState, useEffect } from "react";
import { AppShell } from "./components/AppShell";
import { NoteEditor } from "./components/NoteEditor";
import { AIActionCard } from "./components/AIActionCard";
import { USDCBalance } from "./components/USDCBalance";
import { NotesList } from "./components/NotesList";
import { Tooltip } from "./components/Tooltip";
import { OnboardingGuide } from "./components/OnboardingGuide";
import { Brain, Sparkles, List, Edit, HelpCircle } from "lucide-react";
import type { Note } from "./types";

export default function App() {
  const [noteContent, setNoteContent] = useState("");
  const [activeTab, setActiveTab] = useState<"draft" | "summarize">("draft");
  const [viewMode, setViewMode] = useState<"editor" | "notes">("editor");
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('agentsynth-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse saved notes:', e);
      }
    }
  }, []);

  const handleGenerate = async (content: string) => {
    console.log("Generated content:", content);
  };

  const handleNewNote = () => {
    setActiveNote(null);
    setNoteContent("");
    setViewMode("editor");
  };

  const handleNoteSelect = (note: Note) => {
    setActiveNote(note);
    setNoteContent(note.content);
    setViewMode("editor");
  };

  const handleSaveNote = () => {
    if (!noteContent.trim()) return;
    
    const now = new Date();
    
    if (activeNote) {
      // Update existing note
      const updatedNotes = notes.map(note => 
        note.noteId === activeNote.noteId 
          ? { ...note, content: noteContent, updatedAt: now } 
          : note
      );
      setNotes(updatedNotes);
      setActiveNote({ ...activeNote, content: noteContent, updatedAt: now });
      localStorage.setItem('agentsynth-notes', JSON.stringify(updatedNotes));
    } else {
      // Create new note
      const newNote: Note = {
        noteId: Date.now().toString(),
        userId: 'local-user',
        content: noteContent,
        tags: [],
        createdAt: now,
        updatedAt: now
      };
      
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      setActiveNote(newNote);
      localStorage.setItem('agentsynth-notes', JSON.stringify(updatedNotes));
    }
  };

  return (
    <AppShell>
      {/* Onboarding Guide */}
      <OnboardingGuide />
      
      <div className="space-y-4 sm:space-y-6">
        {/* Hero Section */}
        <div className="text-center py-4 sm:py-6 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain size={28} className="text-accent sm:size-32" />
            <h1 className="text-2xl sm:text-3xl font-semibold text-primary">AgentSynth</h1>
            <Tooltip content="AgentSynth helps you organize your thoughts and generate content with AI. Start by writing in the editor below.">
              <HelpCircle size={16} className="text-text-secondary cursor-help" />
            </Tooltip>
          </div>
          <p className="text-sm sm:text-base text-text-secondary">
            Synthesize your thoughts, amplify your content
          </p>
        </div>

        {/* USDC Balance */}
        <USDCBalance />

        {/* View Mode Toggle */}
        <div className="flex gap-1 sm:gap-2 p-1 bg-surface rounded-lg view-mode-toggle">
          <div className="flex-1 relative">
            <button
              onClick={() => setViewMode("editor")}
              className={`w-full flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-md transition-colors duration-fast ${
                viewMode === "editor"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Edit size={16} />
              <span className="text-xs sm:text-sm font-medium">Editor</span>
            </button>
            <div className="absolute top-0 right-1">
              <Tooltip content="Write and edit your notes here. You can also use AI to generate content based on your notes." position="bottom">
              </Tooltip>
            </div>
          </div>
          <div className="flex-1 relative">
            <button
              onClick={() => setViewMode("notes")}
              className={`w-full flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-md transition-colors duration-fast ${
                viewMode === "notes"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <List size={16} />
              <span className="text-xs sm:text-sm font-medium">My Notes</span>
            </button>
            <div className="absolute top-0 right-1">
              <Tooltip content="View and manage all your saved notes here. Click on a note to edit it." position="bottom">
              </Tooltip>
            </div>
          </div>
        </div>

        {viewMode === "editor" ? (
          <>
            {/* Note Editor */}
            <div className="note-editor">
              <NoteEditor
                value={noteContent}
                onChange={setNoteContent}
                placeholder="Write your thoughts, paste content to summarize, or jot down ideas for your next blog post..."
              />
            </div>

            {/* Save Note Button */}
            <div className="save-note-button">
              <button
                onClick={handleSaveNote}
                disabled={!noteContent.trim()}
                className="w-full btn-primary mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {activeNote ? "Update Note" : "Save as New Note"}
              </button>
            </div>

            {/* AI Action Tabs */}
            <div className="space-y-4 ai-action-card">
              <div className="flex gap-1 sm:gap-2 p-1 bg-surface rounded-lg relative">
                <div className="absolute -top-6 right-0 flex items-center gap-1">
                  <span className="text-xs text-text-secondary">AI Tools</span>
                  <Tooltip content="Use AI to transform your notes into polished content or get concise summaries. Write your content in the editor above first." position="left">
                  </Tooltip>
                </div>
                <div className="flex-1 relative">
                  <button
                    onClick={() => setActiveTab("draft")}
                    className={`w-full flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-md transition-colors duration-fast ${
                      activeTab === "draft"
                        ? "bg-accent text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <Sparkles size={16} />
                    <span className="text-xs sm:text-sm font-medium">Draft Content</span>
                  </button>
                  <div className="absolute top-0 right-1">
                    <Tooltip content="Transform your notes into a well-structured blog post or article." position="bottom">
                    </Tooltip>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <button
                    onClick={() => setActiveTab("summarize")}
                    className={`w-full flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-md transition-colors duration-fast ${
                      activeTab === "summarize"
                        ? "bg-accent text-white"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <Brain size={16} />
                    <span className="text-xs sm:text-sm font-medium">Summarize</span>
                  </button>
                  <div className="absolute top-0 right-1">
                    <Tooltip content="Get a concise summary of your notes or any pasted content." position="bottom">
                    </Tooltip>
                  </div>
                </div>
              </div>

              <AIActionCard
                variant={activeTab}
                onGenerate={handleGenerate}
                inputContent={noteContent}
              />
            </div>
          </>
        ) : (
          <NotesList
            notes={notes}
            onNoteSelect={handleNoteSelect}
            onNewNote={handleNewNote}
          />
        )}
      </div>
    </AppShell>
  );
}
