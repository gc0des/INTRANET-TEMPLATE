export const PRESENCE_STORAGE_KEY = "company-presence-map";
export const PRESENCE_UPDATED_EVENT = "company-presence-updated";

export const PRESENCE_STATUS = {
  AVAILABLE: "available",
  LUNCH: "lunch",
  BUSY: "busy",
  AWAY: "away",
  OFFLINE: "offline",
};

const DEFAULT_PRESENCE_MAP = {};

function emitPresenceUpdate(presenceMap) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PRESENCE_UPDATED_EVENT, { detail: presenceMap }));
}

export function readPresenceMap() {
  if (typeof window === "undefined") return DEFAULT_PRESENCE_MAP;
  try {
    const raw = window.localStorage.getItem(PRESENCE_STORAGE_KEY);
    if (!raw) return DEFAULT_PRESENCE_MAP;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : DEFAULT_PRESENCE_MAP;
  } catch {
    return DEFAULT_PRESENCE_MAP;
  }
}

export function writePresenceMap(presenceMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PRESENCE_STORAGE_KEY, JSON.stringify(presenceMap));
  emitPresenceUpdate(presenceMap);
}

export function readPresenceStatus(email) {
  if (!email) return PRESENCE_STATUS.OFFLINE;
  const presenceMap = readPresenceMap();
  return presenceMap[email.toLowerCase()] ?? PRESENCE_STATUS.OFFLINE;
}

export function writePresenceStatus(email, status) {
  if (!email) return readPresenceMap();
  const normalizedEmail = email.toLowerCase();
  const nextMap = { ...readPresenceMap(), [normalizedEmail]: status };
  writePresenceMap(nextMap);
  return nextMap;
}
