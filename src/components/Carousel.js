import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import '../styles/Carousel.css';
import jewelryImage from '../assets/jewelry-cropped.PNG';
import capstone from '../assets/capstone-cropped.png';
import portfolio from '../assets/portfolio.png';
import pokemon from '../assets/pokemon.png';
import app from '../assets/app.png';
import docYou from '../assets/docYou.png';

function Button({ text, link }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="button">
            {text}
        </a>
    );
}

function Card({ title, skills, description, img, link, button }) {
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
            <div className="skills">{skills}</div>
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
            title: "DocYou LLC",
            skills: "REACT NATIVE | FIGMA | FIREBASE",
            description: "Mobile app for Phoenix Children's Hospital to assist medical resident's procedure documentation. Made with React Native.",
            img: docYou,
            link: "https://www.linkedin.com/company/docyou/",
            button: "LinkedIn"
        },
        {
            title: "3D ML Visualization",
            skills: "UNITY | C#",
            description: "Interactive 3D learning environment for visualizing machine learning algorithms. (capstone project)",
            img: capstone,
            link: "https://machine-learning-visualization.github.io/",
            button: "View Project (in progress)"
        },
        {
            title: "This Website",
            skills: "REACT | HTML/CSS | JAVASCRIPT",
            description: "This website! Made from scratch using React, HTML/CSS, and Javascript. Illustrations done in Procreate.",
            img: portfolio,
            link: "https://evelynbrannen.github.io/portfolio-website/",
            button: "(ur already here <3)"
        },
        {
            title: "Jewelry Website",
            skills: "HTML/CSS | JAVASCRIPT",
            description: "Website to create a custom bracelet, made using HTML/CSS and Javascript.",
            img: jewelryImage,
            link: "https://evelynbrannen.github.io/jewelry-customizer/",
            button: "Visit Website"
        },
        {
            title: "Pokémon PCA",
            skills: "PYTHON",
            description: "Used Principal Component Analysis (PCA) to reduce Deep Neural Net features from images to two dimensions. Effectively clusters Pokémon by shape and size.",
            img: pokemon,
            link: "",
            button: ""
        },
        {
            title: "Book Tracking iOS App",
            skills: "SWIFT | REST API",
            description: "Swift-based mobile app using MVVM architecture and CoreData for book tracking, enabling users to log, rate, and review books. Utilized Web API calls to fetch book info.",
            img: app,
            link: "",
            button: ""
        }
    ];

    const cards = projects.map((project) => ({
        key: project.title,
        content: (
            <Card
                title={project.title}
                skills={project.skills}
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