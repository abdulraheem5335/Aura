// import aura from "../assets/aura.jpg"; // Keep if aura is used
import aura from "../assets/aura.jpg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "../style/about.css";


export function About() {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.1 });
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="about" id="about1">
      <div className="about-content">
        <div className="about-text">
          <h1
            ref={titleRef}
            className={`about-title slide-up ${titleVisible ? 'visible' : ''}`}
          >
            About AURA
          </h1>
          <p
            ref={textRef}
            className={`about-description fade-in ${textVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
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
        <img
          ref={imageRef}
          src={aura}
          alt="About AURA"
          className={`aura-image slide-in-right ${imageVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '300ms' }}
        />
      </div>

    </section>
  );
}