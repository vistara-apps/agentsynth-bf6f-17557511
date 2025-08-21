"use client";

import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { NoteEditor } from "./components/NoteEditor";
import { AIActionCard } from "./components/AIActionCard";
import { USDCBalance } from "./components/USDCBalance";
import { Brain, Sparkles } from "lucide-react";

export default function App() {
  const [noteContent, setNoteContent] = useState("");
  const [activeTab, setActiveTab] = useState<"draft" | "summarize">("draft");

  const handleGenerate = async (content: string) => {
    console.log("Generated content:", content);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center py-6 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain size={32} className="text-accent" />
            <h1 className="text-display text-primary">AgentSynth</h1>
          </div>
          <p className="text-body text-text-secondary">
            Synthesize your thoughts, amplify your content
          </p>
        </div>

        {/* USDC Balance */}
        <USDCBalance />

        {/* Note Editor */}
        <NoteEditor
          value={noteContent}
          onChange={setNoteContent}
          placeholder="Write your thoughts, paste content to summarize, or jot down ideas for your next blog post..."
        />

        {/* AI Action Tabs */}
        <div className="space-y-4">
          <div className="flex gap-2 p-1 bg-surface rounded-lg">
            <button
              onClick={() => setActiveTab("draft")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-fast ${
                activeTab === "draft"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Sparkles size={16} />
              <span className="text-sm font-medium">Draft Content</span>
            </button>
            <button
              onClick={() => setActiveTab("summarize")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-fast ${
                activeTab === "summarize"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Brain size={16} />
              <span className="text-sm font-medium">Summarize</span>
            </button>
          </div>

          <AIActionCard
            variant={activeTab}
            onGenerate={handleGenerate}
            inputContent={noteContent}
          />
        </div>
      </div>
    </AppShell>
  );
}
