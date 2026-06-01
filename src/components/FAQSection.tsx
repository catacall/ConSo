"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Are my files secure?",
    answer:
      "Yes. All file processing happens entirely within your web browser. We do not upload your documents or images to our servers. Your data remains strictly on your device.",
  },
  {
    question: "Is ConverTo free?",
    answer:
      "Absolutely. ConverTo provides over 30 micro-tools completely free of charge, with no hidden fees or subscriptions required.",
  },
  {
    question: "Do I need an internet connection?",
    answer:
      "Once the web application loads, many of the tools (like PDF compression and image conversion) work offline since the processing is handled client-side in your browser.",
  },
  {
    question: "How to convert PDF to Word?",
    answer:
      "Use ConverTo's PDF to Word tool: upload your PDF file, click Convert, and download the editable .docx file. The conversion preserves formatting, tables, and text layout. Works entirely in your browser — no upload to any server.",
  },
  {
    question: "How to convert HEIC to JPG?",
    answer:
      "Open ConverTo's HEIC to JPG converter, drag and drop your HEIC files (taken on iPhone or Mac), and hit Convert. You'll get standard JPG files compatible with any device or platform instantly.",
  },
  {
    question: "How to convert Celsius to Fahrenheit?",
    answer:
      "Use the formula: °F = (°C × 9/5) + 32. For example, 100°C = 212°F. ConverTo's unit converter lets you input any Celsius value and get the Fahrenheit equivalent instantly without manual calculation.",
  },
  {
    question: "How to convert PDF to JPG?",
    answer:
      "Upload your PDF in ConverTo's PDF to JPG tool. Each page of the PDF is rendered as a high-quality JPG image. You can download all pages at once as a ZIP or individually.",
  },
  {
    question: "How to convert JPG to PDF?",
    answer:
      "Select one or more JPG images in the JPG to PDF tool on ConverTo, arrange the order if needed, and click Convert. A single PDF containing all your images is generated and ready to download.",
  },
  {
    question: "How to convert a picture to PDF on iPhone?",
    answer:
      "On iPhone, open the Photos app, select the image, tap the Share icon, and choose 'Print'. In the print preview, pinch-zoom out to get a PDF preview, then tap the Share icon again and save as PDF. Alternatively, use ConverTo in your mobile browser — upload the photo and convert it to PDF directly.",
  },
  {
    question: "How to convert degrees to radians?",
    answer:
      "Multiply the degree value by π/180. For example, 180° = π radians ≈ 3.14159. ConverTo's angle converter handles this instantly — just enter the degrees and get radians (and vice versa).",
  },
  {
    question: "How to convert Word to PDF?",
    answer:
      "Upload your .docx file to ConverTo's Word to PDF tool and click Convert. The resulting PDF preserves all your formatting, fonts, and layout. No Microsoft Word installation required.",
  },
  {
    question: "How to convert HEIC to JPG on Windows?",
    answer:
      "Windows doesn't natively support HEIC files. Use ConverTo's HEIC to JPG converter in any browser — upload the HEIC file and download a universally compatible JPG. No software installation needed on Windows.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mt-20 mb-8 max-w-4xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h3 className="text-3xl font-semibold tracking-tight text-ink mb-8 text-center">
        Frequently Asked Questions
      </h3>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-canvas rounded-2xl border border-hairline shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-ink text-base leading-snug">
                  {faq.question}
                </span>
                <span
                  className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-hairline text-body transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1V11M1 6H11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              {/* Accordion body — CSS height transition via grid trick */}
              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="text-body leading-relaxed px-6 pb-5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
