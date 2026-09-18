import { Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    title: "Site Reliability Engineer Intern",
    company: "OpsWerks",
    period: "June 29, 2026 - Present",
    description:
      "Selected for the OpsWerks Academy, an intensive program focused on building expertise in site reliability engineering, cloud infrastructure, and operational excellence. Committed to continuous learning and applying best practices in automation, monitoring, and scalable systems.",
    highlights: [
      "OpsWerks Academy — SRE track",
      "Cloud infrastructure fundamentals",
      "Automation & tooling",
      "Continuous learning mindset",
    ],
  },
  {
    title: "Front-end UI/UX Developer Intern",
    company: "Xeleqt Technology Innovations Inc.",
    period: "February 02, 2026 - June 16, 2026",
    description:
      "Worked as an intern and contributed by co-authoring the migration of a company SaaS platform from React 16 to React 19.",
    highlights: [
      "React 19 migration",
      "UI/UX development",
      "SaaS platform",
      "Modern front-end practices",
    ],
  },
  {
    title: "Customer Service Associate",
    company: "Accenture in the Philippines",
    period: "July 28, 2021 - February 01, 2022",
    description:
      "Provided excellent customer support, resolved inquiries efficiently, and contributed to improving customer satisfaction. Developed strong communication and problem-solving skills that translate well into technical roles.",
    highlights: [
      "Customer relationship management",
      "Problem-solving and conflict resolution",
      "Team collaboration",
      "Communication skills",
    ],
  },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="experience" className="py-20 bg-card">
      <div className="container mx-auto px-4" ref={ref}>
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey includes diverse experiences that have shaped my
            professional skills.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative md:pl-16 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
              >
                {/* Timeline dot / icon — hidden on mobile */}
                <div className="hidden md:flex absolute left-0 top-4 w-8 h-8 md:w-12 md:h-12 bg-primary/10 border-2 border-primary rounded-full items-center justify-center shrink-0 z-10">
                  <Briefcase className="text-primary" size={16} />
                </div>

                {/* Segmented connector line — cut at each mark, hidden on mobile */}
                {index < experiences.length - 1 && (
                  <div
                    className="hidden md:block absolute left-4 md:left-6 -translate-x-1/2 w-0.5 bg-border top-[3.25rem] md:top-[4.25rem] -bottom-[2.75rem]"
                    aria-hidden="true"
                  />
                )}

                <Card className="glass-card hover:shadow-lg transition-all duration-500 hover:border-primary/50">

                  <CardHeader>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {exp.company}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.period}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
