import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/useTypewriter";
import heroBg from "@/assets/hero-bg.jpg";
import ParticleNetwork from "@/components/ParticleNetwork";

const HeroSection = () => {
  const { displayedText } = useTypewriter("Rafael Martinez", 80);

  const githubLink = import.meta.env.VITE_GITHUB_LINK;
  const linkedinLink = import.meta.env.VITE_LINKEDIN_LINK;
  const emailAddress = import.meta.env.VITE_EMAIL_LINK;
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Particle Network Animation */}
      <ParticleNetwork />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-medium mb-4 animate-fade-in">
            Hello, I'm
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {displayedText}
            <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-blink" />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Passionate about building scalable web and mobile applications using
            Django, React Native, and PostgreSQL. I love creating solutions that
            make a difference.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="#" download aria-label="Download Resume">
                <Download className="mr-2" size={18} />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${emailAddress}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#projects" aria-label="Scroll to projects">
            <ArrowDown className="text-muted-foreground" size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
