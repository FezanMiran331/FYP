import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Herosection from "@/Components/Herosection";
import Our_Features from "@/Components/Our_Features";
import AboutUs from "@/Components/AboutUs";
import ContactUs from "@/Components/ContactUs";
import FAQ from "@/Components/FAQ";
import Pricing from "@/Components/Pricing";
import Footer from "@/Components/Footer";
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      {/* Each section wrapped with a unique id */}
      <section id="home">
        <Herosection />
      </section>

      <section id="about">
        <AboutUs />
      </section>
      <section id="features">
        <Our_Features />
      </section>

      <section id="contact">
        <ContactUs />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="faqs">
        <FAQ />
      </section>

    </>
  );
}
