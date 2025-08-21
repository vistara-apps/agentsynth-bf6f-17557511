"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";

interface OnboardingStep {
  title: string;
  description: string;
  target: string;
}

export function OnboardingGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to AgentSynth!",
      description: "This app helps you organize your thoughts and generate content with AI. Let's take a quick tour.",
      target: "body"
    },
    {
      title: "Write Your Thoughts",
      description: "Use the editor to write notes, ideas, or paste content you want to work with.",
      target: ".note-editor"
    },
    {
      title: "Save Your Notes",
      description: "Save your notes to access them later from the My Notes section.",
      target: ".save-note-button"
    },
    {
      title: "Generate Content",
      description: "Use AI to draft new content or summarize existing text with just a click.",
      target: ".ai-action-card"
    },
    {
      title: "View Your Notes",
      description: "Switch to the Notes view to see all your saved notes.",
      target: ".view-mode-toggle"
    }
  ];

  useEffect(() => {
    // Check if user has seen onboarding
    const onboardingSeen = localStorage.getItem('agentsynth-onboarding-seen');
    if (onboardingSeen) {
      setHasSeenOnboarding(true);
    } else {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('agentsynth-onboarding-seen', 'true');
    setHasSeenOnboarding(true);
  };

  if (!isVisible || hasSeenOnboarding) {
    return null;
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-primary">{currentStepData.title}</h3>
          <button 
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close onboarding guide"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-text-secondary mb-6">{currentStepData.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-accent' : 'bg-accent/30'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="btn-accent py-2 px-4 flex items-center gap-2"
          >
            {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

