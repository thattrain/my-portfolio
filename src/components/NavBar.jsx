import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${menuOpen ? "menu-open" : ""}`}>
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

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen ? "true" : "false"}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      <nav className={`mobile ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map(({ link, name }) => (
            <li key={name} className="group" onClick={() => setMenuOpen(false)}>
              {renderNavLink({ link, name })}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
