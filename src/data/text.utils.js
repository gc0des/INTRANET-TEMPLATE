const MOJIBAKE_REGEX = /[\u00C3\u00C2\u00E2\u20AC\u00F0\u0178\uFFFD]/;

export function decodePotentialMojibake(value) {
  if (typeof value !== 'string' || !MOJIBAKE_REGEX.test(value)) {
    return value;
  }

  let currentValue = value;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    if (!MOJIBAKE_REGEX.test(currentValue)) {
      break;
    }

    try {
      const bytes = Uint8Array.from(currentValue, (char) => char.charCodeAt(0) & 0xff);
      const decoded = new TextDecoder('utf-8').decode(bytes);

      if (decoded.includes('\uFFFD') || decoded === currentValue) {
        break;
      }

      currentValue = decoded;
    } catch {
      break;
    }
  }

  return currentValue;
}

export function sanitizeText(value) {
  return typeof value === 'string' ? decodePotentialMojibake(value) : value;
}

export function sanitizeDeep(value) {
  if (typeof value === 'string') {
    return sanitizeText(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeDeep(item));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, sanitizeDeep(item)]),
    );
  }

  return value;
}
