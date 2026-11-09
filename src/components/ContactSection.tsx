import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  let emailLink = import.meta.env.VITE_EMAIL_LINK;

  if (!emailLink) {
    emailLink = "Email unavailable";
  }

  return (
    <section id="contact" className="overflow-x-clip bg-background py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out. I'm always
            open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="grid min-w-0 max-w-4xl mx-auto gap-8 md:grid-cols-2">
          <div
            className={`min-w-0 space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 md:-translate-x-10"
            }`}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            <Card className="min-w-0 border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex min-w-0 items-center gap-3 text-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="text-primary" size={20} />
                  </div>
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${emailLink}`}
                  className="block max-w-full break-all text-muted-foreground transition-colors hover:text-primary"
                > 
                  {emailLink}
                </a>
              </CardContent>
            </Card>

            <Card className="min-w-0 border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex min-w-0 items-center gap-3 text-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Philippines</p>
              </CardContent>
            </Card>
          </div>

          <Card
            className={`min-w-0 border-border transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 md:translate-x-10"
            }`}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="bg-background"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-background"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    className="bg-background resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button className="w-full gap-2" disabled={isSending} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  const sendData = async() => {
                      try {

                        const strippedSenderName = senderName.trim();
                        const strippedSenderEmail = senderEmail.trim();
                        const strippedMessage = message.trim();

                        if (!strippedSenderName || !strippedSenderEmail || !strippedMessage) {
                          alert("Please fill in all fields before sending.");
                          return;
                        }
                        setIsSending(true);
                        const url = import.meta.env.VITE_MAILER_URL;
                        const response = await fetch(url, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          sender: strippedSenderName,
                          senderEmail: strippedSenderEmail,
                          emailBody: strippedMessage,
                        })
                      })
                      if (!response.ok) {
                        const error = await response.text();
                        alert(JSON.parse(error).error);
                        setIsSending(false);
                        return;
                      }
                      alert("Thank you for sending a message! I will get back to you shortly.");
                      setSenderName("");
                      setSenderEmail("");
                      setMessage("");
                      setIsSending(false);
                      return;
                    } catch(error: unknown) {
                      console.error("Error sending message:", error);
                      alert("Something went wrong. Please try again later.");
                      setIsSending(false);
                      return;
                    }
                  }
                  sendData();
                }}>
                  <Send size={18} />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
