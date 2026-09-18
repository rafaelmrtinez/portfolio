import { ExternalLink, Github, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  tags: string[];
  type: string;
  github: string;
  demo: string;
  longDescription?: string;
  features?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge
                variant={project.type === "Real World" ? "default" : "secondary"}
                className="mb-2"
              >
                {project.type}
              </Badge>
              <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-base pt-2">
            {project.longDescription || project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button asChild variant="outline" className="flex-1">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} className="mr-2" />
                View Code
              </a>
            </Button>
            <Button asChild className="flex-1">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                e.preventDefault();
                if (project.demo === "#") {
                  alert("Demo is not available for this project.");
                  return;
                }
              }}>
                <ExternalLink size={18} className="mr-2" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
