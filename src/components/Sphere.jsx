import { useState, useRef } from "react";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

export const Sphere = (props) => {
  const mesh = useRef();
  const [isHovering, setIsHovering] = useState(false);
  let uniforms = {
    colorB: { value: new THREE.Color(0x31c48d) },
    colorA: { value: new THREE.Color(0x6c63ff) },
  };

  function vertexShader() {
    return `
    uniform float uTime;
    uniform float uHoverState;
    
    attribute float aRandom;
    
    varying vec3 vPosition;
  
    void main() {

      vPosition = position;
  
  
      vec3 newPos = position;
  
  
      newPos.x += sin(uTime * aRandom) * uHoverState;
      newPos.y += cos(uTime * aRandom) * uHoverState;
      newPos.z += cos(uTime * aRandom) * uHoverState;
  
  
  
      vec4 localPosition = vec4(newPos, 1.0);
  
      vec4 worldPosition = modelMatrix * localPosition;
      
      vec4 viewPosition = viewMatrix * worldPosition;
  
      vec4 clipPosition = projectionMatrix * viewPosition;
  
      gl_Position = clipPosition;
  

  }
    `;
  }
  function fragmentShader() {
    return `
    uniform vec3 uColor;
    uniform vec3 uColor1;
   varying vec3 vPosition;

    void main() {
      float depth = vPosition.x;

      vec3 mixedColor = mix(uColor, uColor1, depth);
      gl_FragColor = vec4(mixedColor, 1.0);    }
`;
  }

  const ShadeTest = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  });
  const handleMouseOver = () => {
    console.log("in");
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    console.log("out");
    setIsHovering(false);
  };
  extend({ ShadeTest });
  return (
    <mesh
      {...props}
      ref={mesh}
      onPointerEnter={handleMouseOver}
      onPointerLeave={handleMouseOut}
    >
      <sphereGeometry
        args={[1]}
        // onMouseOver={handleMouseOver}
        // onMouseOut={handleMouseOut}
      />
      {/* <meshStandardMaterial color="#146C94" /> */}

      <shadeTest />
    </mesh>
  );
};
