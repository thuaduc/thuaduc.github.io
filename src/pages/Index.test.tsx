import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import Index from "./Index";

// The page behind an open dialog is aria-hidden, hence `hidden: true`.
const section = (title: string) =>
  screen.getByRole("heading", { level: 2, name: title, hidden: true }).closest("section")!;

describe("CV export", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    window.print = vi.fn();
  });
  afterEach(() => vi.useRealTimers());

  it("hides unticked sections and items from print only", () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("button", { name: /export pdf/i }));
    const dialog = screen.getByRole("dialog");

    fireEvent.click(within(dialog).getByLabelText("Certificates"));
    fireEvent.click(within(dialog).getByLabelText(/Teaching Assistant Tutor/));

    expect(section("Certificates")).toHaveClass("print:hidden");
    expect(section("Experience")).not.toHaveClass("print:hidden");
    const tutor = screen.getByRole("heading", { level: 3, name: "Teaching Assistant Tutor", hidden: true });
    expect(tutor.closest(".resume-entry")).toHaveClass("print:hidden");
  });

  it("prints exactly the ticked projects regardless of what is shown on screen", () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("button", { name: /export pdf/i }));
    fireEvent.click(within(screen.getByRole("dialog")).getByLabelText("PDF Parser"));

    const printList = section("Projects").querySelector(".print\\:block")!;
    const titles = within(printList as HTMLElement).getAllByRole("heading", { level: 3, hidden: true }).map((h) => h.textContent);
    expect(titles).toHaveLength(4);
    expect(titles).toContain("PDF Parser");
  });

  it("closes the dialog before opening the print dialog", () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("button", { name: /export pdf/i }));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Export" }));

    expect(window.print).not.toHaveBeenCalled();
    act(() => vi.runAllTimers());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.print).toHaveBeenCalledTimes(1);
  });
});
