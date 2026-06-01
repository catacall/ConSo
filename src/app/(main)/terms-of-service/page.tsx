import PageTransition from "@/components/PageTransition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service and usage conditions for ConverTo.",
};

export default function TermsOfService() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink mb-8">Terms of Service</h1>
        
        <div className="bg-canvas border border-hairline p-8 rounded-2xl shadow-sm text-body leading-relaxed space-y-6">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using ConverTo ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">2. Description of Service</h2>
          <p>
            ConverTo provides users with access to a rich collection of resources, including various document converting tools, image manipulation tools, and digital signature capabilities. You understand and agree that the Service is provided "AS-IS".
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">3. User Responsibilities</h2>
          <p>
            You are entirely responsible for the content of, and any harm resulting from, the files you process using our Service. ConverTo does not claim ownership of the materials you provide to the Service.
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">4. Prohibited Uses</h2>
          <p>
            You may not use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
          </p>

          <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">5. Disclaimer of Warranties</h2>
          <p>
            The Service is provided without warranty of any kind, express or implied. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from, out of, or in connection with the software or the use or other dealings in the software.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
