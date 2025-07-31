import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../public/logo.svg";

const links = [
  { href: "#home", label: "Home" },
  { href: "#drivers", label: "Drivers" },
  { href: "#team", label: "Team" },
  { href: "#schedule", label: "Schedule" },
  { href: "#contact", label: "Contact" },
];

const Bar = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  background: #000;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(p) => (p.sticky ? "64px" : "48px")};
  transition: height 0.3s cubic-bezier(.4,0,.2,1);
  padding: 0 2rem;
  box-shadow: ${(p) => (p.sticky ? "0 2px 10px #0007" : "none")};
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.08em;
    font-family: 'Inconsolata', monospace;
    font-size: 1.1rem;
    transition: color 0.2s;
    &:hover { color: #ffcc00; }
    scroll-behavior: smooth;
  }
`;

export default function Header() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Bar sticky={sticky}>
      <div style={{ height: 40, display: "flex", alignItems: "center" }}>
        {sticky && (
          <img src="/logo.svg" alt="NP Racing" style={{ height: 40 }} />
        )}
      </div>
      <Nav>
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </Nav>
    </Bar>
  );
}