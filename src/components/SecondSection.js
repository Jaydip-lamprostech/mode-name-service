import React, { useLayoutEffect, useRef } from "react";
import "../styles/SecondSection.css";
import scicon1 from "../assets/sc-icon1.png";
import scicon2 from "../assets/sc-icon2.png";
import scicon3 from "../assets/sc-icon3.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function SecondSection() {
  const secondSectionRef = useRef();

  // gsap animation code start - DO NOT REMOVE THIS CODE
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   let ctx = gsap.context(() => {
  //     // use scoped selectors
  //     gsap.set(".second-title-gsap", { x: 0, opacity: 1, y: 0 });
  //     gsap.from(".second-title-gsap", {
  //       opacity: 0,
  //       x: -110,
  //       scrollTrigger: {
  //         trigger: ".second-title-gsap",
  //         start: "top 80%", // Change start position to trigger the animation

  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     gsap.set(".second-subtitle-gsap", { x: 0, opacity: 1 });
  //     gsap.from(".second-subtitle-gsap", {
  //       opacity: 0,
  //       x: -90,
  //       delay: 0.2,
  //       scrollTrigger: {
  //         trigger: ".second-title-gsap",
  //         start: "top 75%", // Change start position to trigger the animation
  //         // end: "top center",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     gsap.from(".sc-right-item", {
  //       opacity: 0,
  //       y: 40,
  //       stagger: 0.2,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: ".second-title-gsap",
  //         start: "top 80%", // Change start position to trigger the animation

  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //   }, secondSectionRef);
  //   // clean up function
  //   return () => ctx.revert();
  // }, []);
  return (
    <div className="sc-main" ref={secondSectionRef}>
      <div className="sc-left">
        <h2 className="second-title-gsap">
          FIND YOUR INDENTITY ON THE RAPIDLY GROWING MODE NETWORK
        </h2>
        <p className="second-subtitle-gsap">
          Mode Domains makes it easier for you to find, register & manage your
          unique identity
        </p>
      </div>
      <div className="sc-right">
        <div className="sc-right-item">
          <img src={scicon1} alt="yellow icon" />
          <span>
            Personalized ‘.mode’ handles that can be used across the Mode
            network
          </span>
        </div>{" "}
        <div className="sc-right-item">
          <img src={scicon2} alt="yellow icon" />
          <span>
            Smart Contract integration that ensures that transactions are
            accurately resolved on the blockchain
          </span>
        </div>{" "}
        <div className="sc-right-item">
          <img src={scicon3} alt="yellow icon" />
          <span>
            Resolver SDK for seamless integration into different decentralized
            applications on the blockchain
          </span>
        </div>
      </div>
    </div>
  );
}

export default SecondSection;
