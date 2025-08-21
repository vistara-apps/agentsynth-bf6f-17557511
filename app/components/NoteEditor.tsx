"use client";

import { useState } from "react";
import { Edit3, Save } from "lucide-react";

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

  const handleChange = (newValue: string) => {
    setContent(newValue);
    onChange?.(newValue);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const isCompact = variant === "compact";

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Edit3 size={20} className="text-accent" />
          <h3 className="text-heading">Notes</h3>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-fast ${
            isSaved 
              ? "bg-green-100 text-green-700" 
              : "bg-accent/10 text-accent hover:bg-accent/20"
          }`}
        >
          <Save size={16} />
          <span className="text-sm">{isSaved ? "Saved" : "Save"}</span>
        </button>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full input-field resize-none ${
          isCompact ? "h-24" : "h-40"
        }`}
      />
    </div>
  );
}
