"use client";

import { useState, useEffect } from "react";
import { DollarSign, AlertCircle, RefreshCw } from "lucide-react";

export function USDCBalance() {
  const [balance, setBalance] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBalance = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would fetch from the blockchain
      // Simulate API call with random success/failure
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful response 90% of the time
      if (Math.random() > 0.1) {
        // Generate a random balance between 10 and 100
        const randomBalance = (10 + Math.random() * 90).toFixed(2);
        setBalance(randomBalance);
        setLastUpdated(new Date());
      } else {
        // Simulate error
        throw new Error("Failed to fetch balance");
      }
    } catch (err) {
      console.error("Error fetching balance:", err);
      setError("Could not retrieve balance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="card" aria-live="polite">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-md" aria-hidden="true">
            <DollarSign size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary" id="balance-label">USDC Balance</h3>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <p className="text-heading animate-pulse-custom" aria-label="Loading balance information">
                  Loading...
                </p>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">Error loading balance</span>
                </div>
              ) : (
                <p className="text-heading" aria-label={`${balance} US dollars`}>
                  ${balance}
                </p>
              )}
            </div>
            {lastUpdated && !isLoading && !error && (
              <p className="text-xs text-text-secondary mt-1">
                Updated {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        
        {!isLoading && (
          <button 
            onClick={fetchBalance}
            className="p-2 text-accent hover:text-accent/80 transition-colors"
            aria-label="Refresh balance"
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
          <span>{error}</span>
          <button 
            onClick={fetchBalance}
            className="text-accent hover:underline ml-1"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
