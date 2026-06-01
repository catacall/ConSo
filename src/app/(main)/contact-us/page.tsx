"use client";

import PageTransition from "@/components/PageTransition";
import Animatedbutton from "@/components/Animatedbutton";

export default function ContactUs() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you shortly.");
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink mb-8">Contact Us</h1>
        
        <div className="bg-canvas border border-hairline p-8 rounded-2xl shadow-sm">
          <p className="text-body leading-relaxed mb-8">
            Have a question, feedback, or a tool request? We'd love to hear from you. 
            Fill out the form below or email us directly at <strong>support@convertotools.com</strong>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-hairline bg-canvas focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-ink"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-hairline bg-canvas focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-ink"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                required
                className="w-full px-4 py-2.5 rounded-lg border border-hairline bg-canvas focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-ink"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">Message</label>
              <textarea 
                id="message" 
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-hairline bg-canvas focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-ink resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <Animatedbutton
              type="submit"
              soundType="click"
              className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </Animatedbutton>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
