import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background: #111;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Carousel = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const LogoBox = styled.div`
  background: #222;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  min-width: 180px;
  min-height: 80px;
  box-shadow: 0 2px 16px #000a;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.04);
    background: #181818;
  }
  img {
    max-width: 160px;
    max-height: 60px;
    object-fit: contain;
    background: #fff;
    border-radius: 4px;
    padding: 0.3rem;
  }
`;

const SponsorName = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin-top: 0.3rem;
  color: #ffcc00;
`;

export default function Sponsors() {
  return (
    <Section id="sponsors">
      <h2 style={{ color: "#ffcc00", marginBottom: "2rem" }}>Our Sponsors</h2>
      <Carousel>
        <a href="https://www.ppas.cz/" target="_blank" rel="noopener noreferrer">
          <LogoBox>
            <img src="/sponsors/ppas.svg" alt="Pražská plynárenská logo" />
          </LogoBox>
          <SponsorName>Pražská plynárenská</SponsorName>
        </a>
        <a href="https://www.winkelhofer.cz/" target="_blank" rel="noopener noreferrer">
          <LogoBox>
            <img src="/sponsors/winkelhofer.svg" alt="Winkelhofer & Partners logo" />
          </LogoBox>
          <SponsorName>Winkelhofer & Partners</SponsorName>
        </a>
      </Carousel>
    </Section>
  );
}