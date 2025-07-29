import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anime Core | Your Ultimate Anime Streaming Experience",
  description: "Stream your favorite anime shows in high quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#E50914",
          colorText: "#ffffff",
          colorBackground: "#141414",
          colorInputBackground: "#333333",
          colorInputText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-[#E50914] hover:bg-[#f6121d] text-sm normal-case",
          card: "bg-[#141414] border border-[#333333]",
          headerTitle: "text-[#E50914]",
          headerSubtitle: "text-gray-300",
          socialButtonsBlockButton: "border border-gray-600 hover:bg-[#222222]",
          dividerLine: "bg-gray-800",
          dividerText: "text-gray-400",
          formFieldLabel: "text-gray-300",
          formFieldInput: "bg-[#333333] border-gray-600 focus:border-[#E50914]",
          footerActionText: "text-gray-400",
          footerActionLink: "text-[#E50914] hover:text-[#f6121d]",
        },
      }}
    >
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Jacquard+12&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-[#141414] text-white min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
