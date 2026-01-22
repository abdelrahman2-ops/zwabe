

export function flatten(obj, prefix = "", updates = {}) {
  for (const key in obj) {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flatten(value, path, updates);
    } else {
      updates[path] = value;
    }
  }
  return updates;
}
