import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import phoneModel from "../assets/phone.glb?url";
import {Suspense, useState} from "react";
import items from "../data/items.js"

export default function Configure() {

    function Model() {
        const { scene } = useGLTF(phoneModel);
        return <primitive object={scene} scale={1} />;
    }

    const buttonStyle = "m-2 p-2 rounded-xl transition-colors hover:bg-gray-100 inline-flex items-center gap-2";

    const [selectedCategory, setSelectedCategory] = useState("base")
    const itemsShown = items[selectedCategory] ?? [];

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
                  <button className={buttonStyle} onClick={() => setSelectedCategory("base")}>Base Phone</button>
                  <button className={buttonStyle} onClick={() => setSelectedCategory("battery")}>Battery</button>
                  <button className={buttonStyle} onClick={() =>setSelectedCategory("camera")}>Camera</button>
                  <button className={buttonStyle} onClick={() => setSelectedCategory("gimmick")}>Gimmick</button>
              </div>
              <div className="border-2 border-gray-200 rounded mt-4 p-4">
                  {itemsShown.map((item, index) => (
                      <div key={index} className="m-4 p-4 border-2 border-gray-200 rounded">
                          <h3 className="font-bold">{item.title}</h3>
                          <ul className="flex flex-row gap-2">
                              {item.specs.map((spec, specIndex) => (
                                  <li key={specIndex} className="bg-gray-200 rounded p-1 text-xs">{spec}</li>
                              ))}
                          </ul>
                          <p>CHF {item.price}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
}
