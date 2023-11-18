import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cube(props) {
  const mesh = useRef();
  const [scale, setScale] = useState([2, 2, 2]);
  const [max, setMax] = useState(false);
  const [posMax, setPosMax] = useState(false);
  const limit = 5;

  const changePosition = () => {
    if (mesh.current.position.x >= limit) {
      setPosMax(true);
    }
    if (mesh.current.position.x <= limit * -1) {
      setPosMax(false);
    }
    if (!posMax) {
      mesh.current.position.x += 0.01;
    } else {
      mesh.current.position.x -= 0.01;
    }
  };

  const updateMeshState = () => {
    let current = [];
    if (scale[0] >= limit) {
      setMax(true);
    }
    if (scale[0] <= 2) {
      setMax(false);
    }
    if (scale[0] < limit && !max) {
      current = scale[0] + 0.001;
    } else {
      current = scale[0] - 0.001;
    }
    setScale([current, current, current]);
  };
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.03;
    changePosition();
    updateMeshState();
  });
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color="#146C94" />
    </mesh>
  );
}
