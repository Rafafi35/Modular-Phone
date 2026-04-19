import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import phoneModel from "../assets/phone.glb?url";
import { Suspense } from "react";

export default function Configure() {

    function Model() {
        const { scene } = useGLTF(phoneModel);
        return <primitive object={scene} scale={1} />;
    }

    const buttonStyle = "m-2 p-2 rounded-xl transition-colors hover:bg-gray-100 inline-flex items-center gap-2";

  return (
      <div className="flex items-center justify-center">
          <div className="mt-14 mr-5 border-3 rounded w-1/3 h-160">
              <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[4, 5, 3]} intensity={1.2} />
                  <Suspense fallback={null}>
                      <Model />
                  </Suspense>
                  <OrbitControls target={[0, 0, 0]} />
              </Canvas>
          </div>

          <div className="w-1/2 h-160 mt-14    ">
              <div className="flex flex-row gap-4 justify-center border-2 border-gray-200 rounded">
                  <button className={buttonStyle}>Base Phone</button>
                  <button className={buttonStyle}>Battery</button>
                  <button className={buttonStyle}>Camera</button>
                  <button className={buttonStyle}>Gimmick</button>
              </div>
              <div className="border-2 border-gray-200 rounded mt-4 p-4">

              </div>
          </div>
      </div>
  );
}
