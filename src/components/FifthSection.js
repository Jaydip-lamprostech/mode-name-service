import React, { useLayoutEffect, useRef } from "react";
import i8 from "../assets/8.png";
import i7 from "../assets/7.png";

import "../styles/FifthSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function FifthSection() {
  const fifthSectionRef = useRef();
  // gsap animation code start - DO NOT REMOVE THIS CODE
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   let ctx = gsap.context(() => {
  //     // use scoped selectors
  //     gsap.set(".fifth-title-gsap", { x: 0, opacity: 1, scale: 1 });
  //     // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
  //     gsap.from(".fifth-title-gsap", {
  //       opacity: 0,
  //       x: -110,
  //       scale: 0,
  //       scrollTrigger: {
  //         trigger: ".fifth-main",
  //         start: "top bottom", // Change start position to trigger the animation
  //         end: "top +=680",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     gsap.set(".fifth-sub-title-gsap", { y: 0, opacity: 1 });
  //     // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
  //     gsap.from(".fifth-sub-title-gsap", {
  //       opacity: 0,
  //       y: 10,
  //       scrollTrigger: {
  //         trigger: ".fifth-main",
  //         start: "top center", // Change start position to trigger the animation
  //         end: "top +=680",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
  //     gsap.set(".i7", { opacity: 1, x: 0 });
  //     gsap.from(".i7", {
  //       opacity: 0,
  //       x: 100,
  //       rotation: 10,
  //       duration: 2,
  //       scrollTrigger: {
  //         trigger: ".fifth-main",
  //         start: "top +=520", // Change start position to trigger the animation
  //         end: "top +=690",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     gsap.from(".i8", {
  //       opacity: 0,
  //       x: -100,
  //       rotation: 10,
  //       scale: 1,
  //       scrollTrigger: {
  //         trigger: ".fifth-main",
  //         start: "top +=720", // Change start position to trigger the animation

  //         toggleActions: "play none none reverse",
  //         onLeave: ({ progress, direction, isActive }) => {
  //           console.log(progress, direction, isActive);
  //           gsap.to(".fifth-main", {});
  //         },
  //       },
  //     });
  //     // gsap.utils.toArray(".sc-right-item").forEach((element) => {
  //     gsap.set(".fifth-item", { opacity: 1, x: 0 });
  //     gsap.from(".fifth-item", {
  //       opacity: 0,
  //       x: 100,
  //       stagger: 0,
  //       scrollTrigger: {
  //         trigger: ".fifth-main",
  //         start: "top +=420", // Change start position to trigger the animation

  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     // });
  //   }, fifthSectionRef);
  //   // clean up function
  //   return () => ctx.revert();
  // }, []);
  return (
    <div className="fifth-container" ref={fifthSectionRef}>
      <div className="fifth-main">
        <img src={i7} alt="mode domains" className="mobile-only mobile-i7 " />
        <h2 className="fifth-title-gsap">
          WE TRIED, WE TESTED & HERE'S OUR TESTAMENT
        </h2>
        <p className="fifth-sub-title-gsap">
          Our testnet story was a success, we received so much love from the
          users
        </p>
        <div className="fifth-details">
          <div className="fifth-item">
            <span className="fifth-count">30K+</span>
            <span className="fifth-label">Handles Claimed</span>
          </div>
          {/* <div className="fifth-item">
            <span className="fifth-count">101 ETH</span>
            <span className="fifth-label">Collected</span>
          </div> */}
        </div>
      </div>
      <img src={i8} alt="mode domains" className="fifthsection-i8 i8" />
      <div className="fifthsection-i7">
        <img src={i7} alt="mode domains" className="i7" />
      </div>
    </div>
  );
}

export default FifthSection;
