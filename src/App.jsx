import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
// (Import and add all other section components as you build them)

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <HeroSection />
        {/* ...Other sections here... */}
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;