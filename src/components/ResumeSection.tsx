interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ResumeSection = ({ title, children, className = "" }: ResumeSectionProps) => (
  <section className={`py-5 ${className}`}>
    <h2 className="text-xl font-bold tracking-wide uppercase text-foreground border-b border-resume-rule pb-1.5 mb-4">
      {title}
    </h2>
    {children}
  </section>
);

export default ResumeSection;
