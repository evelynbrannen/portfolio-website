import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import '../styles/Carousel.css';
import jewelryImage from '../assets/jewelry-cropped.PNG';
import capstone from '../assets/capstone.png';
import portfolio from '../assets/portfolio.png';
import pokemon from '../assets/pokemon.png';
import app from '../assets/app.png';

function Button({ text, link }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="button">
          {text}
        </a>
      );
}

function Card({ title, description, img, link, button }) {
    const [show, setShown] = useState(false);
  
    const props3 = useSpring({
      opacity: 1,
      transform: show ? "scale(1.03)" : "scale(1)",
      boxShadow: show
        ? "0 20px 25px rgb(0 0 0 / 25%)"
        : "0 2px 10px rgb(0 0 0 / 8%)"
    });
  
    return (
      <animated.div
        className="card"
        style={props3}
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <img src={img} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="btnn">
          {button && link && (
            <Button text={button} link={link} />
          )}
        </div>
      </animated.div>
    );
  }
  

// Carousel Component
function CustomCarousel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div style={{ width: props.width, height: props.height, margin: props.margin }}>
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}

function App() {
    const projects = [
      {
        title: "3D ML Visualization",
        description: "Interactive 3D learning environment for visualizing ML algorithms, made with Unity (capstone project)",
        img: capstone,
        link: "https://machine-learning-visualization.github.io/",
        button: "View Project (in progress)"
      },
      {
        title: "This Website",
        description: "This website! Made from scratch using React, HTML/CSS, JS",
        img: portfolio,
        link: "https://evelynbrannen.github.io/portfolio-website/",
        button: "(ur already there)"
      },
      {
        title: "Jewelry Website",
        description: "Website to create a custom bracelet, made using HTML/CSS and javascript",
        img: jewelryImage,
        link: "https://evelynbrannen.github.io/jewelry-customizer/",
        button: "View Website"
      },
      {
        title: "Pokemon PCA",
        description: "Used Principal Component Analysis (PCA) to reduce Deep Neural Net features from images to two dimensions. Effectively clusters Pokémon by shape and size.",
        img: pokemon,
        link: "",
        button: ""
      },
      {
        title: "Book Tracking iOS App",
        description: "Swift-based mobile app using MVVM architecture and CoreData for book tracking, enabling users to log, rate, and review books. Utilized Web API calls to fetch book info.",
        img: app,
        link: "link-to-project-3",
        button: ""
      }
    ];
  
    const cards = projects.map((project) => ({
      key: project.title,
      content: (
        <Card
          title={project.title}
          description={project.description}
          img={project.img}
          link={project.link}
          button={project.button}
        />
      )
    }));
  
    return (
      <div className="carousel-container">
        <CustomCarousel
          cards={cards}
          height="500px"
          width="100%"
          margin="0 auto"
          offset={200}
          showArrows={false}
        />
      </div>
    );
  }
  
  export default App;