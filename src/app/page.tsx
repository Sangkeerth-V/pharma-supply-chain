"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  CheckCircle,
  CircleDot,
  ClipboardList,
  Cpu,
  Database,
  Globe2,
  QrCode,
  Shield,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

type PricingPlan = {
  title: string;
  price: string;
  description: string;
  benefits: string[];
  badge: string;
  featured: boolean;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

const stats = [
  { label: "Secured drug transfers", value: "2.4M+" },
  { label: "Enterprise validation nodes", value: "320+" },
  { label: "Verified shipments/day", value: "98k" },
  { label: "Authenticity confidence", value: "99.98%" },
];

const features: FeatureCard[] = [
  {
    title: "Blockchain provenance",
    description: "Unforgeable medication lineage on a distributed trusted ledger.",
    icon: Shield,
    accent: "from-cyan-400 to-slate-400",
  },
  {
    title: "Real-time shipment telemetry",
    description: "Live custody and location updates across every node.",
    icon: Truck,
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    title: "Instant QR verification",
    description: "Validate batch authenticity at the drop of a scanner.",
    icon: QrCode,
    accent: "from-emerald-400 to-cyan-500",
  },
  {
    title: "Regulatory audit trails",
    description: "Immutable records ready for compliance reviews.",
    icon: ClipboardList,
    accent: "from-slate-400 to-slate-600",
  },
  {
    title: "Pharmacy dashboard suites",
    description: "Actionable risk signals for distributors, pharmacies, and manufacturers.",
    icon: Database,
    accent: "from-blue-400 to-indigo-500",
  },
  {
    title: "Authenticated supply flows",
    description: "A seamless chain from manufacturer to patient with zero blind spots.",
    icon: Globe2,
    accent: "from-teal-400 to-cyan-500",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Dr. Nia Clark",
    role: "Chief Compliance Officer",
    quote: "PharmaLedger gave our network the transparency and trust our regulators demanded.",
    avatar: "NC",
  },
  {
    name: "Mark Devlin",
    role: "Supply Chain Director",
    quote: "Shipment verification used to take days. Now it happens instantly on every pallet.",
    avatar: "MD",
  },
  {
    name: "Sofia Patel",
    role: "Pharmacy Operations Lead",
    quote: "The QR authenticity workflow is polished, fast, and confidence-inspiring.",
    avatar: "SP",
  },
];

const pricing: PricingPlan[] = [
  {
    title: "Core Trace",
    price: "$149",
    description: "Entry-level visibility for manufacturers and distributors.",
    benefits: ["Batch tokenization", "Shipment analytics", "Data export"],
    badge: "Best for pilots",
    featured: false,
  },
  {
    title: "Network Secure",
    price: "$349",
    description: "Full supply chain trust, verification, and drug authenticity workflows.",
    benefits: ["Real-time consensus", "QR verification wall", "Premium support"],
    badge: "Most popular",
    featured: true,
  },
  {
    title: "Enterprise Guardian",
    price: "$649",
    description: "High-scale network governance with advanced audit and policy controls.",
    benefits: ["Governance dashboards", "SLA monitoring", "Enterprise SSO"],
    badge: "For large networks",
    featured: false,
  },
];

const faqs = [
  {
    question: "How does the QR verification screen prevent counterfeit packages?",
    answer:
      "Each QR code is cryptographically linked to on-chain provenance. Validation checks item lineage, manufacturer, distributor, and current custody state instantly.",
  },
  {
    question: "Can manufacturers onboard existing logistics systems?",
    answer:
      "Yes. PharmaLedger offers API adapters for EDI, ERP, and IoT telemetry systems so new proofing layers can sit on top of current workflows.",
  },
  {
    question: "What level of reporting is available for regulatory audits?",
    answer:
      "Detailed chain-of-custody reports, timestamped shipment logs, and authenticity verdict histories are exportable in audit-ready formats.",
  },
];

const heroHighlights = [
  {
    label: "Manufacturer",
    value: "Batch tokenization",
    icon: Cpu,
  },
  {
    label: "Distributor",
    value: "Live custody telemetry",
    icon: Truck,
  },
  {
    label: "Pharmacy",
    value: "Instant QR validation",
    icon: QrCode,
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const staggerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const floatX = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const floatYSpring = useSpring(floatY, { stiffness: 120, damping: 20 });
  const floatXSpring = useSpring(floatX, { stiffness: 120, damping: 20 });
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const pointerX = useSpring(pointer.x, { stiffness: 120, damping: 24 });
  const pointerY = useSpring(pointer.y, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const root = document.documentElement;
    const stored = window.localStorage.getItem("pharmaledger-theme");
    const preferred = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred as "light" | "dark");
    root.classList.toggle("dark", preferred === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("pharmaledger-theme", theme);
  }, [theme]);

  useEffect(() => {
    const move = (event: PointerEvent) => setPointer({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div className="relative overflow-hidden text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950">
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,#060b14_0%,#0f172a_58%,#020617_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ x: pointerX, y: pointerY }}
      >
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),transparent_32%)] blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-slate-200/20 dark:border-slate-800/50 backdrop-blur-xl bg-slate-950/40 dark:bg-slate-950/40 px-6 lg:px-16 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950 shadow-2xl shadow-cyan-500/20">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">PharmaLedger</p>
            <p className="text-base font-semibold">Supply Chain Trust OS</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#hero" className="transition hover:text-cyan-300">Home</a>
          <a href="#features" className="transition hover:text-cyan-300">Features</a>
          <a href="#dashboard" className="transition hover:text-cyan-300">Dashboard</a>
          <a href="#pricing" className="transition hover:text-cyan-300">Pricing</a>
          <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
        </nav>

        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <CircleDot className="h-4 w-4" />
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </button>
          <Link href="/auth/register" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:scale-[1.01]">
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>
        <section id="hero" ref={heroRef} className="relative overflow-hidden px-6 pb-24 pt-10 lg:px-16 lg:pt-16">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-12 lg:flex-row lg:items-center">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="relative z-10 flex-1"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-slate-950/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200 shadow-lg shadow-cyan-500/10 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Pharma supply chain — verified
              </div>
              <h1 className="mt-8 max-w-3xl text-5xl font-black tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
                End-to-end medicine tracking with <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-400 bg-clip-text text-transparent">real-time blockchain trust</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                Designed for manufacturers, distributors, pharmacies, and regulators who need seamless verification, audit-ready shipment telemetry, and a premium dashboard experience.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  Secure your network
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/verify"
                  className="inline-flex items-center justify-center rounded-full border border-slate-500/40 bg-slate-950/80 px-8 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:bg-slate-900"
                >
                  View QR verification
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 140, damping: 16 }}
                    className="glassmorphism border border-slate-700/60 p-5 rounded-3xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/80 text-cyan-300 shadow-lg shadow-cyan-500/10">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                    <p className="mt-3 font-semibold text-slate-100">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: floatYSpring, x: floatXSpring }}
              className="relative grid w-full flex-1 place-items-center"
            >
              <div className="absolute left-0 top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="absolute right-0 bottom-8 h-36 w-36 rounded-full bg-violet-500/15 blur-3xl" />
              <motion.div
                variants={cardVariant}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="relative flex w-full max-w-xl flex-col gap-5 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl"
              >
                <div className="absolute inset-x-5 top-5 h-24 rounded-[2rem] bg-gradient-to-r from-cyan-400/20 via-slate-700/10 to-violet-500/20 blur-2xl" />
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Live tracking preview</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">Shipment dashboard</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 ring-1 ring-slate-200/10">
                    <CircleDot className="h-3.5 w-3.5 text-emerald-400" />
                    Consensus active
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-900/80 p-5">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400" />
                  <div className="relative z-10 grid gap-5 sm:grid-cols-[1fr_0.9fr]">
                    <div className="space-y-4">
                      <div className="rounded-3xl bg-slate-950/90 p-5 shadow-lg shadow-slate-950/20">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Scan-ready batch</p>
                        <div className="mt-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-2xl font-semibold text-white">#B-9321</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">verified batch</p>
                          </div>
                          <div className="rounded-3xl bg-slate-900/90 p-3 text-cyan-300">
                            <QrCode className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-3xl bg-slate-950/90 p-5 shadow-lg shadow-slate-950/20">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Blockchain status</p>
                        <div className="mt-3 flex items-center gap-4">
                          <div className="space-y-1">
                            <p className="text-2xl font-semibold text-white">0x3f9...ab5d</p>
                            <p className="text-sm text-slate-500">Transaction confirmed</p>
                          </div>
                          <div className="rounded-3xl bg-slate-900/90 p-3 text-violet-300">
                            <Database className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative rounded-[2rem] border border-slate-800/70 bg-slate-900/90 p-5 shadow-lg shadow-slate-950/20">
                      <div className="absolute inset-x-5 top-5 h-24 rounded-[1.75rem] bg-gradient-to-r from-cyan-500/20 via-slate-700/0 to-violet-400/20" />
                      <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-3xl bg-slate-950/85 p-3 text-center text-slate-300">
                            <p className="text-3xl font-semibold text-white">98%</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">authentic</p>
                          </div>
                          <div className="rounded-3xl bg-slate-950/85 p-3 text-center text-slate-300">
                            <p className="text-3xl font-semibold text-white">4.8s</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">avg verify</p>
                          </div>
                          <div className="rounded-3xl bg-slate-950/85 p-3 text-center text-slate-300">
                            <p className="text-3xl font-semibold text-white">21</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">live networks</p>
                          </div>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-800/60 bg-slate-950/80 p-4">
                          <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
                            <span>Chain flow</span>
                            <span>2m/sec</span>
                          </div>
                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                            <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                          </div>
                          <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-500">
                            <span>Manufacturer</span>
                            <span>Pharmacy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
        </section>

        <section id="features" className="relative px-6 pb-24 lg:px-16">
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Capabilities</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Premium analytics for every supply chain participant.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">A modular network experience that blends blockchain assurance, pharmacy verification, and manufacturer control into one elegant platform.</p>
            </div>

            <motion.div
              variants={staggerVariant}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={cardVariant}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/25 backdrop-blur-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 opacity-0 transition duration-700 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-cyan-300 shadow-xl shadow-cyan-500/10">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-sm uppercase tracking-[0.3em] text-slate-400">{feature.title}</p>
                  <p className="mt-4 text-lg font-semibold text-white">{feature.description}</p>
                  <div className={`mt-6 inline-flex rounded-full bg-gradient-to-r ${feature.accent} px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-950 shadow-lg shadow-slate-950/10`}>
                    Explore
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="about" className="relative px-6 pb-24 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About the system</p>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">A premium verification layer for pharmaceutical logistics.</h2>
              <p className="max-w-2xl text-slate-400 leading-8">PharmaLedger weaves supply chain telemetry, blockchain identity, and secure verification into a single intuitive interface built for the high-stakes healthcare ecosystem.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Supply chain flow</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">Manufacturer → Distributor → Pharmacy</h3>
                  <p className="mt-3 text-slate-400">Every transfer is tracked, timestamped, and validated through smart contract consensus at multiple custody checkpoints.</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Verification protocol</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">QR authenticity on demand</h3>
                  <p className="mt-3 text-slate-400">Pharmacy staff scan packages and receive instant trust decisions with an audit trail and drug heritage summary.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl"
            >
              <div className="absolute -left-24 top-8 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -right-20 bottom-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="relative z-10 grid gap-6">
                <div className="rounded-[2rem] bg-slate-950/95 p-6 ring-1 ring-slate-600/30">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Blockchain transaction</p>
                      <p className="mt-3 text-xl font-semibold text-white">Batch record confirmed</p>
                    </div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-400 to-violet-500 text-white shadow-lg shadow-violet-500/20">
                      <Database className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Block", "0x3f9...ab5d"],
                      ["Latency", "1.2s"],
                      ["Verifier", "Node 14"],
                      ["Status", "Finalized"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                        <p className="text-slate-500">{label}</p>
                        <p className="mt-2 font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Interactive map</p>
                  <div className="mt-6 grid gap-4 rounded-[1.75rem] bg-slate-900/80 p-6 text-slate-300">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Supply chain map</span>
                      <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">Live</span>
                    </div>
                    <div className="relative h-56 rounded-[1.5rem] bg-gradient-to-br from-slate-950 to-slate-900 p-5">
                      <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full bg-slate-950/95 px-3 py-2 text-xs text-slate-300 shadow-xl shadow-slate-950/20">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        Manufacturer
                      </div>
                      <div className="absolute right-8 top-20 flex items-center gap-3 rounded-full bg-slate-950/95 px-3 py-2 text-xs text-slate-300 shadow-xl shadow-slate-950/20">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                        Distributor
                      </div>
                      <div className="absolute left-14 bottom-10 flex items-center gap-3 rounded-full bg-slate-950/95 px-3 py-2 text-xs text-slate-300 shadow-xl shadow-slate-950/20">
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                        Pharmacy
                      </div>
                      <div className="absolute inset-x-5 top-24 h-1 rounded-full bg-gradient-to-r from-cyan-400/40 via-slate-600/20 to-violet-400/40" />
                      <div className="absolute left-[32%] top-36 h-1 w-[40%] rounded-full bg-gradient-to-r from-cyan-400/40 to-violet-400/40" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="dashboard" className="relative px-6 pb-24 lg:px-16">
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Dashboard preview</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Glassmorphism analytics for pharma operations.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">A high-definition cockpit for monitoring shipments, validating authenticity, and responding to anomalies with confidence.</p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
              <motion.div
                variants={cardVariant}
                whileHover={{ y: -6 }}
                className="glassmorphism rounded-[2.5rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/20"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Network health</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">Live shipment pulse</h3>
                  </div>
                  <div className="rounded-full bg-slate-950/80 px-4 py-2 text-sm text-slate-300">Verified 12m ago</div>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Trust score", "98.6%"],
                    ["Active nodes", "14"],
                    ["Auth checks", "184k"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[2rem] bg-slate-900/85 p-5 text-white shadow-xl shadow-slate-950/10">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
                      <p className="mt-3 text-2xl font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
                  <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
                    <span>Verification histogram</span>
                    <span>24h trend</span>
                  </div>
                  <div className="grid gap-3">
                    {[80, 92, 74, 96, 88, 100, 76].map((value, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-24">{`Hour ${index + 1}`}</span>
                        <div className="relative flex-1 overflow-hidden rounded-full bg-slate-800/80">
                          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{ width: `${value}%` }} />
                        </div>
                        <span>{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariant}
                whileHover={{ y: -6 }}
                className="space-y-6"
              >
                <div className="glassmorphism rounded-[2.5rem] border border-white/10 p-6 shadow-2xl shadow-slate-950/20">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Activity timeline</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">Recent chain events</h3>
                    </div>
                    <Sparkles className="h-7 w-7 text-cyan-300" />
                  </div>
                  <div className="mt-6 space-y-4">
                    {[
                      { title: "Manufacturer seal created", time: "2m ago" },
                      { title: "Distributor custody logged", time: "10m ago" },
                      { title: "Pharmacy batch accepted", time: "18m ago" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300">
                          <Activity className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glassmorphism rounded-[2.5rem] border border-white/10 p-6 shadow-2xl shadow-slate-950/20">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Auth score</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">Drug authenticity index</h3>
                    </div>
                    <ShieldCheck className="h-7 w-7 text-violet-300" />
                  </div>
                  <div className="mt-8 flex items-end gap-4">
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-slate-800/80">
                        <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                      </div>
                      <p className="mt-4 text-sm text-slate-400">System-wide authenticity confidence is 99.98% across scanned packages.</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-right text-white">
                      <p className="text-2xl font-semibold">99.98%</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Verified</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="testimonials" className="relative px-6 pb-24 lg:px-16">
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Trusted by teams</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Built for mission-critical pharma teams.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">A polished user experience that keeps operations aligned, audits prepared, and verification fast.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glassmorphism rounded-[2.5rem] border border-white/10 p-8 shadow-2xl shadow-slate-950/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-violet-500 text-xl font-semibold text-slate-950 shadow-xl shadow-cyan-500/20">
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                  <p className="mt-8 leading-8 text-slate-300">“{testimonials[activeTestimonial].quote}”</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-4 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/20">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    className={`rounded-3xl border px-5 py-4 text-left transition ${index === activeTestimonial ? "border-cyan-400/30 bg-slate-900/90 text-white" : "border-slate-800/50 bg-slate-950/80 text-slate-300 hover:border-cyan-400/20 hover:bg-slate-900/80"}`}
                  >
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{testimonial.role}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="pricing" className="relative px-6 pb-24 lg:px-16">
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Plans</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Flexible pricing for regulated networks.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">From pilots to governed enterprise networks, choose a plan that matches your scale and review requirements.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {pricing.map((plan) => (
                <motion.div
                  key={plan.title}
                  layout
                  whileHover={{ y: -8 }}
                  className={`relative overflow-hidden rounded-[2.5rem] border p-8 shadow-2xl transition ${plan.featured ? "border-cyan-400/30 bg-slate-950/80 shadow-cyan-500/20" : "border-white/10 bg-slate-950/70 shadow-slate-950/15"}`}
                >
                  {plan.featured && <motion.div layoutId="featured-plan" className="absolute inset-0 rounded-[2.5rem] bg-cyan-400/10 blur-xl" />}
                  <div className="relative z-10 space-y-5">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">{plan.badge}</p>
                      <h3 className="mt-4 text-3xl font-semibold text-white">{plan.title}</h3>
                    </div>
                    <p className="text-slate-400">{plan.description}</p>
                    <div className="text-5xl font-black tracking-tight text-white">{plan.price}</div>
                    <div className="space-y-3">
                      {plan.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="h-4 w-4 text-cyan-400" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <button className={`w-full rounded-full px-5 py-3 text-sm font-semibold transition ${plan.featured ? "bg-cyan-400 text-slate-950" : "border border-slate-700/50 bg-slate-900/80 text-slate-100 hover:bg-slate-800"}`}>
                      Choose plan
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="faq" className="relative px-6 pb-24 lg:px-16">
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">FAQ</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Trusted answers for your security team.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">Questions around audits, onboarding, and verification are answered with clarity and confidence.</p>
            </div>

            <div className="grid gap-4">
              {faqs.map((item, index) => (
                <motion.div
                  key={item.question}
                  layout
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-slate-950/20"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 text-left text-white"
                  >
                    <span className="font-semibold">{item.question}</span>
                    <span className="text-sm text-cyan-300">{activeFaq === index ? "Close" : "Open"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeFaq === index ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="mt-4 overflow-hidden text-slate-400"
                      >
                        {item.answer}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="relative px-6 pb-24 lg:px-16">
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Let’s connect</p>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Ready to bring trusted pharma provenance to your network?</h2>
              <p className="max-w-xl text-slate-400 leading-8">Book a demo or start a pilot with our team to see supply chain verification, live analytics, and compliant reporting in action.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-slate-950/80 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Email</p>
                  <p className="mt-3 text-lg font-semibold text-white">hello@pharmaledger.ai</p>
                </div>
                <div className="rounded-[2rem] bg-slate-950/80 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Support</p>
                  <p className="mt-3 text-lg font-semibold text-white">support@pharmaledger.ai</p>
                </div>
              </div>
            </div>

            <motion.form
              variants={cardVariant}
              className="space-y-6 rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl shadow-slate-950/20"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Name</span>
                  <input className="w-full rounded-3xl border border-slate-800/70 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10" type="text" placeholder="Alicia Torres" />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Company</span>
                  <input className="w-full rounded-3xl border border-slate-800/70 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10" type="text" placeholder="Global Pharma Co." />
                </label>
              </div>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Email</span>
                <input className="w-full rounded-3xl border border-slate-800/70 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10" type="email" placeholder="alicia@pharmaledger.ai" />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Message</span>
                <textarea className="min-h-[178px] w-full rounded-3xl border border-slate-800/70 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10" placeholder="Tell us about your supply chain goals..."></textarea>
              </label>
              <button className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5">
                Book a demo
              </button>
            </motion.form>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-slate-800/40 bg-slate-950/80 px-6 py-10 text-slate-400 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">PharmaLedger</p>
            <p className="mt-4 max-w-2xl text-sm text-slate-500">A premium drug provenance platform for modern pharmaceutical supply chains.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <Link href="#features" className="transition hover:text-slate-200">Features</Link>
            <Link href="#dashboard" className="transition hover:text-slate-200">Dashboard</Link>
            <Link href="#pricing" className="transition hover:text-slate-200">Pricing</Link>
            <Link href="#contact" className="transition hover:text-slate-200">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
