import { ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Certification = {
  name: string;
  description: string;
  tags: string[];
  storagePath: string;
};

const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    description: "Foundational knowledge of AWS Cloud concepts, services, security, and pricing.",
    tags: ["AWS", "Cloud"],
    storagePath: "/aws-cloud-practitioner.pdf",
  },
  {
    name: "Certified Kubernetes Application Developer",
    description: "Demonstrates the ability to design, build, configure, and expose cloud-native applications on Kubernetes.",
    tags: ["Kubernetes", "Cloud Native"],
    storagePath: "/certified-kubernetes-app-dev",
  },
  {
    name: "Elastic Kubernetes Service",
    description: "Certification focused on deploying and managing Kubernetes workloads with Elastic Kubernetes Service.",
    tags: ["Amazon EKS", "Kubernetes"],
    storagePath: "/elastic-k8s-svc.pdf",
  },
  {
    name: "Networking Basics",
    description: "Covers essential networking concepts, protocols, devices, and connectivity.",
    tags: ["Networking", "Infrastructure"],
    storagePath: "/networking-basics.pdf",
  },
];

const getCertificationUrl = (storagePath: string) => {
  const bucketPath = import.meta.env.VITE_SUPABASE_BUCKET_PATH;
  return `${bucketPath.replace(/\/$/, "")}${storagePath}`;
};

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="certifications" className="py-20 bg-card">
      <div className="container mx-auto px-4" ref={ref}>
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of certifications covering cloud, Kubernetes, and networking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certifications.map((certification, index) => (
            <Card
              key={certification.storagePath}
              className={`group hover:shadow-lg transition-all duration-500 border-border hover:border-primary/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="text-primary" size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {certification.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2">
                        {certification.description}
                      </CardDescription>
                    </div>
                  </div>
                  <a
                    href={getCertificationUrl(certification.storagePath)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors shrink-0"
                    aria-label={`View ${certification.name}`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {certification.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
