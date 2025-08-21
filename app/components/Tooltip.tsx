"use client";

import { ReactNode, useState } from "react";
import { HelpCircle } from "lucide-react";

interface TooltipProps {
  content: string;
  children?: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  showIcon?: boolean;
}

export function Tooltip({ 
  content, 
  children, 
  position = "top",
  showIcon = true 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children || (showIcon && <HelpCircle size={16} className="text-text-secondary cursor-help" />)}
      
      {isVisible && (
        <div 
          className={`absolute z-50 w-64 p-2 bg-primary text-white text-xs rounded shadow-lg animate-fade-in ${positionClasses[position]}`}
          role="tooltip"
        >
          <div className="relative">
            {content}
            {position === "top" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
            )}
            {position === "bottom" && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-primary"></div>
            )}
            {position === "left" && (
              <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-primary"></div>
            )}
            {position === "right" && (
              <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-primary"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

