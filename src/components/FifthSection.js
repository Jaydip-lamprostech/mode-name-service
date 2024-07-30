import React, { useLayoutEffect, useRef, useState } from "react";
import i8 from "../assets/8.png";
import i7 from "../assets/7.png";
import test1 from "../assets/testimonial1.jpg";
import test2 from "../assets/testimonial2.jpg";
import test3 from "../assets/testimonial3.jpg";

import "../styles/FifthSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function FifthSection() {
  const fifthSectionRef = useRef();
  // gsap animation code start - DO NOT REMOVE THIS CODE
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      // use scoped selectors
      gsap.set(".fifth-title-gsap", { x: 0, opacity: 1, scale: 1 });
      // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
      gsap.from(".fifth-title-gsap", {
        opacity: 0,
        x: -110,
        scale: 0,
        scrollTrigger: {
          trigger: ".fifth-main",
          start: "top bottom", // Change start position to trigger the animation
          end: "top +=680",
          toggleActions: "play none none reverse",
        },
      });
      gsap.set(".fifth-sub-title-gsap", { y: 0, opacity: 1 });
      // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
      gsap.from(".fifth-sub-title-gsap", {
        opacity: 0,
        y: 10,
        scrollTrigger: {
          trigger: ".fifth-main",
          start: "top center", // Change start position to trigger the animation
          end: "top +=680",
          toggleActions: "play none none reverse",
        },
      });
      // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
      gsap.set(".i7", { opacity: 1, x: 0 });
      gsap.from(".i7", {
        opacity: 0,
        x: 100,
        rotation: 10,
        duration: 2,
        scrollTrigger: {
          trigger: ".fifth-main",
          start: "top +=520", // Change start position to trigger the animation
          end: "top +=690",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(".i8", {
        opacity: 0,
        x: -100,
        rotation: 10,
        scale: 1,
        scrollTrigger: {
          trigger: ".fifth-main",
          start: "top +=720", // Change start position to trigger the animation

          toggleActions: "play none none reverse",
          onLeave: ({ progress, direction, isActive }) => {
            console.log(progress, direction, isActive);
            gsap.to(".fifth-main", {});
          },
        },
      });
      // gsap.utils.toArray(".sc-right-item").forEach((element) => {
      gsap.set(".fifth-item", { opacity: 1, x: 0 });
      gsap.from(".fifth-item", {
        opacity: 0,
        x: 100,
        stagger: 0,
        scrollTrigger: {
          trigger: ".fifth-main",
          start: "top +=420", // Change start position to trigger the animation

          toggleActions: "play none none reverse",
        },
      });

      // });
    }, fifthSectionRef);
    // clean up function
    return () => ctx.revert();
  }, []);

  //slider code

  const sliderRef = useRef(null);
  const cardsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);

  const moveSliderRight = () => {
    cardsRef.current.appendChild(cardsRef.current.firstChild);
    updateCardStyles();
  };

  const updateCardStyles = () => {
    const cards = Array.from(cardsRef.current.children);

    const isMobileScreen = window.innerWidth <= 768;

    cards.forEach((card, index) => {
      if (isMobileScreen) {
        // For mobile screens, show two cards with different styles

        if (index === 0) {
          card.style.backgroundColor = "yellow";
          card.style.opacity = 1;
        } else if (index === 1) {
          card.style.backgroundColor = "white";
          card.style.opacity = 0.2;
        }
      } else {
        // For larger screens, apply the existing styles

        if (index % 3 === 0) {
          card.style.backgroundColor = "yellow";
          card.style.opacity = 1;
        } else if (index % 3 === 1) {
          card.style.backgroundColor = "white";
          card.style.opacity = 1;
        } else {
          card.style.backgroundColor = "white";
          card.style.opacity = 0.2;
        }
      }
    });
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialX;
      sliderRef.current.style.transform = `translateX(${deltaX}px)`;
    }
  };

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
      </div>
      <div className="fifth-details">
        <div className="fifth-item">
          <span className="fifth-count">30K+</span>
          <span className="fifth-label">Handles Claimed</span>
        </div>
        <div className="slider-container">
          <div ref={cardsRef} className="slider">
            <div className="card">
              <img src={test1} alt="" />
            </div>
            <div className="card">
              <img src={test2} alt="" />
            </div>
            <div className="card">
              <img src={test3} alt="" />
            </div>
            <div className="card">
              <img src={test1} alt="" />
            </div>
            <div className="card">
              <img src={test2} alt="" />
            </div>
            <div className="card">
              <img src={test3} alt="" />
            </div>
          </div>
          <div className="arrow" onClick={moveSliderRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M5.81685 1.93145C5.61766 2.1307 5.50576 2.4009 5.50576 2.68263C5.50576 2.96437 5.61766 3.23457 5.81685 3.43382L11.0762 8.6932L5.81685 13.9526C5.6233 14.153 5.51621 14.4214 5.51863 14.6999C5.52105 14.9785 5.63279 15.245 5.82979 15.442C6.02678 15.639 6.29327 15.7507 6.57186 15.7532C6.85044 15.7556 7.11883 15.6485 7.31922 15.4549L13.3298 9.44438C13.529 9.24514 13.6409 8.97493 13.6409 8.6932C13.6409 8.41146 13.529 8.14126 13.3298 7.94201L7.31922 1.93145C7.11997 1.73226 6.84977 1.62036 6.56803 1.62036C6.2863 1.62036 6.01609 1.73226 5.81685 1.93145Z"
                fill="#F8F8F8"
              />
            </svg>
          </div>
          {/* <div
            className="slider-handle"
            // onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            Handle
          </div> */}
        </div>
        {/* <div className="fifth-item">
            <span className="fifth-count">101 ETH</span>
            <span className="fifth-label">Collected</span>
          </div> */}
      </div>
      <img src={i8} alt="mode domains" className="fifthsection-i8 i8" />
      <div className="fifthsection-i7">
        <img src={i7} alt="mode domains" className="i7" />
      </div>
    </div>
  );
}

export default FifthSection;
