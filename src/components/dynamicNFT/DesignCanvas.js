import React, { useEffect, useRef, useState } from "react";
import { Canvas as ThreeCanvas } from "react-three-fiber";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass";
import { PixelShader } from "./PixelShader";
import seedrandom from "seedrandom";

const DesignCanvas = ({ input }) => {
  let rng = seedrandom(input);
  let cameraRef = useRef();
  let sceneRef = useRef();
  let composerRef = useRef();
  let structureRef = useRef();
  let canvasRef = useRef(null);
  let rendererRef = useRef(null);
  let controlsRef = useRef(null);

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

  let boxColor = "#dffe00";
  let neonColors = ["#000000", "#494949", "#d2d0cb"];

  let boxesLeftRef = useRef(null);
  let boxesRightRef = useRef(null);
  let boxPatternParameters = {
    count: Math.floor(20 + rng() * 30),
    size: () => 0.01 + rng() * 0.15,
    separation: 0.01 + rng() * 0.1,
  };

  useEffect(() => {
    updateHelixAndLights();
  }, []);

  useEffect(() => {
    init();
    return () => {
      if (composerRef.current) composerRef.current.dispose();
      if (sceneRef.current) sceneRef.current.clear();
    };
  }, []);
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

  const updateHelixAndLights = () => {
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
        if (sceneRef.current) sceneRef.current.add(light);
      }
    }
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

  const init = () => {
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    rendererRef.current.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
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
      canvasRef.current.clientWidth * 2,
      canvasRef.current.clientHeight * 2
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

  return (
    <ThreeCanvas
      ref={canvasRef}
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <ambientLight intensity={0.4} />
      <spotLight position={[2, 5, 5]} angle={0.15} penumbra={1} />
      <spotLight position={[-2, 5, -5]} angle={0.15} penumbra={1} />
      <pointLight position={[-5, -5, -5]} intensity={2} />
      <pointLight position={[5, 5, 5]} intensity={2} />

      <mesh ref={structureRef}>
        {Array.from({ length: numBoxes }).map((_, i) => {
          // Create and render each box in the helix
          const theta = angleStep * i;
          const x = radius * Math.sin(theta);
          const y = i * baseDistance;
          const z = radius * Math.cos(theta);

          return (
            <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
              <boxGeometry args={[boxWidth, boxHeight, boxDepth]} />
              <meshStandardMaterial
                color={boxColor}
                metalness={0}
                roughness={1}
              />
            </mesh>
          );
        })}
      </mesh>

      <EffectComposer ref={composerRef}>
        <RenderPass
          attachArray="passes"
          scene={sceneRef.current}
          camera={cameraRef.current}
        />
        <ShaderPass
          attachArray="passes"
          args={[PixelShader]}
          uniforms-resolution-value={[
            window.innerWidth * 2,
            window.innerHeight * 2,
          ]}
          uniforms-pixelSize-value={pixelFactor}
        />
        <UnrealBloomPass attachArray="passes" args={[1.5, 0.4, 0.02, 0.1]} />
      </EffectComposer>

      {/* <mesh position={[0, -1.5, 0]} receiveShadow>
        <textGeometry
          args={[input, { font: new FontLoader(), size: 0.1, height: 0.01 }]}
        />
        <meshStandardMaterial color="white" />
      </mesh> */}

      <OrbitControls />
    </ThreeCanvas>
  );
};

const NFTGenerator = () => {
  const contentRef = useRef(null);
  const wrapperElementRef = useRef(null);
  const [domainName, setDomainName] = useState("");
  const [generatedDesign, setGeneratedDesign] = useState(null);

  const generateNFT = () => {
    // You might want to add logic to validate the domain name
    const input = domainName.trim().toLowerCase();
    setGeneratedDesign(input);
  };

  return (
    <div>
      <h2>Generate NFT</h2>
      <label>
        Enter Domain Name:
        <input
          type="text"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
        />
      </label>
      <button onClick={generateNFT}>Generate</button>
      <div
        className="wrapper"
        ref={wrapperElementRef}
        style={{ maxWidth: "600px" }}
      >
        <div className="content" ref={contentRef}>
          {generatedDesign && <DesignCanvas input={generatedDesign} />}
        </div>
      </div>
    </div>
  );
};

export default NFTGenerator;
