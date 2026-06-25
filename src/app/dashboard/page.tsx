"use client";

import { motion } from "framer-motion";
import { Users, Package, Truck, ShieldAlert, Activity, ArrowUpRight } from "lucide-react";

export default function DashboardOverviewPage() {
  const metrics = [
    { title: "Total Verified Users", value: "1,240", change: "+12% this month", icon: Users, color: "text-blue-500 bg-blue-500/10" },
    { title: "Active Medicine Batches", value: "8,432", change: "Immutable Registry", icon: Package, color: "text-indigo-500 bg-indigo-500/10" },
    { title: "Shipments In-Transit", value: "142", change: "GPS & Temp Monitored", icon: Truck, color: "text-emerald-500 bg-emerald-500/10" },
    { title: "Verification Anomalies", value: "0", change: "Perfect Integrity", icon: ShieldAlert, color: "text-slate-400 bg-slate-400/10" },
  ];

  const simulatedTransactions = [
    { tx: "0x8fa1...3b92", action: "Batch Creation", actor: "Pfizer Node 1", status: "Success", time: "3 mins ago" },
    { tx: "0x3e12...9f1a", action: "Ownership Custody Transfer", actor: "DHL Logistic Hub", status: "Success", time: "14 mins ago" },
    { tx: "0x7bc4...de45", action: "Pharmacy Ingestion Verified", actor: "CVS Pharmacy", status: "Success", time: "1 hour ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Global Ledger Control</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time verification indices across your active nodes and logistical pipelines.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{card.title}</span>
              <div className={`p-2.5 rounded-xl ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-black tracking-tight">{card.value}</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">{card.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="text-primary h-5 w-5" />
            <h2 className="text-lg font-bold tracking-tight">Recent Blockchain Block Events</h2>
          </div>
          <span className="text-xs text-primary font-semibold hover:underline cursor-pointer flex items-center gap-0.5">
            View Ledger Scanner <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                <th className="pb-3">Transaction Hash</th>
                <th className="pb-3">Action Manifest</th>
                <th className="pb-3">Executing Actor Node</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {simulatedTransactions.map((row, idx) => (
                <tr key={idx} className="text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 font-mono text-primary text-xs">{row.tx}</td>
                  <td className="py-4">{row.action}</td>
                  <td className="py-4 text-xs text-slate-500">{row.actor}</td>
                  <td className="py-4 text-xs text-slate-400">{row.time}</td>
                  <td className="py-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500">
                      ● {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
