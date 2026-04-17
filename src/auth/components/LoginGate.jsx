import { useEffect, useMemo, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { brandingAssets } from "../../assets";
import { ThemeToggle } from "../../components/ThemeToggle";
import { languages, LANGUAGE_STORAGE_KEY, translations } from "../../data/i18n.data";
import { useDarkMode } from "../../hooks/useDarkMode";

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage && translations[storedLanguage]) {
    return storedLanguage;
  }

  const browserLanguage = navigator.language.startsWith("es")
    ? "es"
    : navigator.language.toLowerCase().startsWith("en")
      ? "en"
      : "pt-BR";

  return translations[browserLanguage] ? browserLanguage : "pt-BR";
}

export function LoginGate({ onAuthenticated }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const { isDark, setIsDark } = useDarkMode();
  const t = useMemo(() => translations[language] || translations["pt-BR"], [language]);
  const labels = t.login;

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(77, 163, 255, 0.10), transparent 18%), radial-gradient(circle at top left, rgba(20, 59, 107, 0.18), transparent 28%), var(--usa-surface)",
      }}
    >
      <div className="flex min-h-screen w-screen items-center justify-center px-6 py-10">
        <div className="clean-panel grid w-full max-w-5xl overflow-hidden rounded-[2rem] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-between px-10 py-10" style={{ backgroundColor: "var(--usa-panel)" }}>
            <div>
              <div className="mb-6 flex items-center justify-end gap-2">
                <ThemeToggle
                  isDark={isDark}
                  onToggle={() => setIsDark((value) => !value)}
                  labels={t.top.theme}
                />
                <div className="clean-panel flex items-center gap-1 rounded-xl px-2 py-1">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setLanguage(item.code)}
                      className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border transition"
                      style={{
                        borderColor: language === item.code ? "var(--usa-secondary)" : "var(--usa-border)",
                        backgroundColor: language === item.code ? "var(--usa-secondary)" : "var(--usa-panel-soft)",
                      }}
                      aria-label={item.label}
                      title={item.label}
                    >
                      <img src={item.flag} alt="" className="h-4 w-6 rounded-[2px] object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "var(--usa-panel-soft)", color: "var(--usa-primary)" }}
              >
                <LockKeyhole size={14} />
                {labels.secureAccess}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={brandingAssets.brandMark}
                  alt="Company"
                  className="h-16 w-16 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: "var(--usa-primary)" }}>
                    {labels.brandEyebrow}
                  </p>
                  <h1 className="mt-2 font-sans text-4xl font-semibold tracking-tight" style={{ color: "var(--usa-heading)" }}>
                    {labels.title}
                  </h1>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-base leading-7" style={{ color: "var(--usa-muted)" }}>
                {labels.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div
                  className="rounded-[1.5rem] border px-5 py-4"
                  style={{ borderColor: "var(--usa-border)", backgroundColor: "var(--usa-panel-soft)" }}
                >
                  <div
                    className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ backgroundColor: "rgba(77,163,255,0.16)", color: "var(--usa-primary)" }}
                  >
                    {labels.allowedDomainEyebrow}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "var(--usa-text)" }}>
                    {language === "pt-BR"
                      ? "Entrada demonstrativa para testes e personalização."
                      : language === "es"
                        ? "Acceso de demostración para pruebas y personalización."
                        : "Demonstration entry for testing and customization."}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--usa-muted)" }}>
                    {language === "pt-BR"
                      ? "Substitua este fluxo pelo método de autenticação que fizer sentido para o seu projeto."
                      : language === "es"
                        ? "Sustituye este flujo por el método de autenticación que tenga sentido para tu proyecto."
                        : "Replace this flow with the authentication method that fits your project."}
                  </p>
                </div>

                <div
                  className="rounded-[1.5rem] border px-5 py-4"
                  style={{ borderColor: "var(--usa-border)", backgroundColor: "var(--usa-panel-soft)" }}
                >
                  <div
                    className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ backgroundColor: "rgba(20,59,107,0.12)", color: "var(--usa-primary)" }}
                  >
                    {labels.accessEyebrow}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "var(--usa-text)" }}>
                    {labels.accessTitle}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--usa-muted)" }}>
                    {labels.accessDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm" style={{ color: "var(--usa-muted)" }}>
              <ShieldCheck size={16} style={{ color: "var(--usa-primary)" }} />
              <span>{labels.footerNote}</span>
            </div>
          </div>

          <div
            className="flex items-center justify-center px-10 py-10"
            style={{ backgroundColor: isDark ? "#13233a" : "#143b6b" }}
          >
            <div
              className="clean-panel w-full max-w-md rounded-[1.75rem] px-8 py-8 shadow-2xl"
              style={{ backgroundColor: "var(--usa-panel)" }}
            >
              <div
                className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ backgroundColor: "rgba(77,163,255,0.16)", color: "var(--usa-primary)" }}
              >
                {labels.loginEyebrow}
              </div>
              <h2 className="mt-5 text-2xl font-semibold" style={{ color: "var(--usa-heading)" }}>
                {labels.loginTitle}
              </h2>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--usa-muted)" }}>
                {language === "pt-BR"
                  ? "Esta tela existe apenas para demonstrar o ponto de entrada do sistema. Ao clicar em Login, você acessa a Home do intranet."
                  : language === "es"
                    ? "Esta pantalla existe solo para demostrar el punto de entrada del sistema. Al hacer clic en Login, accedes al Inicio del intranet."
                    : "This screen exists only to demonstrate the system entry point. When you click Login, you go directly to the intranet Home."}
              </p>

              <div className="mt-8 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onAuthenticated?.({ email: "developer@example.com", name: "Developer", picture: "" })}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{ backgroundColor: "var(--usa-secondary)", color: "#10233d" }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
