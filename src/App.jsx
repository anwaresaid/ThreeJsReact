import { Canvas } from "@react-three/fiber";
import "./App.css";
import Cube from "./components/Cube";

function App() {
  return (
    <Canvas dpr={window.devicePixelRatio}>
      <color attach="background" args={["#B0DAFF"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* to show the sphere comment the cube line and uncomment the sphere line */}
      {/* <Sphere position={[0, 0, 0]} /> */}
      <Cube position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
