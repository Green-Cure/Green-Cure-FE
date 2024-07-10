import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function AboutLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
