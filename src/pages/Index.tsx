import ResumeHeader from "@/components/ResumeHeader";
import ResumeSection from "@/components/ResumeSection";
import ProjectsSection from "@/components/ProjectsSection";
import { experiences, education, skills, personalInfo, certificates } from "@/data/resumeData";

const Index = () => (
  <div className="min-h-screen bg-background">
    <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 md:py-16">
      <ResumeHeader />

      {/* Summary */}
      <ResumeSection title="Summary">
        <p className="text-sm leading-relaxed text-muted-foreground font-body">
          {personalInfo.summary}
        </p>
      </ResumeSection>

      {/* Experience */}
      <ResumeSection title="Experience">
        <div className="space-y-5">
          {experiences.map((exp) => (
            <div key={exp.title + exp.company}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {exp.title}
                </h3>
                <span className="text-xs text-muted-foreground font-body">{exp.period}</span>
              </div>
              <p className="text-sm text-muted-foreground font-body italic mb-2">
                {exp.company} · {exp.location}
              </p>
              <ul className="list-disc list-outside ml-4 space-y-1">
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
      <ResumeSection title="Education">
        {education.map((edu) => (
          <div key={edu.degree}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
              <h3 className="font-heading text-lg font-semibold text-foreground">{edu.degree}</h3>
              <span className="text-xs text-muted-foreground font-body">{edu.period}</span>
            </div>
            <p className="text-sm text-muted-foreground font-body italic mb-1">
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
      </ResumeSection>

      {/* Skills */}
      <ResumeSection title="Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
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

      {/* Projects with tabs */}
      <ProjectsSection />

      {/* Certificates */}
      <ResumeSection title="Certificates">
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div key={cert.title}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
                <h3 className="font-heading text-base font-semibold text-foreground">{cert.title}</h3>
                <span className="text-xs text-muted-foreground font-body">{cert.date}</span>
              </div>
              <p className="text-sm text-muted-foreground font-body italic mb-1">{cert.issuer}</p>
              <p className="text-sm text-foreground/80 font-body">{cert.description}</p>
            </div>
          ))}
        </div>
      </ResumeSection>

    </main>
  </div>
);

export default Index;
