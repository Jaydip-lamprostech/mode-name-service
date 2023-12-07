import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { PixelShader } from "./PixelShaderNew";
import seedrandom from "seedrandom";
import { random } from "lodash";
import html2canvas from "html2canvas";

const CanvasNew = ({
  input,
  isPremium,
  isVip,
  canvas,
  setCanvas,
  setCanvasUrl,
  isRegular,
}) => {
  const [alpha, setAlpha] = useState(1);
  const [decreasing, setDecreasing] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 500,
  });
  const rendererRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const structureRef = useRef();
  const composerRef = useRef();
  const frameIdRef = useRef();
  let sceneRef = useRef();
  let lightCount = 60;
  let pixelFactor = 1;
  let boxColor = "#dffe00";
  let neonColors = ["#000000", "#494949", "#d2d0cb"];
  let boxesLeftRef = useRef();
  let boxesRightRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (canvas) {
      if (input) {
        if (window.innerWidth > 500) {
          setWindowSize({ width: 500, height: 500 });
        } else {
          setWindowSize({ width: 350, height: 350 });
        }

        setCanvasUrl("");
        if (isPremium && !isVip && !isRegular) {
          rendererRef.current.setClearColor(new THREE.Color("rgb(2, 2, 2)"));
          boxColor = "#494949";
          neonColors = ["#000000", "#494949", "#d2d0cb"];
          updateHelixAndLights();
          animate();
        } else if (!isPremium && isVip && !isRegular) {
          rendererRef.current.setClearColor(new THREE.Color("#dffe00"));
          updateHelixAndLights();
          animate();
        } else if (isRegular && !isVip && !isPremium) {
          rendererRef.current.setClearColor(new THREE.Color("#000"));
          console.log("normal domain name");
          updateHelixAndLights();
          animate();
        }

        setCanvasUrl(canvas.toDataURL());
      }
    }
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
  }, [input, isPremium, isVip, isRegular]);

  useEffect(() => {
    if (canvas) {
      init(canvas);
      if (input) {
        setCanvasUrl("");
        animate();

        if (isPremium && !isVip && !isRegular) {
          rendererRef.current.setClearColor(new THREE.Color("rgb(2, 2, 2)"));
          boxColor = "#494949";
          neonColors = ["#000000", "#494949", "#d2d0cb"];
          updateHelixAndLights();
        } else if (!isPremium && isVip && !isRegular) {
          rendererRef.current.setClearColor(new THREE.Color("#dffe00"));
          updateHelixAndLights();
        } else if (isRegular && !isPremium && !isVip) {
          rendererRef.current.setClearColor(new THREE.Color("#000"));
          updateHelixAndLights();
        }
        setCanvasUrl(canvas.toDataURL());
      }
    }
    setLoading(false);
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
  }, [canvas]);

  let rng = seedrandom(input);

  let numBoxes = 250 + Math.floor(rng() * 20 - 10);
  let baseDistance = 0.035 + rng() * 0.005 - 0.0025;
  let radius = 0.96 + rng() * 0.04 - 0.08;
  let turns = 5 + Math.floor(rng() * 2 - 1.4);
  let angleStep = (turns * Math.PI * 2) / numBoxes;
  let boxHeight = 0.05;
  let boxWidth = boxHeight * 15;
  let boxDepth = boxHeight * 1;

  const updateHelixAndLights = () => {
    if (sceneRef.current && structureRef.current) {
      sceneRef.current.remove(structureRef.current);
      structureRef.current = createBoxesAlongHelix(
        numBoxes,
        angleStep,
        radius,
        baseDistance,
        boxWidth,
        boxHeight,
        boxDepth
      );
      sceneRef.current.add(structureRef.current);
      if (boxesLeftRef.current) {
        sceneRef.current.remove(boxesLeftRef.current);
      }
      if (boxesRightRef.current) {
        sceneRef.current.remove(boxesRightRef.current);
      }
      boxesLeftRef.current = createBoxPattern(
        "left",
        numBoxes,
        angleStep,
        radius,
        baseDistance
      );
      boxesRightRef.current = createBoxPattern(
        "right",
        numBoxes,
        angleStep,
        radius,
        baseDistance
      );
      sceneRef.current.add(boxesLeftRef.current);
      sceneRef.current.add(boxesRightRef.current);

      sceneRef.current.children = sceneRef.current.children.filter(
        (child) => !(child instanceof THREE.PointLight)
      );
      addRandomLights(numBoxes, radius, baseDistance);
    }
  };

  const createBoxesAlongHelix = (
    numBoxes,
    angleStep,
    radius,
    baseDistance,
    boxWidth,
    boxHeight,
    boxDepth
  ) => {
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

  const addRandomLights = (numBoxes, radius, baseDistance) => {
    const lightIntensity = isPremium ? 20 : 0.4 + rng() * 0.1 - 0.05;
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

  const createBoxPattern = (
    side,
    numBoxes,
    angleStep,
    radius,
    baseDistance
  ) => {
    let rng = seedrandom(input);
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
    // console.log("canvas", canvas.height, canvas.width);
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    if (window.innerWidth > 500) {
      rendererRef.current.setSize(500, 500);
    } else {
      rendererRef.current.setSize(350, 350);
    }
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

    addRandomLights();

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

    // const bloomPass = new UnrealBloomPass({
    //   threshold: 0.001,
    //   strength: 0.02,
    //   radius: 0.02,
    //   exposure: 0.1,
    //   renderTargetScale: 0.1,
    // });

    // console.log("vip", isVip);
    // console.log("premium", isPremium);
    // if (!isVip && !isPremium) {
    //   composerRef.current.addPass(bloomPass);
    // } else {
    //   console.log("removing the pass");
    //   console.log(composerRef.current);
    //   composerRef.current.addPass(pixelPass);
    // }
  };

  const animate = () => {
    setCanvasUrl("");
    frameIdRef.current = requestAnimationFrame(animate);

    controlsRef.current.update();
    composerRef.current.render();
    setCanvasUrl(canvas.toDataURL());
  };

  // const downloadNFT = async () => {
  //   var canvas = document.getElementById("canvas");
  //   console.log(canvas);
  //   var link = document.createElement("a");
  //   link.download = "filename.png";
  //   link.href = canvas.toDataURL();
  //   link.click();
  // };
  const canvasParentRef = useRef();
  // Capture canvas image on button click
  const downloadNFT = () => {
    //   console.log("Image URL:", canvasUrl);
    //   const link = document.createElement("a");
    //   link.href = canvasUrl;
    //   link.download = "generated-image.png";
    //   link.click();
  };

  return (
    <div ref={canvasParentRef} id="canvasParent">
      <canvas
        ref={(ref) => setCanvas(ref)}
        style={{
          backgroundColor: isPremium ? "#D1F544" : "#000",
          width: "500px",
          height: "500px",
        }}
        width={500}
        height={500}
      ></canvas>

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

export default CanvasNew;
