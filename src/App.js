import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import InitialLoadingAnimation from "./components/InitialLoadingAnimation";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";

function App() {
  const AppRef = useRef();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate some asynchronous action, like fetching data
  //   setTimeout(() => {
  //     setLoading(false); // Set loading to false after the async action is complete
  //   }, 3300); // Adjust the timeout based on your needs
  // }, []); // Empty dependency array ensures the effect runs only once

  // gsap animation code start - DO NOT REMOVE THIS CODE
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   let ctx = gsap.context(() => {
  //     gsap.set("i4", { x: 0, y: 0 });
  //     gsap.to(".i4", {
  //       scrollTrigger: {
  //         trigger: ".fs-container",
  //         start: "top top",
  //         end: "bottom bottom",
  //         toggleActions: "play none none reverse",

  //         onUpdate: (self) => {
  //           const progress = self.progress;

  //           // Calculate the values for opacity, x position, and rotation based on scroll progress
  //           const yPos = progress * -200; // Adjust the value as needed for the distance

  //           gsap.to(".i4", {
  //             y: yPos,
  //           });
  //         },
  //       },
  //     });
  //     gsap.to(".bg-yellow", {
  //       scrollTrigger: {
  //         trigger: ".fs-container",
  //         start: "top top",
  //         end: "bottom bottom",
  //         toggleActions: "play none none reverse",

  //         onUpdate: (self) => {
  //           const progress = self.progress;

  //           gsap.to(".bg-yellow", {
  //             opacity: 1 - progress * 4,
  //             x: -progress * 50,
  //             ease: "none",
  //           });
  //         },
  //       },
  //     });
  //   }, AppRef);
  //   // clean up function
  //   return () => ctx.revert();
  // }, []);

  return (
    <div className="App" ref={AppRef}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </Router>
      <InitialLoadingAnimation />
      <Footer />
    </div>
  );
}

export default App;
