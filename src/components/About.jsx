import "../style/about.css";
import aura from "../assets/aura.jpg";
import raheem from "../assets/raheem.jpg";
import ahmad from "../assets/ahmad.jpg";
import meerab from "../assets/meerab.jpg";
import taimoor from "../assets/taimoor.jpg";


export function About() {
  const teamMembers = [
    {
      name: "Taimoor Safdar",
      role: "Team Lead & Full Stack Developer",
      description:
        "Leads the technical direction and architecture of AURA. Specializes in full-stack development using MERN stack, managing both client and server-side implementations. Oversees database design, API development, and team coordination.",
      image: taimoor,
    },
    {
      name: "Ahmad Raza",
      role: "Frontend Lead Developer",
      description:
        "Drives the frontend architecture and user experience. Expert in React.js and modern frontend frameworks, focusing on creating responsive and performant user interfaces while ensuring code quality and best practices.",
      image: ahmad,
    },
    {
      name: "Meerab",
      role: "UI/UX Designer",
      description:
        "Creates intuitive and engaging user experiences through thoughtful design. Specializes in user research, wireframing, and implementing modern design principles to enhance the platform's visual appeal and usability.",
      image: meerab,
    },
    {
      name: "Abdul Raheem",
      role: "Frontend Developer",
      description:
        "Implements responsive user interfaces and interactive features. Focuses on React component development, state management, and ensuring cross-browser compatibility while maintaining clean, efficient code.",
      image: raheem,
    },
    {
      name: "Fifth Member",
      role: "Full Stack Developer",
      description:
        "Contributes to both frontend and backend development. Specializes in API integration, database management, and implementing secure authentication systems while ensuring optimal performance.",
      image: "path/to/image.jpg", // Placeholder for fifth member's image
    },
  ];

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
      
      <div className="team-section">
        <h1 className="team-title">Development Team</h1>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="card-inner">
                <div className="card-front">
                  <img src={member.image} alt={member.name} />
                  <h3>{member.name}</h3>
                </div>
                <div className="card-back">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p>{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
