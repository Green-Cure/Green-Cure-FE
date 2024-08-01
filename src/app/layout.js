import { UserContextProvider } from "@/contexts/UserContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Green Cure",
  description: "Green Cure",
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
