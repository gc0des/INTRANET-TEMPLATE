import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, FileText, Grid2x2, Megaphone, Search, ShieldCheck, Users } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";
import { SectionShell } from "../components/SectionShell";
import { TeamPolaroidModal } from "../components/TeamPolaroidModal";
import { ContentModal } from "../components/ContentModal";
import { SystemStatusWidget } from "../components/SystemStatusWidget";
import { useDarkMode } from "../hooks/useDarkMode";
import { PRESENCE_STATUS, PRESENCE_UPDATED_EVENT, readPresenceMap, writePresenceStatus } from "../auth/storage/presence.storage";
import { LANGUAGE_STORAGE_KEY, languages, translateRole, translations } from "../data/i18n.data";
import { birthdayEntries } from "../data/birthdays.data";
import { policiesProcedures } from "../data/policiesProcedures.data";
import { teamMemberEmails } from "../data/teamMemberEmails.data";
import { teamMembers } from "../data/teamMembers.data";
import { appAssets, resolveTeamPhoto } from "../assets";

const BUILD_NUMBER = "1.0.0";
const normalize = (value = "") => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
const presenceAccentMap = { available: "#22c55e", lunch: "#f59e0b", busy: "#dc2626", away: "#eab308", offline: "#ffffff" };
const emailMap = Object.fromEntries(Object.entries(teamMemberEmails).map(([name, emails]) => [normalize(name), emails.map((email) => email.toLowerCase())]));
const applications = [
  { title: "Primary Platform", href: "#", logo: appAssets.primaryApp, description: "Replace with your main internal platform or CRM." },
  { title: "Communication Hub", href: "#", logo: appAssets.collaborationApp, description: "Use this for phone, chat, or internal communication tools." },
  { title: "Knowledge Base", href: "#", logo: appAssets.knowledgeApp, description: "Point this card to documentation, SOPs, or your internal wiki." },
  { title: "Analytics Workspace", href: "#", logo: appAssets.analyticsApp, description: "Use this slot for BI, dashboards, or reporting systems." },
];
const quickCards = [
  { id: "applications", title: "Applications", description: "Centralize the daily tools your team relies on.", icon: Grid2x2 },
  { id: "team", title: "Team Directory", description: "Keep profiles, roles, and presence in one place.", icon: Users },
  { id: "trainings", title: "Trainings", description: "Store onboarding guides and internal learning material.", icon: BookOpen },
  { id: "policies", title: "Policies", description: "Organize procedures, standards, and documentation.", icon: ShieldCheck },
];

function GridCards({ items, onOpen, icon: Icon = FileText }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <button key={item.id ?? item.title} type="button" onClick={() => onOpen?.(item)} className="clean-panel rounded-[1.5rem] p-5 text-left transition hover:-translate-y-1">
          <Icon size={18} style={{ color: "var(--usa-primary)" }} />
          <h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--usa-heading)" }}>{item.title}</h3>
          <p className="mt-2 text-sm leading-7" style={{ color: "var(--usa-muted)" }}>{item.description}</p>
        </button>
      ))}
    </div>
  );
}

export default function AppView({ authUser = null, onSignOut = () => {} }) {
  const [activeView, setActiveView] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [language, setLanguage] = useState(() => window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en");
  const [presenceMap, setPresenceMap] = useState(() => readPresenceMap());
  const [teamQuery, setTeamQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const { isDark, setIsDark } = useDarkMode();
  const mainRef = useRef(null);
  const t = translations[language] ?? translations.en;
  const currentEmail = authUser?.email?.toLowerCase() ?? "";
  const currentPresence = currentEmail ? presenceMap[currentEmail] ?? PRESENCE_STATUS.OFFLINE : PRESENCE_STATUS.OFFLINE;

  useEffect(() => { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language); }, [language]);
  useEffect(() => {
    const sync = () => setPresenceMap(readPresenceMap());
    window.addEventListener("storage", sync);
    window.addEventListener(PRESENCE_UPDATED_EVENT, sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener(PRESENCE_UPDATED_EVENT, sync); };
  }, []);
  useEffect(() => { mainRef.current?.scrollTo({ top: 0, behavior: "instant" }); }, [activeView]);

  const presenceOptions = useMemo(() => [
    { value: PRESENCE_STATUS.AVAILABLE, label: t.common.presenceStatuses.available, color: presenceAccentMap.available },
    { value: PRESENCE_STATUS.LUNCH, label: t.common.presenceStatuses.lunch, color: presenceAccentMap.lunch },
    { value: PRESENCE_STATUS.BUSY, label: t.common.presenceStatuses.busy, color: presenceAccentMap.busy },
    { value: PRESENCE_STATUS.AWAY, label: t.common.presenceStatuses.away, color: presenceAccentMap.away },
    { value: PRESENCE_STATUS.OFFLINE, label: t.common.presenceStatuses.offline, color: presenceAccentMap.offline },
  ], [t]);

  const teamDirectory = useMemo(() => teamMembers.map((member) => {
    const emails = emailMap[normalize(member.name)] ?? [];
    const activeEmail = emails.find((email) => presenceMap[email]);
    const status = activeEmail ? presenceMap[activeEmail] : PRESENCE_STATUS.OFFLINE;
    const option = presenceOptions.find((item) => item.value === status) ?? presenceOptions[presenceOptions.length - 1];
    return { ...member, photo: resolveTeamPhoto(member.photo), roleLabel: translateRole(member, language), presenceLabel: option.label, presenceColor: option.color };
  }), [language, presenceMap, presenceOptions]);

  const filteredTeam = useMemo(() => {
    const query = normalize(teamQuery);
    if (!query) return teamDirectory;
    return teamDirectory.filter((member) => normalize(member.name).includes(query) || normalize(member.roleLabel).includes(query));
  }, [teamDirectory, teamQuery]);

  const monthBirthdays = useMemo(() => {
    const month = new Date().getMonth() + 1;
    return birthdayEntries.filter((entry) => entry.month === month).map((entry) => teamDirectory.find((member) => normalize(member.name) === normalize(entry.name))).filter(Boolean);
  }, [teamDirectory]);
  const dayBirthday = useMemo(() => {
    const today = new Date();
    const item = birthdayEntries.find((entry) => entry.month === today.getMonth() + 1 && entry.day === today.getDate());
    return item ? teamDirectory.find((member) => normalize(member.name) === normalize(item.name)) ?? null : null;
  }, [teamDirectory]);

  const openContent = (item) => setSelectedContent(item);
  const renderHome = () => (
    <div className="space-y-4 2xl:space-y-6">
      <SectionShell eyebrow={t.pages.home.eyebrow} title={t.pages.home.title} description={t.pages.home.description}>
        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {quickCards.map((item) => {
              const Icon = item.icon;
              return <button key={item.id} type="button" onClick={() => setActiveView(item.id)} className="clean-panel rounded-[1.5rem] p-5 text-left transition hover:-translate-y-1"><div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: "var(--usa-panel-soft)", color: "var(--usa-primary)" }}><Icon size={18} /></div><h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--usa-heading)" }}>{item.title}</h3><p className="mt-2 text-sm leading-7" style={{ color: "var(--usa-muted)" }}>{item.description}</p></button>;
            })}
          </div>
          <SystemStatusWidget labels={t.systemStatus} />
        </div>
      </SectionShell>
      <SectionShell eyebrow={t.pages.mural.eyebrow} title={t.pages.mural.title} description={t.pages.mural.description}>
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]"><div className="clean-panel rounded-[1.5rem] p-5"><div className="flex items-center gap-3"><div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: "var(--usa-panel-soft)", color: "var(--usa-primary)" }}><Megaphone size={18} /></div><h3 className="text-lg font-semibold" style={{ color: "var(--usa-heading)" }}>Birthdays this month</h3></div><div className="mt-4 space-y-3">{monthBirthdays.length ? monthBirthdays.map((member) => <button key={member.name} type="button" onClick={() => setSelectedMember(member)} className="flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition hover:border-[#befc00]" style={{ borderColor: "var(--usa-border)", backgroundColor: "var(--usa-panel-soft)" }}><img src={member.photo} alt={member.name} className="h-10 w-10 rounded-xl object-cover" /><span className="font-semibold" style={{ color: "var(--usa-text)" }}>{member.name}</span></button>) : <p style={{ color: "var(--usa-muted)" }}>Add dates to the birthday data file to populate this section.</p>}</div></div><div className="clean-panel rounded-[1.5rem] p-5"><h3 className="text-lg font-semibold" style={{ color: "var(--usa-heading)" }}>Birthday of the day</h3>{dayBirthday ? <div className="mt-4 rounded-[1.5rem] bg-white p-5 shadow-[0_24px_44px_rgba(15,23,17,0.08)]"><img src={dayBirthday.photo} alt={dayBirthday.name} className="aspect-[4/5] w-full rounded-[1.25rem] object-cover" /><h4 className="mt-4 text-xl font-semibold" style={{ color: "#17301d" }}>{dayBirthday.name}</h4><p className="mt-2 text-sm leading-7" style={{ color: "#4b5f53" }}>The team celebrates this special day with you.</p><button type="button" onClick={() => setSelectedMember(dayBirthday)} className="mt-4 rounded-full px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "#befc00", color: "#17301d" }}>Open profile</button></div> : <p className="mt-4 text-sm leading-7" style={{ color: "var(--usa-muted)" }}>No birthday is scheduled for today.</p>}</div></div>
      </SectionShell>
    </div>
  );

  const renderApplications = () => <SectionShell eyebrow={t.pages.applications.eyebrow} title={t.pages.applications.title} description={t.pages.applications.description}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{applications.map((app) => <a key={app.title} href={app.href} target="_blank" rel="noreferrer" className="clean-panel rounded-[1.5rem] p-5 transition hover:-translate-y-1"><img src={app.logo} alt={app.title} className="h-12 w-12 rounded-xl border object-cover" style={{ borderColor: "var(--usa-border)" }} /><h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--usa-heading)" }}>{app.title}</h3><p className="mt-2 text-sm leading-7" style={{ color: "var(--usa-muted)" }}>{app.description}</p></a>)}</div></SectionShell>;
  const renderTeam = () => (
  <SectionShell eyebrow={t.pages.team.eyebrow} title={t.pages.team.title} description={t.pages.team.description}>
    <div
      className="mb-5 flex items-center gap-3 rounded-[1.5rem] border px-4 py-3"
      style={{ borderColor: "var(--usa-border)", backgroundColor: "var(--usa-panel-soft)" }}
    >
      <Search size={16} style={{ color: "var(--usa-primary)" }} />
      <input
        value={teamQuery}
        onChange={(event) => setTeamQuery(event.target.value)}
        placeholder={language === "pt-BR" ? "Buscar colaborador" : language === "es" ? "Buscar colaborador" : "Search team member"}
        className="w-full bg-transparent text-sm outline-none"
        style={{ color: "var(--usa-text)" }}
      />
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filteredTeam.map((member) => (
        <article key={member.name} className="clean-panel rounded-[1.5rem] p-5">
          <div className="flex items-center gap-3">
            <img src={member.photo} alt={member.name} className="h-14 w-14 rounded-2xl object-cover" />
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => setSelectedMember(member)}
                className="block text-left text-lg font-semibold"
                style={{ color: "var(--usa-heading)" }}
              >
                {member.name}
              </button>
              <p className="mt-1 text-sm" style={{ color: "var(--usa-muted)" }}>
                {member.roleLabel}
              </p>
            </div>
          </div>
          <div
            className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              borderColor: member.presenceColor === "#ffffff" ? "var(--usa-border)" : `${member.presenceColor}33`,
              backgroundColor: member.presenceColor === "#ffffff" ? "var(--usa-panel)" : `${member.presenceColor}1f`,
              color: member.presenceColor === "#ffffff" ? "var(--usa-text)" : member.presenceColor,
            }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: member.presenceColor,
                border: member.presenceColor === "#ffffff" ? "1px solid var(--usa-border)" : "none",
              }}
            />
            <span>{member.presenceLabel}</span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedMember(member)}
            className="mt-5 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--usa-secondary)", color: "#10233d" }}
          >
            {t.common.openPolaroid}
          </button>
        </article>
      ))}
    </div>
  </SectionShell>
);
  const renderNewsletter = () => <SectionShell eyebrow={t.pages.newsletter.eyebrow} title={t.pages.newsletter.title} description={t.pages.newsletter.description}><GridCards items={[{ id: "weekly", title: "Weekly Update", description: "Use this slot for recurring internal news or announcements." }, { id: "leaders", title: "Leadership Note", description: "Share strategic notes, executive messages, or recurring summaries." }, { id: "release", title: "Release Notes", description: "Document launches, platform changes, or process updates." }]} onOpen={openContent} /></SectionShell>;
  const renderLegal = () => <SectionShell eyebrow={t.pages.legal.eyebrow} title={t.pages.legal.title} description={t.pages.legal.description}><GridCards items={[{ id: "alert", title: "Compliance Alert", description: "Add legal, regulatory, or compliance notices here." }, { id: "brief", title: "Policy Brief", description: "Use this card for summaries of internal legal guidance." }]} onOpen={openContent} /></SectionShell>;
  const renderTrainings = () => <SectionShell eyebrow={t.pages.trainings.eyebrow} title={t.pages.trainings.title} description={t.pages.trainings.description}><GridCards items={[{ id: "manual", title: "Onboarding Manual", description: "A placeholder for your main onboarding guide." }, { id: "library", title: "Internal Video Library", description: "Use this space for walkthroughs, demos, or training recordings." }]} onOpen={openContent} icon={BookOpen} /></SectionShell>;
  const renderPolicies = () => <SectionShell eyebrow={t.pages.policies.eyebrow} title={t.pages.policies.title} description={t.pages.policies.description}><GridCards items={policiesProcedures} onOpen={openContent} icon={ShieldCheck} /></SectionShell>;

  const renderMain = () => ({ home: renderHome(), dashboard: <SectionShell eyebrow={t.pages.dashboard.eyebrow} title={t.pages.dashboard.title} description={t.pages.dashboard.description}><GridCards items={quickCards} onOpen={(item) => setActiveView(item.id)} icon={Grid2x2} /></SectionShell>, applications: renderApplications(), mural: renderHome().props.children[1], newsletter: renderNewsletter(), team: renderTeam(), legalUpdates: renderLegal(), trainings: renderTrainings(), policies: renderPolicies() }[activeView] ?? renderHome());

  return <div className="relative h-screen w-full overflow-hidden antialiased" style={{ backgroundColor: "#f5fff7" }}><Sidebar activeView={activeView} collapsed={collapsed} onNavigate={setActiveView} onToggle={() => setCollapsed((value) => !value)} labels={{ ...t.sidebar, toggleSidebar: t.common.toggleSidebar }} /><main ref={mainRef} className={`relative h-screen overflow-y-auto transition-all duration-300 ${collapsed ? "ml-[88px]" : "ml-[288px]"}`}><div className="min-h-screen space-y-4 px-4 py-4 2xl:space-y-6 2xl:px-6 2xl:py-6"><TopNav isDark={isDark} onThemeToggle={() => setIsDark((value) => !value)} language={language} onLanguageChange={setLanguage} languages={languages} labels={t.top} authUser={authUser} presenceOptions={presenceOptions} presenceStatus={currentPresence} onPresenceStatusChange={(nextStatus) => { if (!currentEmail) return; writePresenceStatus(currentEmail, nextStatus); setPresenceMap(readPresenceMap()); }} onSignOut={onSignOut} /><AnimatePresence mode="wait" initial={false}><motion.div key={activeView} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: "easeOut" }}>{renderMain()}</motion.div></AnimatePresence><footer className="relative pb-2 pt-1 text-center text-xs font-medium" style={{ color: "#474747" }}><span>Copyright © 2026 Company. All rights reserved. ! Developed by gc0des and uploaded on GitHub</span><span className="absolute right-0 top-1/2 -translate-y-1/2">{t.common.buildLabel} {BUILD_NUMBER}</span></footer></div></main><TeamPolaroidModal member={selectedMember} onClose={() => setSelectedMember(null)} labels={{ closeLabel: t.common.closeModal }} /><ContentModal isOpen={Boolean(selectedContent)} onClose={() => setSelectedContent(null)} eyebrow="Template content" title={selectedContent?.title ?? "Template"} maxWidth="max-w-4xl" closeLabel={t.common.closeModal}><div className="rounded-[1.5rem] border p-5 text-sm leading-7" style={{ borderColor: "var(--usa-border)", backgroundColor: "var(--usa-panel-soft)", color: "var(--usa-text)" }}>{selectedContent?.description ?? selectedContent?.body}</div></ContentModal></div>;
}





