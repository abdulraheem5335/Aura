import sustain from "../assets/Sustain.png";
import "../style/sustain.css";
export function Sustain() {
  return (
    <section className="sustain" id="sustain">
      <div className="sustain-text">
        <div className="sustain-content">
          <h1 className="sustain-title">Our Commitment to Sustainability</h1>
          <p className="sustain-description">
            At AURA, sustainability isn't just a buzzword; it's the foundation
            of our entire operation. We recognize the fashion industry's
            environmental impact and are committed to being part of the
            solution, not the problem. Our approach to sustainability
            encompasses every aspect of our business, from sourcing and
            production to packaging and distribution. We carefully select
            materials that minimize environmental footprint without compromising
            on quality or aesthetics. This includes organic cotton, recycled
            polyester, Tencel, and innovative fabrics made from reclaimed ocean
            plastic. Our commitment extends to ensuring fair labor practices
            throughout our supply chain, maintaining transparency, and fostering
            long-term relationships with ethical manufacturers. Beyond
            production, we've implemented a comprehensive zero-waste initiative
            across our operations, from design studios to retail spaces. Our
            packaging is 100% recyclable and made from post-consumer materials,
            reflecting our dedication to circularity in every detail. By
            choosing AURA, you're not just investing in exceptional clothing;
            you're supporting a movement toward a more sustainable and equitable
            fashion industry. Together, we can redefine what it means to dress
            well in the 21st century.
          </p>
        </div>
        <img className="sustain-image" src={sustain} alt="Sustainability" />
      </div>
      <div className="sustain-list">
        <h2 className="sustain-list-title">Our Sustainable Process</h2>
        <div className="sustain-list-items">
          <div className="bullet">1</div>
          <h2>Ethical Sourcing</h2>
          <p>
            We carefully select materials from certified sustainable sources,
            ensuring environmental integrity and fair labor practices.
          </p>
        </div>
        <div className="sustain-list-items">
          <div className="bullet">2</div>
          <h2>Innovative Design</h2>
          <p>
            Our designs maximize material usage and create timeless pieces that
            transcend seasonal trends, reducing waste and overconsumption.
          </p>
        </div>
        <div className="sustain-list-items">
          <div className="bullet">3</div>
          <h2>Responsible Manufacturing</h2>
          <p>
            Our production facilities use renewable energy and water-saving
            technologies to minimize environmental impact.
          </p>
        </div>
        <div className="sustain-list-items">
          <div className="bullet">4</div>
          <h2>Transparent Supply Chain</h2>
          <p>
            We maintain transparency in our supply chain, allowing customers to
            trace the journey of their garments from raw materials to finished
            products.
          </p>
        </div>
      </div>
    </section>
  );
}
