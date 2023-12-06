import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { PixelShader } from "./PixelShader";
import seedrandom from "seedrandom";

const Canvas = ({ input, setImgUrl, imgUrl, isPremium, canvas, setCanvas }) => {
  let rng = seedrandom(input);

  let rendererRef = useRef(null);
  let cameraRef = useRef(null);
  let controlsRef = useRef(null);
  let sceneRef = useRef(null);
  let composerRef = useRef(null);
  let frameIdRef = useRef(null);
  let structureRef = useRef(null);

  let numBoxes = 320 + Math.floor(rng() * 20 - 10);
  let baseDistance = 0.035 + rng() * 0.005 - 0.0025;
  let radius = 0.96 + rng() * 0.04 - 0.02;
  let turns = 5 + Math.floor(rng() * 2 - 1);
  let angleStep = (turns * Math.PI * 2) / numBoxes;
  let boxHeight = 0.05;
  let boxWidth = boxHeight * 15;
  let boxDepth = boxHeight * 1;
  let pixelFactor = 1;
  let lightCount = 100;

  let boxColor = isPremium ? "gray" : "#dffe00";
  let neonColors = ["#000000", "#494949", "#d2d0cb"];

  let boxesLeftRef = useRef(null);
  let boxesRightRef = useRef(null);
  let boxPatternParameters = {
    count: Math.floor(20 + rng() * 30),
    size: () => 0.01 + rng() * 0.15,
    separation: 0.01 + rng() * 0.1,
  };

  // useEffect(() => {
  //   if (input) {
  //     updateHelixAndLights();
  //   }
  //   // return () => {
  //   //   cancelAnimationFrame(frameIdRef.current);
  //   //   if (rendererRef.current) rendererRef.current.dispose();
  //   //   if (controlsRef.current) controlsRef.current.dispose();
  //   //   if (sceneRef.current) sceneRef.current.clear();
  //   // };
  // }, [input]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setInputQuery(input);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timer);
  //     setInputQuery(null);
  //   };
  // }, [input]);

  useEffect(() => {
    if (canvas) {
      init(canvas);
    }
    // return () => {
    //   cancelAnimationFrame(frameIdRef.current);
    //   if (rendererRef.current) rendererRef.current.dispose();
    //   if (controlsRef.current) controlsRef.current.dispose();
    //   if (sceneRef.current) sceneRef.current.clear();
    // };
  }, [canvas]);

  useEffect(() => {
    // Load the font when the component mounts
    // Load the font when the component mounts

    if (canvas) {
      if (input) {
        // init(canvas);
        animate();
        updateHelixAndLights();
      }
    }
    // return () => {
    //   cancelAnimationFrame(frameIdRef.current);
    //   if (rendererRef.current) rendererRef.current.dispose();
    //   if (controlsRef.current) controlsRef.current.dispose();
    //   if (sceneRef.current) sceneRef.current.clear();
    // };
    return () => {
      // Dispose of Three.js objects
      if (structureRef.current) {
        structureRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Dispose of geometry and materials
            child.geometry.dispose();
            child.material.dispose();
          }
        });
        sceneRef.current.remove(structureRef.current);
      }

      if (boxesLeftRef.current) {
        boxesLeftRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Dispose of geometry and materials
            child.geometry.dispose();
            child.material.dispose();
          }
        });
        sceneRef.current.remove(boxesLeftRef.current);
      }

      if (boxesRightRef.current) {
        boxesRightRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Dispose of geometry and materials
            child.geometry.dispose();
            child.material.dispose();
          }
        });
        sceneRef.current.remove(boxesRightRef.current);
      }

      cancelAnimationFrame(frameIdRef.current);

      // Dispose of renderer and controls
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      // if (controlsRef.current) {
      //   controlsRef.current.dispose();
      // }

      // Clear the scene
      if (sceneRef.current) {
        sceneRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Dispose of geometry and materials
            child.geometry.dispose();
            child.material.dispose();
          }
        });
        sceneRef.current.clear();
      }
    };
  }, [input]);

  const setFileNft = async () => {
    console.log("setFileNFT start");
    // Convert canvas to blob after rendering
    const final = await canvas.toDataURL();
    const file = await canvasToBlob(canvas);

    // console.log(final);
    // console.log(file);

    // const final = URL.createObjectURL(file);
    setImgUrl(final);
    // console.log("setFileNFT end");
  };

  const canvasToBlob = (canvas) => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], "modedomainsnft.png", {
          type: "image/png",
        });
        resolve(file);
        resolve(blob);
      });
    });
  };

  const updateHelixAndLights = () => {
    console.log("updateHelix start");
    rng = seedrandom(input);
    numBoxes = 320 + Math.floor(rng() * 20 - 10);
    baseDistance = 0.035 + rng() * 0.005 - 0.0025;
    radius = 0.96 + rng() * 0.04 - 0.08;
    turns = 5 + Math.floor(rng() * 2 - 1.4);
    angleStep = (turns * Math.PI * 2) / numBoxes;
    pixelFactor = 1 + Math.floor(rng() * 8);
    if (sceneRef.current && structureRef.current) {
      sceneRef.current.remove(structureRef.current);
      structureRef.current = createBoxesAlongHelix();
      sceneRef.current.add(structureRef.current);
      if (boxesLeftRef.current) {
        sceneRef.current.remove(boxesLeftRef.current);
      }
      if (boxesRightRef.current) {
        sceneRef.current.remove(boxesRightRef.current);
      }
      boxesLeftRef.current = createBoxPattern("left");
      boxesRightRef.current = createBoxPattern("right");
      sceneRef.current.add(boxesLeftRef.current);
      sceneRef.current.add(boxesRightRef.current);
    }
    if (sceneRef.current) {
      sceneRef.current.children = sceneRef.current.children.filter(
        (child) => !(child instanceof THREE.PointLight)
      );
    }
    // Define ambient light color and intensity
    const ambientLightColor = 0x404040; // Adjust the color to your liking
    const ambientLightIntensity = 0.2; // Adjust the intensity based on your scene

    // Create ambient light
    const ambientLight = new THREE.AmbientLight(
      ambientLightColor,
      ambientLightIntensity
    );

    // Add ambient light to the scene
    if (sceneRef.current) sceneRef.current.add(ambientLight);

    const lightIntensity = 0.4 + rng() * 0.1 - 0.05;
    const lightDistance = 5000 + rng() * 1000 - 500;

    for (let colorIndex = 0; colorIndex < 20; colorIndex++) {
      const color = new THREE.Color(neonColors[colorIndex]);

      // for (let i = 0; i < 50 / neonColors.length; i++) {
      const light = new THREE.PointLight(color, lightIntensity, lightDistance);
      light.position.set(
        (rng() - 0.5) * radius * 2,
        rng() * numBoxes * baseDistance - ((numBoxes - 1) * baseDistance) / 2,
        (rng() - 0.5) * radius * 2
      );

      // }
      if (sceneRef.current) sceneRef.current.add(light);
    }

    // Define ambient light color and intensity
    // Adjust the color to your liking

    console.log("updateHelix ends");
    setFileNft();
  };

  const createBoxesAlongHelix = () => {
    const structure = new THREE.Group();

    for (let i = 0; i < numBoxes; i++) {
      const theta = angleStep * i;
      const x = radius * Math.sin(theta);
      const y = i * baseDistance;
      const z = radius * Math.cos(theta);

      const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      const boxMaterial = new THREE.MeshStandardMaterial({
        color: boxColor,
        metalness: 0,
        roughness: 1,
      });

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(x, y, z);
      box.castShadow = true;
      box.receiveShadow = true;

      structure.add(box);
    }

    structure.position.y = -((numBoxes - 1) * baseDistance) / 2;
    return structure;
  };

  const addRandomLights = () => {
    const lightIntensity = 0.4 + rng() * 0.1 - 0.05;
    const lightDistance = 5000 + rng() * 1000 - 500;

    for (let colorIndex = 0; colorIndex < neonColors.length; colorIndex++) {
      const color = new THREE.Color(neonColors[colorIndex]);
      for (let i = 0; i < lightCount / neonColors.length; i++) {
        const light = new THREE.PointLight(
          color,
          lightIntensity,
          lightDistance
        );
        light.position.set(
          (rng() - 0.5) * radius * 2,
          rng() * numBoxes * baseDistance - ((numBoxes - 1) * baseDistance) / 2,
          (rng() - 0.5) * radius * 2
        );
        sceneRef.current.add(light);
      }
    }
  };

  const createBoxPattern = (side) => {
    const pattern = new THREE.Group();
    const count = Math.floor(6 + rng() * 60);
    const size = 0.02 + rng() * 0.02;
    const separation = size * 0.5;
    const directionMultiplier = side === "left" ? -1 : 1;

    const safeDistanceFromHelix = radius + size;

    for (let i = 0; i < count; i++) {
      const boxGeometry = new THREE.BoxGeometry(size, size, size);
      const boxMaterial = new THREE.MeshStandardMaterial({ color: boxColor });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);

      let posX = directionMultiplier * safeDistanceFromHelix;
      let posY =
        rng() * numBoxes * baseDistance - ((numBoxes - 1) * baseDistance) / 2;
      let posZ = 0;
      let theta =
        ((posY + ((numBoxes - 1) * baseDistance) / 2) / baseDistance) *
        angleStep;
      let helixX = radius * Math.sin(theta);

      if (side === "left") {
        while (posX > helixX - size) {
          posY -= separation;
          theta =
            ((posY + ((numBoxes - 1) * baseDistance) / 2) / baseDistance) *
            angleStep;
          helixX = radius * Math.sin(theta);
        }
      } else {
        while (posX < helixX + size) {
          posY -= separation;
          theta =
            ((posY + ((numBoxes - 1) * baseDistance) / 2) / baseDistance) *
            angleStep;
          helixX = radius * Math.sin(theta);
        }
      }

      box.position.set(posX, posY, posZ);
      pattern.add(box);
    }

    return pattern;
  };

  const init = (canvas) => {
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000
    );

    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    rendererRef.current.setSize(canvas.width, canvas.height);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setClearColor(new THREE.Color("#000"));
    controlsRef.current = new OrbitControls(
      cameraRef.current,
      rendererRef.current.domElement
    );
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;
    controlsRef.current.maxPolarAngle = Math.PI;

    rendererRef.current.shadowMap.enabled = true;
    rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;

    // addRandomLights();

    structureRef.current = createBoxesAlongHelix();
    sceneRef.current.add(structureRef.current);

    boxesLeftRef.current = createBoxPattern("left");
    boxesRightRef.current = createBoxPattern("right");
    sceneRef.current.add(boxesLeftRef.current);
    sceneRef.current.add(boxesRightRef.current);

    cameraRef.current.position.z = 3.1;

    composerRef.current = new EffectComposer(rendererRef.current);
    const renderPass = new RenderPass(sceneRef.current, cameraRef.current);
    composerRef.current.addPass(renderPass);

    const pixelPass = new ShaderPass(PixelShader);
    pixelPass.uniforms["resolution"].value = new THREE.Vector2(
      canvas.width * 2,
      canvas.height * 2
    );
    pixelPass.uniforms["pixelSize"].value = pixelFactor;
    composerRef.current.addPass(pixelPass);

    const bloomPass = new UnrealBloomPass({
      threshold: 0.02,
      strength: 0.02,
      radius: 0.02,
      exposure: 0.1,
    });
    composerRef.current.addPass(bloomPass);
  };

  const animate = () => {
    frameIdRef.current = requestAnimationFrame(animate);
    controlsRef.current.update();
    composerRef.current.render();
  };

  const downloadNFT = async () => {
    const file = await canvasToBlob(canvas);
    const link = document.createElement("a");
    const dk = URL.createObjectURL(file);
    // console.log(dk);
    link.href = dk;
    link.download = "pattern.png";
    link.click();
  };

  return (
    <div>
      <canvas
        ref={(ref) => setCanvas(ref)}
        // id="canvas"
        width={500}
        height={500}
        // className="hidden"
      />
      {/* {input ? (
        <>
          <img
            src={canvas ? canvas.toDataURL() : ""}
            alt=""
            className="nftGenImg"
          />
        </>
      ) : null} */}

      {/* <button onClick={() => downloadNFT()}>download</button> */}
    </div>
  );
};

export default Canvas;
