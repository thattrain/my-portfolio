import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLink = ({ link, name }) => {
    const isAnchor = link.startsWith("#");

    if (isAnchor && isHomePage) {
      return (
        <a href={link}>
          <span>{name}</span>
          <span className="underline" />
        </a>
      );
    }

    if (isAnchor && !isHomePage) {
      return (
        <Link to={`/${link}`}>
          <span>{name}</span>
          <span className="underline" />
        </Link>
      );
    }

    return (
      <Link to={link}>
        <span>{name}</span>
        <span className="underline" />
      </Link>
    );
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        {isHomePage ? (
          <a href="#hero" className="logo">
            Dat Tran
          </a>
        ) : (
          <Link to="/" className="logo">
            Dat Tran
          </Link>
        )}

        <nav className="desktop flex-1 justify-center">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                {renderNavLink({ link, name })}
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default NavBar;
