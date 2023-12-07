import React, { useEffect, useRef, useState } from "react";
import "./Wrapper.css"; // Import your CSS file
import html2canvas from "html2canvas";
import CanvasNew from "./CanvasNew";

const Wrapper = ({
  input,
  isPremium,
  isVip,
  setIsPremium,
  setIsVip,
  isRegular,
  setIsRegular,
}) => {
  const [canvas, setCanvas] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const textElementRef = useRef(null);
  const contentRef = useRef(null);
  const wrapperElementRef = useRef(null);
  const [canvasUrl, setCanvasUrl] = useState("");
  let fontForName = 40;

  useEffect(() => {
    const horizontalPadding = 20 * 2;
    const adjustFontSize = () => {
      const wrapperWidth = wrapperElementRef.current.clientWidth;

      const textWidth = textElementRef.current.scrollWidth;
      // console.log("textWidth", textWidth);
      const parentWidth = wrapperWidth - horizontalPadding;
      // console.log("parentWidth", parentWidth);

      let fontSize = fontForName;
      textElementRef.current.style.fontSize = `${fontSize}px`;

      while (
        textElementRef.current.scrollWidth > parentWidth &&
        fontSize > 16
      ) {
        fontSize--;
        textElementRef.current.style.fontSize = `${fontSize}px`;
      }
    };
    if (input && input.length > 2) adjustFontSize();
    else if (!input) {
      // textElementRef.current.style.fontSize = "64px";
    }
  }, [fontForName, input]);

  const combineAndDownload = async () => {
    // Image sources (replace these with your image URLs or Base64 data)
    const imageUrl1 = canvasUrl;
    const getImage2 = async () => {
      const dataUrl2 = await html2canvas(wrapperElementRef.current).then(
        (canvas) => canvas.toDataURL()
      );

      return dataUrl2;
    };
    const imageUrl2 = await getImage2();
    // Create two image objects
    const image1 = new Image();
    const image2 = new Image();

    // Set image sources
    image1.src = imageUrl1;
    image2.src = imageUrl2;

    await Promise.all([
      new Promise((resolve) => (image1.onload = resolve)),
      new Promise((resolve) => (image2.onload = resolve)),
    ]);
    // Callback to execute after both images have loaded
    const drawImages = () => {
      // Create a canvas
      const canvas2 = document.createElement("canvas");
      const context = canvas2.getContext("2d");

      // Set canvas size to the maximum of the two images
      canvas2.width = Math.max(image1.width, image2.width) + 2;
      canvas2.height = image1.height + image2.height + 2;

      // Draw a border
      const borderWidth = 1;
      context.fillStyle = "#333333"; // Border color (white in this case)
      context.fillRect(0, 0, canvas2.width, canvas2.height);
      // Draw the images onto the canvas
      context.drawImage(image1, borderWidth, borderWidth);
      context.drawImage(image2, borderWidth, image1.height + borderWidth);

      // Convert the canvas to a data URL
      const combinedDataUrl = canvas2.toDataURL();

      // Trigger the download
      const link = document.createElement("a");
      link.href = combinedDataUrl;
      link.download = "combined-image.png";
      link.click();
    };
    drawImages();
  };

  return (
    <>
      <div className="wrapper">
        <div className="content" ref={contentRef}>
          {input.length <= 2 ? (
            <div className="overlay2"></div>
          ) : (
            <CanvasNew
              input={input}
              setImgUrl={setImgUrl}
              imgUrl={imgUrl}
              isPremium={isPremium}
              setCanvas={setCanvas}
              canvas={canvas}
              isVip={isVip}
              setCanvasUrl={setCanvasUrl}
              isRegular={isRegular}
            />
          )}

          {input && input.length > 2 ? (
            <div
              className={`text-wrapper ${
                isPremium
                  ? "PremiumyellowBackgroundText"
                  : "NormalblackBackgroundText"
              }`}
              ref={wrapperElementRef}
            >
              <p ref={textElementRef} style={{ fontSize: `${fontForName}px` }}>
                {input ? `${input}.mode` : ".mode"}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      {/* {input ? (
        <div className="mainNFTDiv hidden">
          <img
            src={canvas ? canvas.toDataURL() : ""}
            alt=""
            className="nftGenImg"
          />
          <div
            className={`text-wrapper ${
              isPremium
                ? "PremiumyellowBackgroundText"
                : "NormalblackBackgroundText"
            }`}
          >
            <p ref={textElementRef} style={{ fontSize: `${fontForName}px` }}>
              {input ? `${input}.mode` : ".mode"}
            </p>
          </div>
        </div>
      ) : null} */}
      <button onClick={combineAndDownload}>Download</button>
    </>
  );
};

export default Wrapper;
