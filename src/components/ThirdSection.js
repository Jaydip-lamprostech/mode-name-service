import React, { useLayoutEffect, useRef } from "react";
import "../styles/ThirdSection.css";
import i1 from "../assets/1.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ThirdSection() {
  const thirdSectionRef = useRef();
  // gsap animation code start - DO NOT REMOVE THIS CODE
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   let ctx = gsap.context(() => {
  //     // use scoped selectors
  //     gsap.set(".third-title-gsap", { x: 0, opacity: 1 });
  //     // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
  //     gsap.from(".third-title-gsap", {
  //       opacity: 0,
  //       y: 150,
  //       duration: 1.5,

  //       scrollTrigger: {
  //         trigger: ".ts-main",
  //         start: "top 80%", // Change start position to trigger the animation

  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
  //     gsap.from(".third-sub-title-gsap", {
  //       opacity: 0,
  //       y: 500,
  //       duration: 1.5,
  //       scrollTrigger: {
  //         trigger: ".ts-main",
  //         start: "top 80%", // Change start position to trigger the animation
  //         end: "top 70%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     // gsap.utils.toArray(".sc-right-item").forEach((element) => {
  //     gsap.from(".box-item", {
  //       opacity: 0,
  //       y: 80,
  //       stagger: 0.2,
  //       scrollTrigger: {
  //         trigger: ".ts-flex-boxes",
  //         start: "top 80%", // Change start position to trigger the animation
  //         // end: "top 50%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     gsap.set(".i1", { x: 0, opacity: 1 });
  //     gsap.from(".i1", {
  //       opacity: 0,
  //       x: -50,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: ".ts-main",
  //         start: "top 80%", // Change start position to trigger the animation
  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     // });
  //   }, thirdSectionRef);
  //   // clean up function
  //   return () => ctx.revert();
  // }, []);
  return (
    <div className="ts-container" ref={thirdSectionRef}>
      <div className="ts-main">
        <div className="i1-parent">
          <img src={i1} alt="mode domains" className="i1" />
        </div>
        <div className="ts-title">
          <h2 className="third-title-gsap">
            SECURE TRANSFERS THAT ARE EASILY ACCESSIBLE ON BLOCKCHAIN EXPLORER
          </h2>
          <p className="third-sub-title-gsap">
            With Mode Domains, you don’t need the hassle of copy-pasting long
            addresses
          </p>
        </div>
        <div className="ts-flex-boxes">
          <div className="box-item box-one">
            <div className="box-text">
              <span>
                Easy Blockchain navigation through simplified, personalized
                ‘.mode’ handles
              </span>
            </div>
          </div>
          <div className="box-item box-two">
            <div className="box-text">
              <span>Cross-chain token transfers with a minimal loss risk</span>
            </div>
          </div>
          <div className="box-item box-three">
            <div className="box-text">
              <span>
                Budget-friendly subscription plans with distinct expiry dates
              </span>
            </div>
          </div>
          <div className="box-item box-four">
            <div className="box-text">
              <span>
                Unified domain names across the Mode network, accessible on
                Blockchain Explorer
              </span>
            </div>
          </div>
          <div className="box-item box-five">
            <div className="box-text">
              <span>
                Free handles for initial 1000 mainnet addresses from the testnet
                holder
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdSection;
