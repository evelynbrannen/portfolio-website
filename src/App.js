import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';
import './styles/App.css';
import './styles/TypingEffect.css';
import './styles/Animations.css';
import Stars from './components/Stars';
import TypingEffect from './components/TypingEffect';
import Footer from './components/Footer';
import PersonalProjects from './components/Carousel';
import { DownloadPDF } from './components/DownloadPDF';
import { slideInImageOnScroll } from './components/Animations';


function App() {
  const [orbitVisible, setOrbitVisible] = useState(true); // Track orbit visibility
  const orbitRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);
  const imageRef = useRef(null);
  const sectionsRef = useRef([]);

  // cursor
  useEffect(() => {
    const cursor = document.querySelector('.cursor-custom');
    const cursorOutline = document.querySelector('.cursor-outline');

    const updateCursor = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursor.style.left = `${posX}px`;
      cursor.style.top = `${posY}px`;

      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 200, fill: "forwards" });
    };

    const handleMouseEnter = (e) => {
      cursorOutline.classList.add('hover');
      e.target.closest('li')?.classList.add('hover');
    };

    const handleMouseLeave = (e) => {
      cursorOutline.classList.remove('hover');
      e.target.closest('li')?.classList.remove('hover');
    };

    window.addEventListener('mousemove', updateCursor);

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);

      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // orbit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setOrbitVisible(false); // Orbit slides out after scrolling down 100px
      } else {
        setOrbitVisible(true); // Orbit stays visible when near the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // slide animation for clouds
  useEffect(() => {
    const cleanup = slideInImageOnScroll(imageRef, setImageVisible);
    return cleanup;
  }, []);

  // resume section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  return (
    <div className="App">
      <div className="Body">
        <div className="orbit-container">
          <img
            ref={orbitRef}
            className={`orbit ${!orbitVisible ? 'hidden' : ''}`} // Toggle 'hidden' class on scroll
            src={require('./assets/orbits.png')}
            alt="orbits"
          />
        </div>
        <div className="Content">
          <div className="cursor-custom"></div>
          <div className="cursor-outline"></div>
          <Stars />

          <nav>
            <ul>
              <li><Link to="title" smooth={true} duration={500}>About Me</Link></li>
              <li><Link to="section1" smooth={true} duration={500}>Resume</Link></li>
              <li><Link to="section2" smooth={true} duration={500}>Projects</Link></li>
              <li><Link to="section3" smooth={true} duration={500}>Contact</Link></li>
            </ul>
          </nav>

          <section id="title" className="section">
            <h2>
              {/* <TypingEffect text="Evelyn Brannen" speed={100} /> */}
              Evelyn Brannen
            </h2>
            <div className="description">
              Hello! I’m Evelyn, and I’m passionate about blending creativity with technology. I’m currently a senior studying Computer Science at Arizona State University, and I’m on an accelerated track to get my Masters in Computer Science in December 2025. Thank you for stopping by :)
            </div>
          </section>

          <section id="section1" className="section">
            <h2>Resume</h2>
            <DownloadPDF />
            <div className="resume">

            <h2>Education</h2>
            <div className="education-section">
              <div className="education-item">
                <strong>B.S. Computer Science - Expected Dec 2024</strong><br />
                Arizona State University, Tempe, AZ<br />
                GPA: 4.00<br />
                Barrett, the Honors College<br />
              </div>
              
              <div className="education-item">
                <strong>M.S. Computer Science - Expected Dec 2025</strong><br />
                Arizona State University, Tempe, AZ
              </div>
            </div>
            <br />

              <h2>Work Experience</h2>
              <p ref={(el) => (sectionsRef.current[0] = el)} className="resume-section hidden">
                <div className="row">
                  <div className="column left">
                    May 2024 - <br />Aug 2024
                  </div>
                  <div className="column right">
                    <b>R&D Software Development Intern</b>
                    <br /><i>AVEVA</i>
                    <br />
                    <br />
                    Self-selected and resolved existing backlog items in collaboration with a team of 11 developers and senior engineers, mainly using C#.
                    <ul>
                      <li>Designed and implemented a health check and heartbeat monitoring service for 3 critical background services, improving reliability and reducing downtime risk. Employed C#, API integration, and JSON formatting, achieving 88% test coverage.</li>
                      <li>Added authorization to a "GetAll" endpoint while optimizing task execution using asynchronous tasks, and implemented error logging while resolving race conditions and handling aggregate exceptions.</li>
                      <li>Gained hands-on experience with Kubernetes and related tools like Minikube and OpenLens, developing a foundational understanding of container orchestration and deployment practices.</li>
                    </ul>
                    <div className="skill-container">
                      <div className="skill">C#</div>
                      <div className="skill">API Integration</div>
                      <div className="skill">JSON</div>
                      <div className="skill">Kubernetes</div>
                      <div className="skill">Unit testing</div>
                    </div>
                  </div>
                </div>
              </p>

              <p ref={(el) => (sectionsRef.current[1] = el)} className="resume-section hidden">
                <div className="row">
                  <div className="column left">
                    May 2023 - <br />Aug 2023
                  </div>
                  <div className="column right">
                    <b>R&D Software Development Intern</b>
                    <br /><i>AVEVA</i>
                    <br />
                    <ul>
                      <li>Improved application performance by migrating a critical method DeleteSignupsAsync from Entity Framework Core to SQL stored procedures, achieving an estimated 30% reduction in query execution time.</li>
                      <li>Implemented comprehensive unit tests using tSQLt, resulting in a 40% increase in code coverage.</li>
                      <li>Refactored 3 obsolete API endpoints, resulting in increased readability of the codebase and improved overall efficiency.</li>
                    </ul>
                    <div className="skill-container">
                      <div className="skill">SQL</div>
                      <div className="skill">Unit Testing</div>
                      <div className="skill">API</div>
                    </div>
                  </div>
                </div>
              </p>

              <p ref={(el) => (sectionsRef.current[2] = el)} className="resume-section hidden">
                <div className="row">
                  <div className="column left">
                    Jul 2022 - <br />Present
                  </div>
                  <div className="column right">
                    <b>Desk Assistant/Event Planner</b>
                    <br /><i>Fulton Schools Career Center</i>
                    <br />
                    <ul>
                      <li>Improved application performance by migrating a critical method DeleteSignupsAsync from Entity Framework Core to SQL stored procedures, achieving an estimated 30% reduction in query execution time.</li>
                      <li>Implemented comprehensive unit tests using tSQLt, resulting in a 40% increase in code coverage.</li>
                      <li>Refactored 3 obsolete API endpoints, resulting in increased readability of the codebase and improved overall efficiency.</li>
                    </ul>
                  </div>
                </div>
              </p>
              <br />

              <h2>Technical Projects</h2>
              <p ref={(el) => (sectionsRef.current[3] = el)} className="resume-section hidden">
                <div className="row">
                  <div className="column left">
                    Aug 2021 - <br />Present
                  </div>
                  <div className="column right">
                    <b>DocYou LLC Mobile Application</b>
                    <br /><i>Cofounder, Backend Developer</i>
                    <br />
                    <ul>
                      <li>Developing a React Native mobile app that improves documentation efficiency for 50+ medical residents, in partnership with Phoenix Children’s Hospital.</li>
                      <li>Leveraging Firebase for real-time data management and secure user authentication.</li>
                      <li>Designed initial Figma prototypes that secured $16,000 in funding from participation in competitive pitch competitions.</li>
                    </ul>
                    <div className="skill-container">
                      <div className="skill">React Native</div>
                      <div className="skill">Front End Design</div>
                      <div className="skill">Figma</div>
                      <div className="skill">User testing</div>
                      <div className="skill">Firebase</div>
                    </div>
                  </div>
                </div>
              </p>

              <p ref={(el) => (sectionsRef.current[4] = el)} className="resume-section hidden">
                <div className="row">
                  <div className="column left">
                    Jan 2024 - <br />Present
                  </div>
                  <div className="column right">
                    <b>3D Analytics Machine Learning Environment</b>
                    <br /><i>Capstone Project</i>
                    <br />
                    <ul>
                      <li>Utilizing Unity and C# scripts to develop an interactive 3D learning environment to explore simple supervised machine learning algorithms such as binary classification.</li>
                      <li>Implementing visualizations to help students understand algorithmic outcomes by interacting with text-based datasets in a user-friendly 3D space.</li>
                    </ul>
                    <div className="skill-container">
                      <div className="skill">Unity</div>
                      <div className="skill">C#</div>
                      <div className="skill">Data Visualization</div>
                    </div>
                  </div>
                </div>
              </p>

              <p ref={(el) => (sectionsRef.current[5] = el)} className="resume-section hidden">
                <div className="row">
                  <div className="column left">
                    Apr 2023
                  </div>
                  <div className="column right">
                    <b>Book Tracking Mobile App</b>
                    <br /><i>Class Project</i>
                    <br />
                    <ul>
                      <li>Developed a Swift-based mobile app for iOS using MVVM architecture and CoreData for book tracking, enabling users to log, rate, and review books while sorting and organizing collections efficiently.</li>
                      <li>Utilized Web API calls to fetch book information and participated in a poster showcase for feedback from peers and professionals.</li>
                    </ul>
                    <div className="skill-container">
                      <div className="skill">Swift</div>
                      <div className="skill">MVVM Architecture</div>
                      <div className="skill">Web API</div>
                    </div>
                  </div>
                </div>
              </p>
              <br />
              
              <h2>Leadership Experience</h2>
              <p ref={(el) => (sectionsRef.current[6] = el)} className="resume-section hidden">
                <div className="row">
                  <div className="column left">
                    Aug 2023 - <br />Present
                  </div>
                  <div className="column right">
                    <b>Women in Computer Science</b>
                    <br /><i>Vice President of Internal Affairs</i>
                    <br />
                    <ul>
                      <li>Organize meetings twice a week involving technical workshops, guest speakers, socials, and mentorship programs, with a sponsorship budget of over $20,000.</li>
                      <li>Assist with hosting an annual programming competition with over 100 attendees and 5 industry sponsors.</li>
                      <li>Led recruitment efforts during ASU’s welcome week, resulting in a record turnout of 110 people at the first meeting.</li>
                    </ul>
                  </div>
                </div>
              </p>
            </div>
          </section>

          <section id="section2" className="section">
            <h2>Projects</h2>
            <PersonalProjects />
          </section>

        </div>

        <section id="section3" className="section">
          <h2>Contact</h2>
          <p>
            email: {" "}
            <span className="contact-container">
              <a href="mailto:evelynvb1511@gmail.com" target="_blank" className="custom-link">
                evelynvb1511@gmail.com
              </a>
              <button className="copy-icon" onClick={() => navigator.clipboard.writeText("evelynvb1511@gmail.com")}>
                <i className="bi bi-copy"></i>
              </button>
            </span>
          </p>

          <p>
            <span className="contact-container">
                      phone: <a href="tel:+14806190068" target="_blank" className="custom-link">480-619-0068</a>
                    </span>

          </p>
          
          <div className="contact-buttons">
            <button className="icon" onClick={() => window.open('https://www.linkedin.com/in/evelyn-brannen/', '_blank')}>
              <i className="bi bi-linkedin"></i>
            </button>
            
            <button className="icon" onClick={() => window.open('https://www.goodreads.com/user/show/135626675-evelyn-brannen', '_blank')}>
              <img
                ref={imageRef}
                className="goodreads-icon"
                src={require('./assets/goodreads.png')}
                alt="goodreads"
              />
            </button>
          </div>

        </section>

        <section className='section'>
          <p></p>
        </section>

        <div className='cloud-container'>
          
          <img
            ref={imageRef}
            className={`sliding-cloud1 ${imageVisible ? 'visible' : ''}`}
            src={require('./assets/cloud-3-large.PNG')}
            alt="clouds"
          />
          <img
            ref={imageRef}
            className={`sliding-cloud2 ${imageVisible ? 'visible' : ''}`}
            src={require('./assets/cloud-2-large.PNG')}
            alt="clouds"
          />
          <img
            ref={imageRef}
            className={`sliding-cloud3 ${imageVisible ? 'visible' : ''}`}
            src={require('./assets/cloud-5-large.PNG')}
            alt="clouds"
          />
          <img
            ref={imageRef}
            className={`sliding-cloud4 ${imageVisible ? 'visible' : ''}`}
            src={require('./assets/cloud-3-large.PNG')}
            alt="clouds"
          />
        </div>

        <div className='footer-container'>
          <img className="cactus-1" src={require('./assets/cactus-1.png')} alt="cactus" />
          <img className="cactus-2" src={require('./assets/cactus-2.png')} alt="cactus" />
          <div className='desert-footer'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
