"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  ShieldCheck, 
  Settings, 
  ChevronLeft, 
  Menu,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Batches & Inventory", href: "/dashboard/batches", icon: Package },
    { name: "Shipments", href: "/dashboard/shipments", icon: Truck },
    { name: "Verification Logs", href: "/dashboard/verify", icon: ShieldCheck },
    { name: "Blockchain Audit", href: "/dashboard/audit", icon: Activity },
    { name: "Profile Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? "280px" : "80px" }}
      className={cn(
        "hidden md:flex flex-col h-screen border-r border-slate-200/60 dark:border-slate-800/60 sticky top-0 bg-white dark:bg-slate-900/50 backdrop-blur-md z-30 transition-all duration-300"
      )}
    >
      {/* Brand Header Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 h-[73px]">
        {isOpen ? (
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="bg-primary p-1.5 rounded-md text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span>Pharma<span className="text-primary">Chain</span></span>
          </div>
        ) : (
          <div className="bg-primary p-1.5 rounded-md text-white mx-auto">
            <ShieldCheck className="h-4 w-4" />
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hidden md:block text-slate-500"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-4 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative cursor-pointer",
                isActive 
                  ? "text-primary bg-primary/5 dark:bg-primary/10" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40"
              )}>
                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                {isOpen && <span className="truncate">{item.name}</span>}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Node Actor Identity Badge Footer */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
        {isOpen ? (
          <div className="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold truncate">Pfizer Corp. (Node)</p>
              <p className="text-slate-400 text-[10px] truncate">Role: Manufacturer</p>
            </div>
          </div>
        ) : (
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mx-auto" />
        )}
      </div>
    </motion.div>
  );
}