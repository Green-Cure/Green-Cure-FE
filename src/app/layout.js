import { UserContextProvider } from "@/contexts/UserContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "GreenCure",
  description:
    "GreenCure is an innovative application that uses artificial intelligence (AI) and image analysis technology to help farmers detect plant diseases in real-time. With this application, farmers can take pictures of their crops, and the system will analyze and provide disease diagnosis and appropriate treatment recommendations, thereby increasing agricultural efficiency and yield.",
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
        <Toaster position="top-center" />
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
