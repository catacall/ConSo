import PageTransition from "@/components/PageTransition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about ConverTo, the privacy-focused document tools suite.",
};

export default function AboutUs() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink mb-8">About Us</h1>
        
        <div className="bg-canvas border border-hairline p-8 rounded-2xl shadow-sm text-body leading-relaxed space-y-6">
          <p className="text-lg">
            Welcome to <strong>ConverTo</strong>, your personal, privacy-first digital assistant for document and image processing.
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">Our Mission</h2>
          <p>
            We believe that basic digital tasks—like compressing a PDF, removing a background, or signing a document—shouldn't require uploading your highly sensitive files to unknown third-party servers. 
            That's why we built ConverTo: a suite of over 30 micro-tools designed to run entirely inside your web browser.
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">Why Choose ConverTo?</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Privacy First:</strong> Most tools execute locally on your device using WebAssembly and modern browser APIs.</li>
            <li><strong>Completely Free:</strong> No paywalls, no subscriptions, no premium-only features.</li>
            <li><strong>Speed:</strong> Instant processing without waiting for files to upload or download.</li>
            <li><strong>All-in-One:</strong> A unified dashboard for every digital tool you might need in your daily workflow.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">The Project</h2>
          <p>
            ConverTo was born out of the frustration of dealing with disjointed, ad-riddled converter websites. It is continually updated with new tools and optimizations to provide the best possible user experience.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
