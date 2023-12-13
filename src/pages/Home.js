import React from "react";
import yellowbg from "../../src/assets/bg-yellow.png";
import i4 from "../../src/assets/4.png";
import FirstSection from "../components/FirstSection";
import SecondSection from "../components/SecondSection";
import ThirdSection from "../components/ThirdSection";
import ForthSection from "../components/ForthSection";
import FifthSection from "../components/FifthSection";
import FAQs from "../components/FAQs";

function Home() {
  return (
    <>
      <img className="bg-yellow" src={yellowbg} alt="yellow" />
      <div className="i4-parent">
        <img src={i4} alt="mode domains" className="i4" />
      </div>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <ForthSection />
      <FifthSection />
      <FAQs />
    </>
  );
}

export default Home;
