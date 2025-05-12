import { Hero } from "../components/Hero.jsx";
import { Collections } from "../components/Collections.jsx";
import { About } from "../components/About.jsx";
import { Sustain } from "../components/Sustain.jsx";
import { Contact } from "../components/Contact.jsx";
import { Navbar } from "../components/Navbar.jsx";
import path from "../assets/hero1.jpg";
export function Home() {
  return (
    <div>
      <Navbar />
      <Hero
        back={path}
        heading={"Redefine Your Style"}
        para={
          "Experience the future of fashion with AURA's innovative designs."
        }
        first={"Explore Collections"}
        second={"Learn More"}
        linkone={"#collection"}
        linktwo={"#about1"}
      ></Hero>
      <Collections />
      <About />
      <Sustain />
      <Contact />
    </div>
  );
}
