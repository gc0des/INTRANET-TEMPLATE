import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ isDark, onToggle, labels }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="clean-panel inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition hover:-translate-y-0.5"
      style={{ color: "var(--usa-primary)" }}
      aria-label={isDark ? labels.switchToLight : labels.switchToDark}
      title={isDark ? labels.light : labels.dark}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
