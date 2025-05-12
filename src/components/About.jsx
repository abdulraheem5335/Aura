import aura from "../assets/aura.jpg";
import ahmad from "../assets/ahmad.jpg";
import meerab from "../assets/meerab.jpg";
import raheem from "../assets/raheem.jpg";
import "../style/about.css";

export function About() {
  return (
    <section className="about" id="about1">
      <div className="about-content">
        <div className="about-text">
          <h1 className="about-title">About AURA</h1>
          <p className="about-description">
            Founded in 2020, AURA emerged as a response to the growing need for
            fashion that balances style, sustainability, and substance. Our
            journey began with a simple vision: to create clothing that empowers
            individuals to express themselves while respecting our planet. At
            AURA, we believe that fashion is more than just what you wear; it's
            an extension of your identity, values, and aspirations. This
            philosophy drives every aspect of our brand, from design
            conceptualization to material selection and production processes.
            Our team comprises passionate creatives and industry veterans who
            share a common goal – to revolutionize the fashion landscape by
            challenging conventions and embracing innovation. Through
            collaborative efforts and unwavering dedication, we've established
            AURA as a beacon of progressive fashion that resonates with
            forward-thinking individuals around the globe. The name "AURA"
            reflects our belief that everyone possesses a unique energy and
            presence. Our clothing is designed to enhance this personal aura,
            allowing you to shine authentically in every setting and situation.
          </p>
        </div>
        <img src={aura} alt="About AURA" className="aura-image" />
      </div>
      <div className="about-image-container">
        <div className="team-member">
          <img src={ahmad} alt="Ahmad Raza" className="about-image" />
          <h2>Ahmad Raza</h2>
          <p>Creative Director</p>
        </div>
        <div className="team-member">
          <img src={meerab} alt="Meerab" className="about-image" />
          <h2>Meerab</h2>
          <p>Head of Design</p>
        </div>
        <div className="team-member">
          <img src={raheem} alt="Abdur Raheem" className="about-image" />
          <h2>Abdur Raheem</h2>
          <p>Lead Developer</p>
        </div>
      </div>
    </section>
  );
}
