import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../styles/InitialLoadingAnimation.css";

function InitialLoadingAnimation() {
  const LoaderRef = useRef();
  const [counter, setCounter] = useState(0);

  function hideLoader() {
    // Optionally, you can also remove the entire loader section from the DOM
    // if you don't want it to take up any space after it's hidden.
    LoaderRef.current.style.display = "none";
  }
  useLayoutEffect(() => {
    // gsap.registerPlugin(ScrollTrigger);
    // clean up function
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(".counter", {
        opacity: 0,
        delay: 1.4,
      })
        .to(".bar", { height: 0, delay: 0, stagger: 0.05 }, "-=0.1")
        .to(LoaderRef.current, {
          height: 0,
          opacity: 0,
          ease: "none",
          onComplete: hideLoader,
        });
    }, LoaderRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateCounter = () => {
      if (counter === 100) {
        return;
      }
      let ans = counter;
      if (counter <= 100) setCounter(ans + 1);

      //   setTimeout(updateCounter, delay);
    };
    let delay = Math.floor(Math.random() * 5) + 5;
    if (counter <= 100) {
      setTimeout(() => {
        updateCounter();
      }, delay);
    }
  }, [counter]);
  return (
    <div ref={LoaderRef} className="loaderMain">
      <h1 className="counter">{counter}</h1>
      <div className="overlay">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}

export default InitialLoadingAnimation;
