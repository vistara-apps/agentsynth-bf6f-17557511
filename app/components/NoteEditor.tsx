"use client";

import { useState, useEffect } from "react";
import { Edit3, Save, Check } from "lucide-react";

interface NoteEditorProps {
  variant?: "default" | "compact";
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function NoteEditor({ 
  variant = "default", 
  value = "", 
  onChange,
  placeholder = "Start writing your thoughts..."
}: NoteEditorProps) {
  const [content, setContent] = useState(value);
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  // Load saved content from localStorage on initial render
  useEffect(() => {
    const savedContent = localStorage.getItem('agentsynth-note');
    if (savedContent && !value) {
      setContent(savedContent);
      onChange?.(savedContent);
    }
  }, [onChange, value]);

  const handleChange = (newValue: string) => {
    setContent(newValue);
    onChange?.(newValue);
    setIsSaved(false);
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('agentsynth-note', content);
    
    // Update UI
    setIsSaved(true);
    setSaveCount(prev => prev + 1);
    
    // Reset saved indicator after 2 seconds
    setTimeout(() => setIsSaved(false), 2000);
  };

  const isCompact = variant === "compact";

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Edit3 size={18} className="text-accent sm:size-20" />
          <h3 className="text-xl sm:text-2xl font-semibold">Notes</h3>
        </div>
        <div className="flex items-center gap-2">
          {saveCount > 0 && (
            <span className="text-xs text-text-secondary hidden sm:inline-block">
              {saveCount} {saveCount === 1 ? 'save' : 'saves'}
            </span>
          )}
          <button
            onClick={handleSave}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-md transition-all duration-fast ${
              isSaved 
                ? "bg-green-100 text-green-700" 
                : "bg-accent/10 text-accent hover:bg-accent/20"
            }`}
          >
            {isSaved ? (
              <Check size={14} className="sm:size-16 animate-bounce-subtle" />
            ) : (
              <Save size={14} className="sm:size-16" />
            )}
            <span className="text-xs sm:text-sm">{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full input-field resize-none ${
          isCompact ? "h-20 sm:h-24" : "h-32 sm:h-40"
        }`}
      />
    </div>
  );
}
