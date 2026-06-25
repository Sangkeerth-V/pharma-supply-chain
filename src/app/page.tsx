"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Cpu, RefreshCw, Layers, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const stats = [
    { label: "Secured Transactions", value: "2.4M+" },
    { label: "Active Enterprise Nodes", value: "120+" },
    { label: "Verification Latency", value: "< 1.2s" },
    { label: "Counterfeit Reductions", value: "99.8%" },
  ];

  const steps = [
    { title: "Manufacturer", desc: "Tokenize batch via smart contract allocation.", icon: Cpu },
    { title: "Distributor", desc: "Log real-time custody & environmental metrics.", icon: Layers },
    { title: "Pharmacy", desc: "Validate verifiable credentials upon ingestion.", icon: RefreshCw },
    { title: "Consumer", desc: "Scan cryptographic QR matrix instantly.", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-x-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glassmorphism border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-primary p-2 rounded-lg text-white">
            <Shield className="h-5 w-5" />
          </div>
          <span>Pharma<span className="text-primary">Ledger</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#workflow" className="hover:text-primary transition-colors">Architecture</a>
          <a href="#stats" className="hover:text-primary transition-colors">Metrics</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/auth/register" className="bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 pt-20 pb-24 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-6">
            <CheckCircle className="h-3.5 w-3.5" /> Next-Gen Pharmaceutical Trust Protocol
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-50 dark:via-blue-100 dark:to-indigo-200">
            Cryptographic Integrity For the Global Drug Supply
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Mitigate item counterfeiting, track chain of custody transparently, and verify item lineage using real-time distributed consensus and automated smart contracts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="w-full sm:w-auto bg-primary text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group">
              Deploy Enterprise Node <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/verify" className="w-full sm:w-auto glassmorphism border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium px-8 py-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all">
              Verify Batch Instantly
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Workflow Visualization Section */}
      <section id="workflow" className="px-6 lg:px-16 py-20 border-t border-slate-200 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Immutable Chain of Custody</h2>
            <p className="text-slate-600 dark:text-slate-400">Track structural integrity down to the individual consumer transaction wrapper.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glassmorphism p-6 rounded-2xl relative border border-slate-200/60 dark:border-slate-800/60"
              >
                <div className="bg-primary/10 text-primary p-3 rounded-xl inline-block mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700 font-bold">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Counter Section */}
      <section id="stats" className="px-6 lg:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-primary tracking-tight mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 px-6 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
        <div>© 2026 PharmaLedger Inc. All systems cryptographic.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Security Framework</a>
          <a href="#" className="hover:underline">Etherscan Node Docs</a>
          <a href="#" className="hover:underline">Privacy Architecture</a>
        </div>
      </footer>
    </div>
  );
}