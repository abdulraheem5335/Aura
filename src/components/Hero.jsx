import "../style/hero.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function Hero({ back, heading, para, first, second, linkone, linktwo }) {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [descRef, descVisible] = useScrollAnimation({ threshold: 0.2 });
  const [btnRef, btnVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      className="hero"
      id="hero1"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${back})`,
      }}
    >
      <div className="hero-content">
        <h1 
          ref={titleRef}
          className={`hero-title blur-in ${titleVisible ? 'visible' : ''}`}
        >
          {heading}
        </h1>
        <p 
          ref={descRef}
          className={`hero-description slide-up ${descVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          {para}
        </p>
        <div 
          ref={btnRef}
          className={`hero-buttons scale-up ${btnVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          <a href={linkone} className="explore">
            {first}
          </a>
          <a href={linktwo} className="learn">
            {second}
          </a>
        </div>
      </div>
    </section>
  );
}
