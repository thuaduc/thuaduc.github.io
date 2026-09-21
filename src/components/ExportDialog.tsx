import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { exportCatalog, type ExportSelectionApi } from "@/hooks/useExportSelection";

// Long enough for the dialog's close animation to finish, so it never ends up in the PDF.
const PRINT_DELAY_MS = 300;

const ExportDialog = ({ selection, toggleSection, toggleItem, reset }: ExportSelectionApi) => {
  const [open, setOpen] = useState(false);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    if (!printing) return;
    const timer = setTimeout(() => {
      setPrinting(false);
      window.print();
    }, PRINT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [printing]);

  const handleExport = () => {
    setOpen(false);
    setPrinting(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="font-body print:hidden">
          <Download className="w-4 h-4" /> Export PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] flex flex-col font-body print:hidden">
        <DialogHeader>
          <DialogTitle>Export CV as PDF</DialogTitle>
          <DialogDescription>
            Choose what to include, then pick "Save as PDF" in the print dialog.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto -mx-6 px-6 space-y-4">
          {exportCatalog.map((section) => {
            const sectionOn = selection.sections[section.key];
            return (
              <div key={section.key}>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground cursor-pointer">
                  <Checkbox checked={sectionOn} onCheckedChange={() => toggleSection(section.key)} />
                  {section.label}
                </label>
                {section.items.length > 0 && (
                  <div className="mt-2 ml-6 space-y-2">
                    {section.items.map((item) => (
                      <label
                        key={item.key}
                        className={`flex items-start gap-2 text-sm text-muted-foreground ${
                          sectionOn ? "cursor-pointer" : "opacity-50"
                        }`}
                      >
                        <Checkbox
                          className="mt-0.5"
                          disabled={!sectionOn}
                          checked={selection.items[section.key][item.key]}
                          onCheckedChange={() => toggleItem(section.key, item.key)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={reset}>Reset</Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4" /> Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
