import "../style/about.css";
import aura from "../assets/aura.jpg";
import raheem from "../assets/raheem.jpg";
import ahmad from "../assets/ahmad.jpg";
import meerab from "../assets/meerab.jpg";
import taimoor from "../assets/taimoor.jpg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";


export function About() {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.1 });
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.2 });
  const [teamTitleRef, teamTitleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [teamGridRef, teamGridVisible] = useScrollAnimation({ threshold: 0.1 });

  const teamMembers = [
    {
      name: "Taimoor Safdar",
      role: "Front End Lead Developer and Schema Manager",
      description:
        "Leads the technical direction and architecture of AURA. Designed various important featurees and components of the website including the product details page and the sign up page. Responsible for the overall performance and optimization of the website. Also responsible for the data collection and the initial schema development of the Website ",
      image: taimoor,
    },
    {
      name: "Ahmad Raza",
      role: "Frontend Lead Developer",
      description:
        "Drives the frontend architecture and user experience. Designed and built the cart sidebar and checkout page, ensuring a seamless and responsive design. Also responsible for the end fixes of the styles of the website",
      image: ahmad,
    },
    {
      name: "Meerab",
      role: "Frontend Developer and Linking Manager",
      description:
        "Creates intuitive and engaging user experiences through thoughtful design and development. Designed the Login Page, User Profile and the Overall Css handling of the Project. Also responsible for linking the website with the backend.",
      image: meerab,
    },
    {
      name: "Abdul Raheem",
      role: "Backend Developer and Database Connection Manager ",
      description:
        "Responsible for the overall backend of the websie. Designed the API routes for overall website according to the need, Also responsible for the development and management of the Admin Dashboard. Also responsible for the overall database connection and management of the website.",
      image: raheem,
    },
    {
      name: "Aqib Raza",
      role: "Frontend Developer",
      description:
        "Contributes to frontend and development. Contributed in the development of the initial structure of the website and is responsible for maintaining the codebase.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHyeX_DoAAtFA/profile-displayphoto-shrink_200_200/B4DZZoM4LSGgAY-/0/1745504931126?e=1752710400&v=beta&t=ncg2bb6PyrtseR9bHgauRtpYN3mTWnmSfCxJ7C0HzFY", // Placeholder for fifth member's image
    },
  ];

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
      
      <div className="team-section">
        <h1 
          ref={teamTitleRef}
          className={`team-title slide-up ${teamTitleVisible ? 'visible' : ''}`}
        >
          Development Team
        </h1>
        <div 
          ref={teamGridRef}
          className={`team-grid stagger-container ${teamGridVisible ? 'visible' : ''}`}
        >
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
