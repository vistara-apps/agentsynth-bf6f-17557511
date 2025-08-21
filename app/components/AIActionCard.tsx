"use client";

import { useState } from "react";
import { FileText, Zap, Loader2 } from "lucide-react";

interface AIActionCardProps {
  variant: "drafting" | "summarizing";
  onGenerate: (content: string) => Promise<void>;
  inputContent: string;
}

export function AIActionCard({ variant, onGenerate, inputContent }: AIActionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const isDrafting = variant === "drafting";
  
  const config = {
    drafting: {
      title: "AI Content Drafting",
      description: "Transform your notes into polished content",
      icon: FileText,
      buttonText: "Generate Draft",
      placeholder: "Your generated draft will appear here...",
    },
    summarizing: {
      title: "Smart Summarization", 
      description: "Get concise summaries of long content",
      icon: Zap,
      buttonText: "Summarize",
      placeholder: "Your summary will appear here...",
    }
  };

  const { title, description, icon: Icon, buttonText, placeholder } = config[variant];

  const handleGenerate = async () => {
    if (!inputContent.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputContent,
          type: isDrafting ? 'draft' : 'summarize'
        }),
      });

      const data = await response.json();
      if (data.content) {
        setResult(data.content);
        await onGenerate(data.content);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent/10 rounded-md">
          <Icon size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-heading">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!inputContent.trim() || isLoading}
        className="btn-accent w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing...
          </>
        ) : (
          buttonText
        )}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-bg rounded-md border border-primary/10">
          <h4 className="font-medium mb-2 text-text-primary">Result:</h4>
          <div className="text-body text-text-secondary whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
