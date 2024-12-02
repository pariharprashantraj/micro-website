import React, { useState, useEffect } from "react";
import { Element, Link } from "react-scroll";
import {
  FaBars,
  FaHome,
  FaDollarSign,
  FaMap,
  FaImage,
  FaEye,
  FaFileDownload,
} from "react-icons/fa";
import "./App.css";

const sections = [
  { name: "Home", icon: <FaHome /> },
  { name: "Price", icon: <FaDollarSign /> },
  { name: "Site Plan", icon: <FaMap /> },
  { name: "Amenities Gallery", icon: <FaImage /> },
  { name: "Location", icon: <FaMap /> },
  { name: "Virtual Tour", icon: <FaEye /> },
  { name: "Download Brochure", icon: <FaFileDownload /> },
];

const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    // Only toggle the menu if screen size is less than or equal to 900px
    if (window.innerWidth <= 900) {
      setMenuOpen((prev) => !prev);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 900) {
      setMenuOpen(false); // Close the menu if the screen size exceeds 900px
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        const element = document.getElementById(
          section.name.toLowerCase().replace(/\s+/g, "-")
        );
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            window.scrollY >= offsetTop - 100 &&
            window.scrollY < offsetTop + offsetHeight
          ) {
            setActiveSection(section.name.toLowerCase().replace(/\s+/g, "-"));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName.toLowerCase().replace(/\s+/g, "-"));
    if (window.innerWidth <= 900) {
      setMenuOpen(false); // Close the menu on item click if screen size is small
    }
  };

  return (
    <div>
      {/* Top Header */}
      <header className="header">
        <h1 className="project-title">KALYANI</h1>
        <div className="navbar">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={section.name.toLowerCase().replace(/\s+/g, "-")}
              smooth={true}
              duration={500}
              className={`menu-item ${
                activeSection ===
                section.name.toLowerCase().replace(/\s+/g, "-")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSectionClick(section.name)} // Use the click handler
            >
              <span className="menu-icon-style">{section.icon}</span>
              {section.name}
            </Link>
          ))}
        </div>
        <div className="breadcrumb" onClick={toggleMenu}>
          <FaBars className="menu-icon" />
        </div>
      </header>

      {/* Sliding Menu */}
      <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          &times;
        </button>
        <nav className="menu-items">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={section.name.toLowerCase().replace(/\s+/g, "-")}
              smooth={true}
              duration={500}
              className={`menu-item ${
                activeSection ===
                section.name.toLowerCase().replace(/\s+/g, "-")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSectionClick(section.name)} // Use the click handler
            >
              <span className="menu-icon-style">{section.icon}</span>
              {section.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <Element
          key={index}
          name={section.name.toLowerCase().replace(/\s+/g, "-")}
          id={section.name.toLowerCase().replace(/\s+/g, "-")} // Adding ID for scroll
        >
          <section className="section">
            <h2>{section.name}</h2>
            <p>This is the {section.name} section.</p>
          </section>
        </Element>
      ))}
    </div>
  );
};

export default App;
