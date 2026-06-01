import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { FileProvider } from "@/context/FileContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import RegisterSW from "@/components/RegisterSW";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ConverTo — Free Document & Image Tools Dashboard",
    template: "%s | ConverTo",
  },
  description:
    "ConverTo is a comprehensive document converting tool featuring a dashboard facility and numerous daily-use micro tools. Convert PDFs, edit images, and sign documents locally.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ConverTo",
  },
  icons: {
    apple: "/icon-192.png",
    icon: "/icon-192.png",
  },
  openGraph: {
    type: "website",
    siteName: "ConverTo",
    title: "ConverTo — Document Converting Tool & Micro Tools Dashboard",
    description:
      "ConverTo provides a dashboard facility with daily micro tools: PDF converter, image compressor, digital signature, and more. All in-browser, completely private.",
    url: "https://convertotools.com",
    images: [
      {
        url: "https://convertotools.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ConverTo — Document & Image Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConverTo — Document Converting Tool & Micro Tools",
    description:
      "Dashboard facility with daily micro tools: PDF, image, signature, QR tools — all free, in-browser, no upload needed.",
    images: ["https://convertotools.com/og-image.png"],
    creator: "@VeNOmAnas1",
  },
  keywords: [
    "ConverTo",
    "document converting tool",
    "dashboard facility",
    "micro tools",
    "daily life tools",
    "PDF converter",
    "background remover",
    "digital signature",
    "image compressor",
    "PDF compress",
    "QR code generator",
    "free online tools",
    "in-browser tools",
    "no upload PDF",
    "online document converter",
    "free PDF tools online",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="theme-color" content="#6366f1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XH8FXHMQ29"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XH8FXHMQ29');
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <FileProvider>
              <ToastProvider>
                <main className="min-h-screen">{children}</main>
              </ToastProvider>
            </FileProvider>
          </AuthProvider>
        </ThemeProvider>
        <RegisterSW />
      </body>
    </html>
  );
}
