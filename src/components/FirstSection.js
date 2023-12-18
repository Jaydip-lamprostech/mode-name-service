import React, { useLayoutEffect, useRef } from "react";
import "../styles/FirstSection.css";
import i5 from "../assets/5.png";
import i2 from "../assets/2.png";
import i3 from "../assets/3.png";
import i4 from "../assets/4.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-scroll";
// import { Link } from "react-router-dom";

function FirstSection() {
  const firstSectionRef = useRef();
  const scrollToSection = (sectionId, duration = 1000) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const startingY = window.scrollY;
      const targetY = section.offsetTop - 250;
      const distance = targetY - startingY;
      const startTime = performance.now();

      function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;

        window.scrollTo(
          0,
          startingY + easeInOutQuad(elapsed, 0, distance, duration)
        );

        if (elapsed < duration) {
          requestAnimationFrame(scrollStep);
        }
      }

      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(scrollStep);
    }
  };
  // gsap animation code start - DO NOT REMOVE THIS CODE
  // useLayoutEffect(() => {
  //   // gsap.registerPlugin(ScrollTrigger);
  //   let ctx = gsap.context(() => {
  //     // use scoped selectors
  //     gsap.from(".fs-heading", { opacity: 0, y: -50, duration: 2, delay: 3.4 });

  //     gsap.from(".sub-heading", {
  //       opacity: 0,
  //       y: 50,
  //       duration: 2,
  //       delay: 3.4,
  //     });
  //     gsap.from(".hero-buttons", {
  //       opacity: 0,
  //       y: 50,
  //       duration: 1,
  //       delay: 3.4,
  //       // ease: "elastic.out(1, 0.3)",
  //     });

  //     const tl = gsap.timeline();
  //     tl.delay(3.3)
  //       .fromTo(
  //         ".big-hexagon",
  //         {
  //           opacity: 0,
  //           duration: 2,
  //         },
  //         {
  //           opacity: 1,
  //           duration: 2,
  //         },

  //         1
  //       )
  //       .to(".small-hexagon", { opacity: 1, duration: 1 }, 1)
  //       .to(".circle-one", { opacity: 1, duration: 1 }, 1)
  //       .to(".circle-one", { opacity: 1, duration: 1 }, 1)
  //       .to(".circle-two", { opacity: 1, duration: 1 }, 1)
  //       .fromTo(
  //         ".circle-three",
  //         { opacity: 0, y: -30, duration: 1 },
  //         { opacity: 1, y: 0, duration: 1 },
  //         1
  //       );
  //     tl.fromTo(
  //       ".mobile-i3, .mobile-i4",
  //       {
  //         opacity: 0,
  //         duration: 2,
  //       },
  //       {
  //         opacity: 1,
  //         duration: 2,
  //       },

  //       1
  //     );

  //     gsap.utils.toArray(".i5, .i3").forEach((element) => {
  //       gsap.to(element, {
  //         scrollTrigger: {
  //           trigger: ".fs-container",
  //           start: "top top",
  //           end: "+=600",
  //           toggleActions: "play none none reverse",
  //           scrub: 1,

  //           onUpdate: (self) => {
  //             const progress = self.progress;
  //             gsap.to(element, {
  //               opacity: 1 - progress * 4,
  //               x: progress * -400,
  //               y: -progress * 400,
  //               ease: "none",
  //             });
  //           },
  //         },
  //       });
  //     });
  //     gsap.to(".i2", {
  //       scrollTrigger: {
  //         trigger: ".fs-container",
  //         start: "top top",
  //         end: "+=600",
  //         toggleActions: "play none none reverse",
  //         scrub: 1,

  //         onUpdate: (self) => {
  //           const progress = self.progress;
  //           gsap.to(".i2", {
  //             opacity: 1 - progress * 4,
  //             x: progress * 400,
  //             y: -progress * 400,
  //             ease: "none",
  //           });
  //         },
  //       },
  //     });
  //     gsap.utils.toArray(".circle-one, .circle-two").forEach((element) => {
  //       gsap.to(element, {
  //         scrollTrigger: {
  //           trigger: ".fs-container",
  //           start: "top top",
  //           end: "+=600",
  //           toggleActions: "play none none reverse",
  //           scrub: 1,

  //           onUpdate: (self) => {
  //             const progress = self.progress;
  //             gsap.to(".circle-one, .circle-two", {
  //               opacity: 1 - progress * 5,
  //               ease: "none",
  //             });
  //           },
  //         },
  //       });
  //     });
  //     gsap.utils.toArray(".big-hexagon, .small-hexagon").forEach((element) => {
  //       gsap.to(element, {
  //         scrollTrigger: {
  //           trigger: ".fs-container",
  //           start: "top top",
  //           end: "+=500",
  //           toggleActions: "play none none reverse",
  //           scrub: 0.1,

  //           onUpdate: (self) => {
  //             const progress = self.progress;
  //             gsap.to(".big-hexagon, .small-hexagon", {
  //               opacity: 1 - progress * 1,
  //               y: -progress * 50,
  //               scale: 1 - progress * 1,
  //               ease: "none",
  //             });
  //           },
  //         },
  //       });
  //     });
  //     gsap.to(".bg-hexagon", {
  //       scrollTrigger: {
  //         trigger: ".fs-container",
  //         start: "top top",
  //         end: "+=500",
  //         toggleActions: "play none none reverse",
  //         scrub: 1,
  //         onUpdate: (self) => {
  //           const progress = self.progress;
  //           gsap.to(".bg-hexagon", {
  //             minHeight: 1000 - progress * 200,
  //             ease: "none",
  //           });
  //         },
  //       },
  //     });
  //     gsap.to(".fs-container", {
  //       scrollTrigger: {
  //         trigger: ".fs-container",
  //         start: "top top",
  //         end: "+=500",
  //         toggleActions: "play none none reverse",
  //         scrub: 1,
  //         onUpdate: (self) => {
  //           const progress = self.progress;
  //           gsap.to(".fs-container", {
  //             height: 1000 - progress * 200,
  //             ease: "none",
  //           });
  //         },
  //       },
  //     });
  //     gsap.utils
  //       .toArray(".fs-heading, .sub-heading,.hero-buttons ")
  //       .forEach((element) => {
  //         gsap.to(element, {
  //           scrollTrigger: {
  //             trigger: ".fs-main",
  //             start: "top top",
  //             // end: "+=200",
  //             toggleActions: "play none none reverse",
  //             scrub: 0.1,
  //             onUpdate: (self) => {
  //               const progress = self.progress;
  //               gsap.to(element, {
  //                 opacity: 1 - progress * 6,
  //                 y: -progress * 500,
  //                 scale: 1 - progress * 3,
  //                 ease: "none",
  //               });
  //             },
  //           },
  //         });
  //       });
  //   }, firstSectionRef);
  //   // clean up function
  //   return () => ctx.revert();
  // }, []);
  return (
    <div
      className="fs-container fade-out-element1"
      ref={firstSectionRef}
      id="firstSection"
    >
      <div className="fs-main">
        <img src={i3} className="mobile-only mobile-i3" alt="mode domains " />
        <img src={i4} alt="mode domains" className="mobile-only mobile-i4" />
        <div className="fs-heading">
          <h1>DIGITAL IDENTITY AS UNIQUE AS YOU</h1>
        </div>

        <p className="sub-heading">
          An exclusive platform to help you navigate the Mode network with a
          personalized <span className="yellow-color-text">“.mode”</span> name
        </p>
        <div className="hero-buttons">
          <button
            className="first"
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            onClick={() => window.open("https://app.modedomains.xyz/")}
          >
            Get your .mode on!
          </button>
          <button
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            className="arrow-down-btn"
            onClick={() => scrollToSection("secondSection")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="51"
              viewBox="0 0 51 51"
              fill="none"
            >
              <circle cx="25.5" cy="25.5" r="25" stroke="#DEFF02" />
              <circle
                cx="25.5"
                cy="25.5"
                r="24.5"
                stroke="#DEFF02"
                // stroke-width="2"
              />
              <path
                d="M27 18C27 17.4477 26.5523 17 26 17C25.4477 17 25 17.4477 25 18H27ZM25.2929 34.7071C25.6834 35.0976 26.3166 35.0976 26.7071 34.7071L33.0711 28.3431C33.4616 27.9526 33.4616 27.3195 33.0711 26.9289C32.6805 26.5384 32.0474 26.5384 31.6569 26.9289L26 32.5858L20.3431 26.9289C19.9526 26.5384 19.3195 26.5384 18.9289 26.9289C18.5384 27.3195 18.5384 27.9526 18.9289 28.3431L25.2929 34.7071ZM25 18V34H27V18H25Z"
                fill="#DEFF02"
              />
            </svg>
          </button>
        </div>
        <div className="bg-hexagon-parent">
          <div className="bg-hexagon">
            <svg
              width="1159"
              height="1132"
              viewBox="0 0 1159 1132"
              className="big-hexagon"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M70.0694 203.157C76.3143 158.773 105.756 121.088 147.31 104.29L600.402 -78.8706C642 -95.6863 689.41 -89.0155 724.753 -61.3743L1109.71 239.701C1145.02 267.314 1162.92 311.659 1156.67 356.044L1088.53 840.357C1082.28 884.792 1052.78 922.508 1011.15 939.278L558.152 1121.79C516.631 1138.52 469.343 1131.87 434.051 1104.33L49.0007 803.901C13.6221 776.298 -4.32639 731.905 1.92574 687.47L70.0694 203.157Z"
                stroke="url(#paint0_linear_13_41)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_13_41"
                  x1="601.694"
                  y1="801.253"
                  x2="851.129"
                  y2="84.2676"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.333333" stopColor="#252525" stopOpacity="1" />
                  <stop offset="0.515624" stopColor="#DEFF02" />
                  <stop offset="0.661458" stopColor="#252525" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="791"
              height="828"
              viewBox="0 0 791 828"
              className="small-hexagon"
              fill="none"
            >
              <path
                d="M42.7859 217.055C48.9313 173.378 77.9035 136.294 118.796 119.763L389.861 10.1861C430.796 -6.36156 477.451 0.20287 512.23 27.4036L742.535 207.524C777.278 234.697 794.892 278.336 788.747 322.012L747.975 611.786C741.823 655.513 712.792 692.628 671.833 709.13L400.822 818.321C359.963 834.783 313.428 828.236 278.698 801.138L48.339 621.404C13.5243 594.24 -4.13822 550.555 2.01428 506.828L42.7859 217.055Z"
                stroke="url(#paint0_linear_13_42)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_13_42"
                  x1="490.492"
                  y1="102.114"
                  x2="-18.4127"
                  y2="-77.806"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.333333" stopColor="#252525" stopOpacity="1" />
                  <stop offset="0.515624" stopColor="#DEFF02" />
                  <stop offset="0.661458" stopColor="#252525" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="circle circle-one">
              <img src={i5} alt="mode domains" className="i5" />
            </div>
            <div className="circle circle-two">
              <div className="i2-parent">
                <img src={i2} alt="mode domains" className="i2" />
              </div>
            </div>
            <div className="without-circle circle-three">
              <div className="i3-parent">
                <img src={i3} alt="mode domains" className="i3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSection;
