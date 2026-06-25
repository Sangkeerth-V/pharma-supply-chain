"use client";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm px-4 py-3 lg:px-6">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-slate-100 text-slate-700 p-2 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Toggle sidebar</span>
        ☰
      </button>
      <div className="text-sm font-medium text-slate-600 dark:text-slate-300">Dashboard</div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-slate-500 dark:text-slate-400 text-xs">Connected to Pharma Ledger</div>
        <button className="rounded-full bg-primary text-white px-4 py-2 text-xs font-semibold hover:bg-primary-dark transition">
          Support
        </button>
      </div>
    </div>
  );
}
