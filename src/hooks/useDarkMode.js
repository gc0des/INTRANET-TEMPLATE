import { useEffect, useState } from "react";

const STORAGE_KEY = "intranet-theme";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return saved === "dark";
    }

    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return { isDark, setIsDark };
}
