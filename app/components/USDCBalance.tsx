"use client";

import { useState, useEffect } from "react";
import { DollarSign } from "lucide-react";

export function USDCBalance() {
  const [balance, setBalance] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching USDC balance
    const fetchBalance = async () => {
      setIsLoading(true);
      // In a real app, this would fetch from the blockchain
      setTimeout(() => {
        setBalance("25.50");
        setIsLoading(false);
      }, 1000);
    };

    fetchBalance();
  }, []);

  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-md">
          <DollarSign size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-secondary">USDC Balance</h3>
          <p className="text-heading">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              `$${balance}`
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
