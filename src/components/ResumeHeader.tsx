import { personalInfo } from "@/data/resumeData";
import { Mail, MapPin, Globe, Github, Linkedin } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const ResumeHeader = () => (
  <header className="pb-6 border-b border-resume-rule">
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8">
      <img
        src={profileImg}
        alt={personalInfo.name}
        className="w-48 h-48 sm:w-52 sm:h-52 rounded-full object-cover object-top shadow-md shrink-0"
      />
      <div className="text-center sm:text-left">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-2">
          {personalInfo.name}
        </h1>
        <p className="text-xl font-body text-muted-foreground mb-4">{personalInfo.title}</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-base text-muted-foreground font-body">
          <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" /> {personalInfo.email}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {personalInfo.location}
          </span>
          <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Github className="w-4 h-4" /> {personalInfo.github}
          </a>
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default ResumeHeader;
