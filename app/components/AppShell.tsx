"use client";

import { ReactNode } from "react";
import { 
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Plus, Check } from "lucide-react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    setFrameAdded(Boolean(result));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-fast"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Save Frame</span>
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center gap-2 text-accent animate-fade-in">
          <Check size={16} />
          <span className="text-sm font-medium">Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="w-full max-w-xl mx-auto px-4 py-3 sm:px-6">
        <header className="flex justify-between items-center mb-4 sm:mb-6 h-11">
          <div>
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="mt-6 pt-4 flex justify-center">
          <button
            className="text-text-secondary text-xs hover:text-text-primary transition-colors duration-fast"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}
