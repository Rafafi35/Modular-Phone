import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import './App.css'
import phoneModel from "./assets/phone.glb?url";
import { Suspense } from "react";

function App() {

  function Model() {
    const { scene } = useGLTF(phoneModel);
    return <primitive object={scene} scale={1} />;
  }

  return (
      <div className="viewer">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[4, 5, 3]} intensity={1.2} />
              <Suspense fallback={null}>
                  <Model />
              </Suspense>
              <OrbitControls target={[0, 0, 0]} />
          </Canvas>
      </div>
  )
}

export default App
