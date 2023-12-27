import React from "react";
import "../styles/RoadmapSection.css";
import rmMain from "../assets/roadmap/roadmap_main.png";
import rm1 from "../assets/roadmap/mvp_launch.png";
import rm2 from "../assets/roadmap/audit.png";
import rm3 from "../assets/roadmap/deployment.png";
import rm4 from "../assets/roadmap/campaign.png";
import rm5 from "../assets/roadmap/upgrade.png";
import rm6 from "../assets/roadmap/group.png";
import rm7 from "../assets/roadmap/crowd-of-users.png";
import rm8 from "../assets/roadmap/partner.png";
import rm9 from "../assets/roadmap/spaceid.png";
import rm10 from "../assets/roadmap/mainnet_launch.png";

function RoadmapSection() {
  const roadmap = [
    {
      id: 1,
      date: "Aug 16, 2023",
      icon: rm1,
      title: "MVP launch",
    },
    {
      id: 2,
      date: "Aug 28, 2023",
      icon: rm2,
      title: "Initial Smart Contract Audit",
    },
    {
      id: 3,
      date: "Sept 1, 2023",
      icon: rm3,
      title: "Testnet Smart Contract deployment",
    },
    {
      id: 4,
      date: "Sept 3, 2023",
      icon: rm4,
      title: "Mode Campaign to Claim Mode Domains",
    },
    {
      id: 5,
      date: "Sept 6, 2023",
      icon: rm5,
      title: "Testnet Smart Contract upgrade",
    },
    {
      id: 6,
      date: "Sept 10, 2023",
      icon: rm6,
      title: "First 20,000 users",
    },
    {
      id: 7,
      date: "Sept 19, 2023",
      icon: rm7,
      title: "First 25,000 users",
    },
    {
      id: 8,
      date: "Oct 1, 2023",
      icon: rm8,
      title: "Joined the Mode Network ecosystem as a Partner",
    },
    {
      id: 9,
      date: "Oct 15, 2023",
      icon: rm9,
      title: "Partnered with Space ID",
    },
    {
      id: 10,
      date: "Dec 2023",
      icon: rm10,
      title: "Ready for Mainnet launch",
    },
  ];

  return (
    <div className="roadmap-main">
      <div className="rmMain-parent">
        <img src={rmMain} alt="mode domains" className="rmMain" />
      </div>
      <div className="roadmap-title-main">
        <h2 className="roadmap-title">A SNEAK-PEEK INTO OUR JOURNEY!</h2>
        <p className="roadmap-sub-title">
          Here’s an exclusive view into the steps we took to help you create
          your digital identity
        </p>
      </div>

      <div className="roadmap-journey">
        {roadmap.map((milestone) => (
          <div key={milestone.id} className="roadmap-item">
            <div className="roadmap-date">
              <p>{milestone.date}</p>
            </div>
            <div className="roadmap-icon-title">
              <div className="roadmap-icon-outermain">
                <div className="roadmap-icon-main">
                  <img
                    src={milestone.icon}
                    alt={`Icon for ${milestone.title}`}
                    className="roadmap-icon"
                  />
                </div>
              </div>
              <div className="roadmap-title-text-main roadmap-title-text">
                <p className="">{milestone.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapSection;
