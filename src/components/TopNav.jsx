import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function TopNav({
  isDark,
  onThemeToggle,
  language,
  onLanguageChange,
  languages,
  labels,
  authUser,
  presenceOptions = [],
  presenceStatus = "offline",
  onPresenceStatusChange = () => {},
  onSignOut,
}) {
  const currentPresenceOption =
    presenceOptions.find((option) => option.value === presenceStatus) ?? presenceOptions[0] ?? null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className="clean-panel sticky top-4 z-30 rounded-[1.75rem] px-4 py-4 2xl:top-6 2xl:px-6 2xl:py-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] 2xl:px-4" style={{ color: "var(--usa-primary)" }}>
          {labels.workspace}
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] 2xl:px-4" style={{ color: "var(--usa-primary)" }}>
            {labels.language}
          </div>
          <div className="clean-panel flex items-center gap-1 rounded-xl px-2 py-1">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => onLanguageChange(item.code)}
                className={`inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border transition ${language === item.code ? "bg-[#befc00]" : ""}`}
                style={{
                  borderColor: language === item.code ? "#befc00" : "var(--usa-border)",
                  backgroundColor: language === item.code ? "#befc00" : "var(--usa-panel-soft)",
                }}
                aria-label={item.label}
                title={item.label}
              >
                <img src={item.flag} alt="" className="h-4 w-6 rounded-[2px] object-cover" />
              </button>
            ))}
          </div>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} labels={labels.theme} />
          {authUser ? (
            <div className="clean-panel flex items-center gap-2 rounded-xl px-2 py-1">
              <div
                className="hidden items-center gap-2 rounded-lg px-3 py-2 lg:flex"
                style={{ backgroundColor: "var(--usa-panel-soft)" }}
              >
                {authUser.picture ? (
                  <img
                    src={authUser.picture}
                    alt={authUser.name || authUser.email}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : null}
                <div className="text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--usa-primary)" }}>
                    {labels.authLabel}
                  </p>
                  <p className="max-w-[180px] truncate text-xs" style={{ color: "var(--usa-muted)" }}>
                    {authUser.email}
                  </p>
                </div>
              </div>
              {currentPresenceOption ? (
                <label
                  className="hidden items-center gap-2 rounded-lg px-3 py-2 lg:flex"
                  style={{ backgroundColor: "var(--usa-panel-soft)" }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--usa-primary)" }}>
                    {labels.status}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: currentPresenceOption.color }}
                  />
                  <div
                    className="relative overflow-hidden rounded-lg border"
                    style={{ borderColor: "var(--usa-border)", backgroundColor: "var(--usa-panel)" }}
                  >
                    <select
                      value={presenceStatus}
                      onChange={(event) => onPresenceStatusChange(event.target.value)}
                      className="appearance-none bg-transparent px-3 py-2 pr-8 text-xs font-semibold outline-none"
                      style={{ color: "var(--usa-text)" }}
                      aria-label={labels.status}
                    >
                      {presenceOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          style={{ color: "#17301d", backgroundColor: "#f5fff7" }}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px]"
                      style={{ color: "var(--usa-primary)" }}
                    >
                      ▼
                    </span>
                  </div>
                </label>
              ) : null}
              <button
                type="button"
                onClick={onSignOut}
                className="rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition"
                style={{ color: "var(--usa-primary)", backgroundColor: "var(--usa-panel-soft)" }}
              >
                {labels.signOut}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </motion.header>
  );
}
