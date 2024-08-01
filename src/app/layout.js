import { UserContextProvider } from "@/contexts/UserContext";
import "./globals.css";

export const metadata = {
  title: "GreenCure",
  description: "Generated by create next app",
  icons: {
    icon: {
      url: "/greencure-icon.ico",
      type: "image/png",
    },
    shortcut: { url: "/greencure-icon.ico", type: "image/png" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
