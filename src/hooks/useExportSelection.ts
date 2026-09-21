import { useCallback, useEffect, useState } from "react";
import { experiences, education, projects, skills, certificates } from "@/data/resumeData";

export type SectionKey = "summary" | "experience" | "education" | "projects" | "skills" | "certificates";

export interface ExportSelection {
  sections: Record<SectionKey, boolean>;
  items: Record<SectionKey, Record<string, boolean>>;
}

export const STORAGE_KEY = "cv-export-selection";
export const DEFAULT_PROJECT_COUNT = 3;

export const experienceKey = (e: { title: string; company: string }) => e.title + e.company;

export const exportCatalog: { key: SectionKey; label: string; items: { key: string; label: string }[] }[] = [
  { key: "summary", label: "Summary", items: [] },
  {
    key: "experience",
    label: "Experience",
    items: experiences.map((e) => ({ key: experienceKey(e), label: `${e.title} · ${e.company}` })),
  },
  { key: "education", label: "Education", items: education.map((e) => ({ key: e.degree, label: e.degree })) },
  { key: "projects", label: "Projects", items: projects.map((p) => ({ key: p.title, label: p.title })) },
  { key: "skills", label: "Skills", items: Object.keys(skills).map((c) => ({ key: c, label: c })) },
  { key: "certificates", label: "Certificates", items: certificates.map((c) => ({ key: c.title, label: c.title })) },
];

export const defaultSelection = (): ExportSelection => {
  const selection = { sections: {}, items: {} } as ExportSelection;
  for (const section of exportCatalog) {
    selection.sections[section.key] = true;
    selection.items[section.key] = Object.fromEntries(
      section.items.map((item, i) => [item.key, section.key !== "projects" || i < DEFAULT_PROJECT_COUNT]),
    );
  }
  return selection;
};

// The CV changes over time, so a saved selection only overrides entries that still exist.
const loadSelection = (): ExportSelection => {
  const selection = defaultSelection();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<ExportSelection> | null;
    for (const section of exportCatalog) {
      const savedSection = saved?.sections?.[section.key];
      if (typeof savedSection === "boolean") selection.sections[section.key] = savedSection;
      for (const item of section.items) {
        const savedItem = saved?.items?.[section.key]?.[item.key];
        if (typeof savedItem === "boolean") selection.items[section.key][item.key] = savedItem;
      }
    }
  } catch {
    return defaultSelection();
  }
  return selection;
};

export const useExportSelection = () => {
  const [selection, setSelection] = useState<ExportSelection>(loadSelection);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {
      // Storage can be unavailable (private mode); the selection still works for this visit.
    }
  }, [selection]);

  const toggleSection = useCallback((section: SectionKey) => {
    setSelection((s) => ({ ...s, sections: { ...s.sections, [section]: !s.sections[section] } }));
  }, []);

  const toggleItem = useCallback((section: SectionKey, key: string) => {
    setSelection((s) => ({
      ...s,
      items: { ...s.items, [section]: { ...s.items[section], [key]: !s.items[section][key] } },
    }));
  }, []);

  const reset = useCallback(() => setSelection(defaultSelection()), []);

  const isSectionIncluded = (section: SectionKey) => {
    if (!selection.sections[section]) return false;
    const items = Object.values(selection.items[section]);
    return items.length === 0 || items.some(Boolean);
  };

  const isItemIncluded = (section: SectionKey, key: string) =>
    selection.sections[section] && !!selection.items[section][key];

  return { selection, toggleSection, toggleItem, reset, isSectionIncluded, isItemIncluded };
};

export type ExportSelectionApi = ReturnType<typeof useExportSelection>;
