import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProjectModal from "@/components/ProjectModal";

const projects = [
  {
    title: "Barangay Resource and Unified Governance System",
    description:
      "A comprehensive governance system designed to streamline barangay operations, resource management, and citizen services.",
    longDescription:
      "A comprehensive governance system designed to streamline barangay operations, resource management, and citizen services. Co-authored project focused on improving local government efficiency through digital transformation.",
    tags: ["Django", "PostgreSQL", "Government Tech"],
    type: "Real World",
    github: import.meta.env.VITE_GITHUB_LINK,
    demo: "#",
    features: [
      "Citizen registration and document management",
      "Resource allocation and tracking",
      "Complaint management system",
      "Report generation and analytics",
      "Role-based access control",
    ],
  },
  {
    title: "Time Tracker App",
    description:
      "A productivity application for tracking work hours, managing tasks, and generating time reports.",
    longDescription:
      "A productivity application for tracking work hours, managing tasks, and generating time reports. Built to help professionals and teams stay organized and accountable with their time management.",
    tags: ["React Native", "Supabase", "Mobile"],
    type: "Real World",
    github: import.meta.env.VITE_GITHUB_LINK,
    demo: "#",
    features: [
      "Real-time time tracking with start/stop functionality",
      "Project and task categorization",
      "Weekly and monthly reports",
      "Cross-platform mobile support",
      "Cloud sync across devices",
    ],
  },
  // {
  //   title: "Side Project 1",
  //   description:
  //     "A personal project showcasing modern web development practices with focus on clean code and user experience.",
  //   tags: ["React", "TypeScript", "Tailwind"],
  //   type: "Side Project",
  //   github: "#",
  //   demo: "#",
  //   features: [
  //     "Modern React patterns and hooks",
  //     "Fully typed with TypeScript",
  //     "Responsive design with Tailwind CSS",
  //   ],
  // },
  // {
  //   title: "Side Project 2",
  //   description:
  //     "An experimental application exploring new technologies and development patterns.",
  //   tags: ["Docker", "PostgreSQL", "API"],
  //   type: "Side Project",
  //   github: "#",
  //   demo: "#",
  //   features: [
  //     "Containerized development environment",
  //     "RESTful API design",
  //     "Database optimization techniques",
  //   ],
  // },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-4" ref={ref}>
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my work, from real-world applications to side
            projects that showcase my skills and passion for development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group hover:shadow-lg transition-all duration-500 border-border hover:border-primary/50 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge
                      variant={project.type === "Real World" ? "default" : "secondary"}
                      className="mb-2"
                    >
                      {project.type}
                    </Badge>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={project.github}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View source code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.demo}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View live demo"
                      onClick={(e) => {
                        if (project.demo === "#") {
                          e.preventDefault();
                          alert("Demo is not available for this project.");
                          return;
                        }
                        e.stopPropagation();
                      }}
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
