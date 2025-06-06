// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll and toggle the 'scrolled' class
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper to highlight the active link
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  // Close menu when navigating to another route
  useEffect(() => {
    // Whenever the pathname changes, close the menu
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      id="ftco-navbar"
      className={`
        fixed-top
        navbar navbar-expand-lg
        ftco_navbar ftco-navbar-light
        ${scrolled ? "scrolled" : ""}
      `}
    >
      <div className="container">
        {/* Brand */}
        <Link href="/" className="navbar-brand">
          Express<span>Postals</span>
        </Link>

        {/* Hamburger button: toggles `menuOpen` */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="ftco-nav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="oi oi-menu"></span> Menu
        </button>

        {/* Menu items: add "show" class when `menuOpen` is true */}
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="ftco-nav"
        >
          <ul className="navbar-nav ml-auto">
            <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className={`nav-item ${isActive("/about") ? "active" : ""}`}>
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className={`nav-item ${isActive("/contact") ? "active" : ""}`}>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
