import React, { useLayoutEffect, useRef, useState } from "react";
import "../styles/FAQs.css";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

function FAQs() {
  const [activeBox, setActiveBox] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const faqs = [
    {
      id: 1,
      question: "What is Mode Domains?",
      answer:
        'A platform that helps users simplify blockchain interactions and transactions by replacing complex addresses with personalized ".mode" handles.',
    },
    {
      id: 2,
      question: 'Are ".mode" handles secure?',
      answer:
        'Yes, ".mode" handles are designed with security in mind. The system leverages Solidity-based Smart Contracts to ensure accurate resolution of transactions, providing a secure and reliable user experience.',
    },
    {
      id: 3,
      question: 'Can I update my ".mode" handle?',
      answer:
        'Absolutely. The user-centric interface allows you to effortlessly update and manage your ".mode" handles in real-time. Just log in to your account and make the desired changes through the dashboard.',
    },
    {
      id: 4,
      question: 'Can I use my ".mode" handle across different platforms?',
      answer:
        'Mode Domains is designed for cross-platform accessibility, allowing you to use your ".mode" handle across various devices and within the partner ecosystem platforms for a seamless user experience.',
    },
    {
      id: 5,
      question: 'Can I use my ".mode" handle across different platforms?',
      answer:
        'Mode Domains is designed for cross-platform accessibility, allowing you to use your ".mode" handle across various devices and within the partner ecosystem platforms for a seamless user experience.',
    },
  ];

  const faqSectionRef = useRef();
  // gsap animation code start - DO NOT REMOVE THIS CODE
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   let ctx = gsap.context(() => {
  //     // use scoped selectors
  //     gsap.set(".faq-title-gsap", { y: 0, opacity: 1, scale: 1 });
  //     // gsap.from(".second-title-gsap", { opacity: 0, x: -50, duration: 1 });
  //     gsap.from(".faq-title-gsap", {
  //       opacity: 0,
  //       y: 30,
  //       scale: 0,
  //       scrollTrigger: {
  //         trigger: ".faqs-main",
  //         start: "top 80%", // Change start position to trigger the animation

  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     // gsap.utils.toArray(".sc-right-item").forEach((element) => {
  //     gsap.set(".faqs-box", { opacity: 1, y: 0 });
  //     gsap.from(".faqs-box", {
  //       opacity: 0,
  //       y: 30,
  //       stagger: 0.2,
  //       scrollTrigger: {
  //         trigger: ".faqs-main",
  //         start: "top 75%", // Change start position to trigger the animation

  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     gsap.set(".view-more-gsap", { opacity: 1, y: 0 });
  //     gsap.from(".view-more-gsap", {
  //       opacity: 0,
  //       y: -50,
  //       scrollTrigger: {
  //         trigger: ".faqs-main",
  //         start: "top +=420", // Change start position to trigger the animation
  //         end: "top +=400",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     // });
  //   }, faqSectionRef);
  //   // clean up function
  //   return () => ctx.revert();
  // }, []);
  return (
    <div className="faqs-container" ref={faqSectionRef}>
      <div className="faqs-main">
        <h2 className="faq-title-gsap">FAQ</h2>
        <p className="view-more-gsap">
          <span onClick={() => setViewAll(!viewAll)}>
            {" "}
            {viewAll ? "View Less" : "View More"}
          </span>
        </p>
        <div className="faqs-grid-boxes">
          {faqs.length > 0 &&
            viewAll &&
            faqs.map((item, key) => {
              return (
                <div
                  className={`faqs-box ${activeBox === key ? "active" : ""}`}
                  key={item.id}
                  onClick={() => {
                    if (activeBox === key) {
                      setActiveBox();
                    } else {
                      setActiveBox(key);
                    }
                  }}
                >
                  <div className="faq-details">
                    <span className="faq">{item.question}</span>
                    <span
                      className={`faq-answer ${
                        activeBox === key ? "" : "ellipsis"
                      }`}
                    >
                      {item.answer}
                    </span>
                  </div>
                  <div className="faq-more">
                    <span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="Arrow 3"
                          d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM1 9L15 9V7L1 7L1 9Z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}

          {faqs.length > 0 &&
            !viewAll &&
            faqs.map(
              (item, index) =>
                index < 4 && (
                  <div
                    className={`faqs-box ${
                      activeBox === index ? "active" : ""
                    }`}
                    key={item.id}
                    onClick={() => {
                      if (activeBox === index) {
                        setActiveBox();
                      } else {
                        setActiveBox(index);
                      }
                    }}
                  >
                    <div className="faq-details">
                      <span className="faq">{item.question}</span>
                      <span
                        className={`faq-answer ${
                          activeBox === index ? "" : "ellipsis"
                        }`}
                      >
                        {item.answer}
                      </span>
                    </div>
                    <div className="faq-more">
                      <span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            id="Arrow 3"
                            d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM1 9L15 9V7L1 7L1 9Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default FAQs;
