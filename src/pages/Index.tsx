import ResumeHeader from "@/components/ResumeHeader";
import ResumeSection from "@/components/ResumeSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExportDialog from "@/components/ExportDialog";
import PrintFrame from "@/components/PrintFrame";
import { experiences, education, skills, personalInfo, certificates } from "@/data/resumeData";
import { useExportSelection, experienceKey } from "@/hooks/useExportSelection";

// Unticked entries stay on the website and only drop out of the printed PDF.
const printClass = (included: boolean) => (included ? "" : "print:hidden");

const Index = () => {
  const exportSelection = useExportSelection();
  const { isSectionIncluded, isItemIncluded } = exportSelection;

  return (
    <div className="min-h-screen print:min-h-0 bg-background">
      <main className="max-w-[800px] print:max-w-none mx-auto px-4 sm:px-6 py-8 md:py-16 print:py-0 print:px-[14mm]">
        <PrintFrame>
        <div className="flex justify-end mb-4 print:hidden">
          <ExportDialog {...exportSelection} />
        </div>

        <ResumeHeader />

        {/* Summary */}
        <ResumeSection title="Summary" className={printClass(isSectionIncluded("summary"))}>
          <p className="text-sm leading-relaxed text-muted-foreground font-body">
            {personalInfo.summary}
          </p>
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Experience" className={printClass(isSectionIncluded("experience"))}>
          <div className="flex flex-col gap-5 print:gap-2">
            {experiences.map((exp) => (
              <div
                key={experienceKey(exp)}
                className={`resume-entry ${printClass(isItemIncluded("experience", experienceKey(exp)))}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-body">{exp.period}</span>
                </div>
                <p className="text-sm text-muted-foreground font-body italic mb-2 print:mb-0.5">
                  {exp.company} · {exp.location}
                </p>
                <ul className="list-disc list-outside ml-4 space-y-1 print:space-y-0">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-foreground/80 font-body leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education" className={printClass(isSectionIncluded("education"))}>
          <div className="flex flex-col gap-3 print:gap-1.5">
            {education.map((edu) => (
              <div key={edu.degree} className={`resume-entry ${printClass(isItemIncluded("education", edu.degree))}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{edu.degree}</h3>
                  <span className="text-xs text-muted-foreground font-body">{edu.period}</span>
                </div>
                <p className="text-sm text-muted-foreground font-body italic mb-1 print:mb-0">
                  {edu.school} · {edu.location}
                </p>
                {edu.details && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5">
                    {edu.details.map((d, i) => (
                      <li key={i} className="text-sm text-foreground/80 font-body">{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Projects with tabs */}
        <ProjectsSection
          className={printClass(isSectionIncluded("projects"))}
          isPrinted={(title) => isItemIncluded("projects", title)}
        />

        {/* Skills */}
        <ResumeSection title="Skills" className={printClass(isSectionIncluded("skills"))}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:gap-x-6 print:gap-y-1.5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className={`resume-entry ${printClass(isItemIncluded("skills", category))}`}>
                <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-0.5 rounded bg-resume-tag-bg text-resume-tag-text font-body"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Certificates */}
        <ResumeSection title="Certificates" className={printClass(isSectionIncluded("certificates"))}>
          <div className="flex flex-col gap-3 print:gap-1.5">
            {certificates.map((cert) => (
              <div key={cert.title} className={`resume-entry ${printClass(isItemIncluded("certificates", cert.title))}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
                  <h3 className="font-heading text-base font-semibold text-foreground">{cert.title}</h3>
                  <span className="text-xs text-muted-foreground font-body">{cert.date}</span>
                </div>
                <p className="text-sm text-muted-foreground font-body italic mb-1 print:mb-0">{cert.issuer}</p>
                <p className="text-sm text-foreground/80 font-body">{cert.description}</p>
              </div>
            ))}
          </div>
        </ResumeSection>

        </PrintFrame>
      </main>
    </div>
  );
};

export default Index;
