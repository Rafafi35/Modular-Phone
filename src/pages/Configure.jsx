import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import base from "../assets/base.glb?url";
import battery from "../assets/battery.glb?url";
import camera from "../assets/camera.glb?url";
import cameraA from "../assets/camera_a.glb?url";
import gimmick from "../assets/gimmick.glb?url";
import {Suspense, useState} from "react";
import items from "../data/items.js"

export default function Configure() {

    function Base() {
        const { scene } = useGLTF(base);
        return <primitive object={scene} scale={1} />;
    }

    function Battery() {
        const { scene } = useGLTF(battery);
        return <primitive object={scene} scale={1} />;
    }

    function Camera() {
        const { scene } = useGLTF(camera);
        return <primitive object={scene} scale={1} />;
    }

    function CameraA() {
        const { scene } = useGLTF(cameraA);
        return <primitive object={scene} scale={1} />;
    }

    function Gimmick() {
        const { scene } = useGLTF(gimmick);
        return <primitive object={scene} scale={1} />;
    }


    const buttonStyle = "m-2 p-2 rounded-xl transition-colors inline-flex items-center gap-2";
    const categories = ["base", "battery", "camera", "gimmick"];
    const categoryLabels = {
        base: "Base Phone",
        battery: "Battery",
        camera: "Camera",
        gimmick: "Gimmick",
    };

    const [selectedCategory, setSelectedCategory] = useState("base")
    const itemsShown = items[selectedCategory] ?? [];

    const [selectedBase, setSelectedBase] = useState("Base A")
    const [selectedBattery, setSelectedBattery] = useState("Battery Lite")
    const [selectedCamera, setSelectedCamera] = useState("Basic Camera")
    const [selectedGimmick, setSelectedGimmick] = useState("No Gimmick")

    const selectedItemByCategory = {
        base: selectedBase,
        battery: selectedBattery,
        camera: selectedCamera,
        gimmick: selectedGimmick,
    };

    function handleSelect(selectedItem) {
        if (selectedCategory === "base") {
            setSelectedBase(selectedItem);
        } else if (selectedCategory === "battery") {
            setSelectedBattery(selectedItem);
        } else if (selectedCategory === "camera") {
            setSelectedCamera(selectedItem);
        } else if (selectedCategory === "gimmick") {
            setSelectedGimmick(selectedItem);
        }
    }


  return (
      <div className="flex items-center justify-center">
          <div className="mt-14 mr-5 rounded w-1/3 h-160">
              <Canvas camera={{ position: [0, 0, 200], fov: 50 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[4, 5, 3]} intensity={1.2} />
                  <Suspense fallback={null}>
                      <Base />
                      <Battery/>
                      <CameraA/>
                      <Gimmick/>
                  </Suspense>
                  <OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false}/>
              </Canvas>
          </div>

          <div className="w-1/2 h-160 mt-14    ">
              <div className="flex flex-row gap-4 justify-center border-2 border-gray-200 rounded">
                  {categories.map((category) => (
                      <button
                          key={category}
                          className={`${buttonStyle} ${
                              selectedCategory === category
                                  ? "bg-blue-500 text-white hover:bg-blue-600"
                                  : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                      >
                          {categoryLabels[category]}
                      </button>
                  ))}
              </div>
              <div className="border-2 border-gray-200 rounded mt-4 p-4">
                  {itemsShown.map((item, index) => (
                      <div
                          key={index}
                          className={`m-4 p-4 border-2  rounded cursor-pointer ${
                              item.title === selectedItemByCategory[selectedCategory]
                                  ? "bg-blue-200 border-blue-400" 
                                  : "bg-white border-gray-200"
                          }`}
                           onClick={() => handleSelect(item.title)}>
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
