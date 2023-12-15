import React from "react";
import RoadmapSection from "../components/RoadmapSection";
import { useEffect } from "react";

function Roadmap() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      pagePath: window.location.pathname,
      pageTitle: "Roadmap",
      location: window.location.href,
    });
  }, []);
  return <>
    <RoadmapSection />
  </>
}

export default Roadmap;
