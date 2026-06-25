"use client";

import { useWeb3 } from "@/context/web3-context";
import { Bell, Search, Wallet, LogOut, Shield } from "lucide-react";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="h-[73px] border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">

      <div className="relative w-full max-w-md hidden sm:block">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search batches, cryptographic hashes, or tracking IDs..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-slate-900 dark:text-slate-100"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {account ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-col text-right hidden md:block">
              <span className="text-xs font-semibold text-slate-400 flex items-center justify-end gap-1">
                <Shield className="h-3 w-3 text-emerald-500" /> Mainnet Node Secured
              </span>
              <span className="text-xs font-mono font-medium text-slate-900 dark:text-slate-100">
                {formatAddress(account)}
              </span>
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 p-2.5 rounded-xl transition-all"
              title="Disconnect Wallet node"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm shadow-primary/10 transition-all cursor-pointer"
          >
            <Wallet className="h-4 w-4" />
            {isConnecting ? "Connecting Node..." : "Connect MetaMask"}
          </button>
        )}
      </div>
    </header>
  );
}
