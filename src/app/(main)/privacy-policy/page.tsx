import PageTransition from "@/components/PageTransition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for ConverTo. Learn how we handle your data and protect your privacy.",
};

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink mb-8">Privacy Policy</h1>
        
        <div className="bg-canvas border border-hairline p-8 rounded-2xl shadow-sm text-body leading-relaxed space-y-6">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to ConverTo. We are committed to protecting your personal information and your right to privacy. 
            Because of the nature of our micro-tools, our privacy philosophy is simple: <strong>your data stays on your device.</strong>
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">2. Client-Side Processing</h2>
          <p>
            The vast majority of the tools provided on ConverTo operate entirely client-side. This means that when you convert a document, compress a PDF, or manipulate an image, the processing happens directly within your web browser. 
            Your files are never uploaded to our servers.
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">3. External APIs</h2>
          <p>
            Certain specific tools that require heavy computing (such as advanced OCR or complex file format conversions) may securely transmit data to third-party APIs (like CloudConvert) temporarily for processing. In these cases, files are strictly deleted immediately after conversion in accordance with those providers' strict privacy policies.
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">4. Local Storage</h2>
          <p>
            ConverTo uses your browser's LocalStorage and IndexedDB to securely save your app preferences, tool history, and created digital signatures. This data is physically stored on your own device and is inaccessible to us.
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please visit our <a href="/contact-us" className="text-primary hover:underline">Contact Us</a> page.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
