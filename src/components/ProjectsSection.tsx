import { useState } from "react";
import { projects, allTopics, type Project } from "@/data/resumeData";

const INITIAL_COUNT = 3;

interface ProjectsSectionProps {
  className?: string;
  isPrinted: (title: string) => boolean;
}

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group resume-entry">
    <div className="flex items-baseline justify-between gap-4 mb-1">
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      {project.date && (
        <span className="text-xs text-muted-foreground font-body shrink-0">
          {project.date}
        </span>
      )}
    </div>
    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2 print:mb-1">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="text-xs px-2 py-0.5 rounded bg-resume-tag-bg text-resume-tag-text font-body"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const ProjectsSection = ({ className = "", isPrinted }: ProjectsSectionProps) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = activeTopic
    ? projects.filter((p) => p.topics.includes(activeTopic))
    : projects;

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section className={`py-5 ${className}`}>
      <h2 className="text-xl font-bold tracking-wide uppercase text-foreground border-b border-resume-rule pb-1.5 mb-4">
        Projects
      </h2>

      {/* Topic Tabs */}
      <div className="flex flex-wrap gap-2 mb-5 font-body print:hidden">
        <button
          onClick={() => { setActiveTopic(null); setExpanded(false); }}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            activeTopic === null
              ? "bg-primary text-primary-foreground"
              : "bg-resume-tag-bg text-resume-tag-text hover:bg-muted"
          }`}
        >
          All
        </button>
        {allTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => { setActiveTopic(topic); setExpanded(false); }}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTopic === topic
                ? "bg-primary text-primary-foreground"
                : "bg-resume-tag-bg text-resume-tag-text hover:bg-muted"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-4 print:hidden">
        {visible.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* The PDF lists the projects picked in the export dialog, whatever is filtered on screen */}
      <div className="hidden print:block space-y-2">
        {projects.filter((p) => isPrinted(p.title)).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {filtered.length > INITIAL_COUNT && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors font-body print:hidden"
        >
          {expanded ? "Show less ↑" : `Show ${filtered.length - INITIAL_COUNT} more projects ↓`}
        </button>
      )}
    </section>
  );
};

export default ProjectsSection;
