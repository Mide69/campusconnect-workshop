import { categories, opportunities } from "./data.js";

export const storageKey = "campusconnect.v1";

export function isOpportunity(item) {
  return (
    item &&
    typeof item.id === "string" &&
    item.id.length > 0 &&
    ["title", "organisation", "location", "description", "commitment"].every(
      (field) => typeof item[field] === "string" && item[field].trim(),
    ) &&
    categories.includes(item.category) &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.deadline) &&
    Number.isFinite(Date.parse(item.deadline)) &&
    typeof item.remote === "boolean"
  );
}

export function readState(storage) {
  try {
    const stored = JSON.parse(storage.getItem(storageKey));
    const listings = Array.isArray(stored?.listings)
      ? stored.listings.filter(isOpportunity)
      : [];
    const knownIds = new Set(
      [...opportunities, ...listings].map((item) => item.id),
    );
    const saved = Array.isArray(stored?.saved)
      ? [...new Set(stored.saved.filter((id) => knownIds.has(id)))]
      : [];
    return { listings, saved };
  } catch {
    return { listings: [], saved: [] };
  }
}

export function writeState(storage, state) {
  try {
    storage.setItem(storageKey, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function selectOpportunities(
  items,
  {
    query = "",
    category = "All",
    savedOnly = false,
    saved = [],
    remoteOnly = false,
    sort = "recommended",
  } = {},
) {
  const term = query.trim().toLowerCase();
  const matches = items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      (!savedOnly || saved.includes(item.id)) &&
      (!remoteOnly || item.remote) &&
      [item.title, item.organisation, item.description, item.location]
        .join(" ")
        .toLowerCase()
        .includes(term),
  );
  if (sort === "deadline")
    matches.sort((a, b) => a.deadline.localeCompare(b.deadline));
  if (sort === "title") matches.sort((a, b) => a.title.localeCompare(b.title));
  return matches;
}

export function validateListing(values) {
  const errors = {};
  for (const field of [
    "title",
    "organisation",
    "location",
    "description",
    "commitment",
  ]) {
    if (!values[field]?.trim()) errors[field] = "Please complete this field.";
  }
  if (!categories.includes(values.category))
    errors.category = "Choose a category.";
  const date = new Date(values.deadline + "T00:00:00");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(values.deadline) ||
    !Number.isFinite(date.getTime())
  )
    errors.deadline = "Choose a valid deadline.";
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) errors.deadline = "Choose today or a future date.";
  }
  return errors;
}
