import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Contact,
  Grid2x2,
  House,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { brandingAssets } from "../assets";

export function Sidebar({ activeView, collapsed, onNavigate, onToggle, labels }) {
  const sidebarItems = [
    { id: "home", label: labels.nav.home, icon: House },
    { id: "dashboard", label: labels.nav.dashboard, icon: BriefcaseBusiness },
    { id: "applications", label: labels.nav.applications, icon: Grid2x2 },
    { id: "mural", label: labels.nav.mural, icon: Bell },
    { id: "newsletter", label: labels.nav.newsletter, icon: Scale },
    { id: "team", label: labels.nav.team, icon: Contact },
    { id: "legalUpdates", label: labels.nav.legalUpdates, icon: Sparkles },
    { id: "trainings", label: labels.nav.trainings, icon: BookOpen },
    { id: "policies", label: labels.nav.policies, icon: ShieldCheck },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 288 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="fixed inset-y-0 left-0 z-40 hidden overflow-hidden lg:block"
      style={{
        background:
          "linear-gradient(180deg, #102b4a 0%, #12345b 55%, #0d2340 100%)",
      }}
    >
      <div className="flex h-full min-h-0 flex-col px-3 py-3 2xl:px-4 2xl:py-4">
        <div className="mb-5 2xl:mb-8">
          <button
            type="button"
            onClick={onToggle}
            className="flex w-full min-w-0 items-center gap-3 rounded-2xl px-2.5 py-1.5 text-left transition hover:bg-white/10 2xl:px-3"
            aria-label={labels.toggleSidebar}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white 2xl:h-12 2xl:w-12">
              <img
                src={brandingAssets.brandMark}
                alt="Company logo"
                className="h-full w-full object-cover"
              />
            </div>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="min-w-0"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {labels.brandEyebrow}
                  </p>
                  <p className="truncate text-base font-semibold text-white 2xl:text-lg">
                    {labels.brandName}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1 2xl:space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`group flex w-full items-center rounded-2xl text-left text-sm font-medium text-white transition hover:bg-white/10 hover:text-[#4da3ff] 2xl:py-3 ${
                  collapsed
                    ? "justify-center px-0 py-2.5"
                    : "justify-start gap-3 px-2.5 py-2.5 2xl:px-3"
                } ${activeView === item.id ? "bg-white/10 text-[#8cc4ff]" : ""}`}
              >
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition group-hover:bg-[#4da3ff] group-hover:text-[#10233d] 2xl:h-11 2xl:w-11 ${
                    activeView === item.id ? "bg-[#4da3ff] text-[#10233d]" : "bg-white/10 text-white"
                  }`}
                >
                  <Icon size={18} />
                </span>
                {!collapsed && <span className="flex-1 text-left leading-snug">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
}
