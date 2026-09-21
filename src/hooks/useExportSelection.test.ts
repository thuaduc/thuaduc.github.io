import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { projects, experiences } from "@/data/resumeData";
import {
  useExportSelection,
  defaultSelection,
  DEFAULT_PROJECT_COUNT,
  STORAGE_KEY,
} from "./useExportSelection";

const expKey = experiences[0].title + experiences[0].company;

describe("useExportSelection", () => {
  beforeEach(() => localStorage.clear());

  it("includes everything by default except projects beyond the first few", () => {
    const { result } = renderHook(() => useExportSelection());

    expect(result.current.isSectionIncluded("summary")).toBe(true);
    expect(result.current.isItemIncluded("experience", expKey)).toBe(true);
    projects.forEach((p, i) => {
      expect(result.current.isItemIncluded("projects", p.title)).toBe(i < DEFAULT_PROJECT_COUNT);
    });
  });

  it("toggles a single item", () => {
    const { result } = renderHook(() => useExportSelection());

    act(() => result.current.toggleItem("experience", expKey));
    expect(result.current.isItemIncluded("experience", expKey)).toBe(false);
    expect(result.current.isSectionIncluded("experience")).toBe(true);

    act(() => result.current.toggleItem("experience", expKey));
    expect(result.current.isItemIncluded("experience", expKey)).toBe(true);
  });

  it("excludes all items of an unticked section but remembers their state", () => {
    const { result } = renderHook(() => useExportSelection());

    act(() => result.current.toggleSection("experience"));
    expect(result.current.isSectionIncluded("experience")).toBe(false);
    expect(result.current.isItemIncluded("experience", expKey)).toBe(false);

    act(() => result.current.toggleSection("experience"));
    expect(result.current.isItemIncluded("experience", expKey)).toBe(true);
  });

  it("excludes a section when none of its items are ticked", () => {
    const { result } = renderHook(() => useExportSelection());

    act(() => experiences.forEach((e) => result.current.toggleItem("experience", e.title + e.company)));
    expect(result.current.isSectionIncluded("experience")).toBe(false);
  });

  it("persists the selection and restores it", () => {
    const first = renderHook(() => useExportSelection());
    act(() => first.result.current.toggleSection("certificates"));
    first.unmount();

    const second = renderHook(() => useExportSelection());
    expect(second.result.current.isSectionIncluded("certificates")).toBe(false);
  });

  it("falls back to defaults for entries missing from a saved selection", () => {
    const saved = defaultSelection();
    delete saved.items.projects[projects[0].title];
    saved.items.projects["A project that no longer exists"] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

    const { result } = renderHook(() => useExportSelection());
    expect(result.current.isItemIncluded("projects", projects[0].title)).toBe(true);
  });

  it("ignores corrupt saved data", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    const { result } = renderHook(() => useExportSelection());
    expect(result.current.selection).toEqual(defaultSelection());
  });

  it("resets to defaults", () => {
    const { result } = renderHook(() => useExportSelection());
    act(() => result.current.toggleSection("skills"));
    act(() => result.current.reset());
    expect(result.current.selection).toEqual(defaultSelection());
  });
});
