"use client";

import { useState } from "react";
import { FileText, Zap, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface AIActionCardProps {
  variant: "draft" | "summarize";
  onGenerate: (content: string) => Promise<void>;
  inputContent: string;
}

export function AIActionCard({ variant, onGenerate, inputContent }: AIActionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isDrafting = variant === "draft";
  
  const config = {
    draft: {
      title: "AI Content Drafting",
      description: "Transform your notes into polished content",
      icon: FileText,
      buttonText: "Generate Draft",
      placeholder: "Your generated draft will appear here...",
    },
    summarize: {
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
    setError(null);
    setResult("");
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputContent,
          type: isDrafting ? 'draft' : 'summarize'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      if (data.content) {
        setResult(data.content);
        await onGenerate(data.content);
      } else {
        throw new Error('No content received from the API');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRetry = () => {
    setError(null);
    handleGenerate();
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
        className="btn-accent w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] transition-all duration-300"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span className="ml-2">Processing...</span>
          </>
        ) : (
          <>
            <Icon size={16} />
            <span className="ml-2">{buttonText}</span>
          </>
        )}
      </button>

      {isLoading && !result && !error && (
        <div className="mt-4 p-6 bg-bg rounded-md border border-primary/10 animate-pulse">
          <div className="h-4 bg-primary/10 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-primary/10 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-primary/10 rounded w-5/6"></div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-bg rounded-md border border-red-300 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-2 text-red-700">Error</h4>
              <p className="text-body text-red-600 mb-4">{error}</p>
              <button 
                onClick={handleRetry}
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {result && !error && (
        <div className="mt-4 p-4 bg-bg rounded-md border border-primary/10 animate-fade-in">
          <h4 className="font-medium mb-2 text-text-primary">Result:</h4>
          <div className="text-body text-text-secondary whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
