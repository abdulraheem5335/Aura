import "../style/hero.css";
import { Collections } from "./Collections.jsx";
export function Hero({ back, heading, para, first, second, linkone, linktwo }) {
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
        <h1 className="hero-title">{heading}</h1>
        <p className="hero-description">{para}</p>
        <div className="hero-buttons">
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
