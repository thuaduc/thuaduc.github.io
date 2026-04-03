interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

const ResumeSection = ({ title, children }: ResumeSectionProps) => (
  <section className="py-5">
    <h2 className="text-xl font-bold tracking-wide uppercase text-foreground border-b border-resume-rule pb-1.5 mb-4">
      {title}
    </h2>
    {children}
  </section>
);

export default ResumeSection;
