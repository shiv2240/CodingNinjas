import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function DocumentModel() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.05, 4]} />
        <meshStandardMaterial color="#f5f5f7" />
      </mesh>
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, 0.03, 0.8 - i * 0.4]} castShadow>
          <boxGeometry args={[2, 0.02, 0.1]} />
          <meshStandardMaterial color="#0071e3" opacity={0.7} transparent />
        </mesh>
      ))}
      <mesh position={[0, 0.03, -1.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
        <meshStandardMaterial color="#0071e3" />
      </mesh>
      <mesh position={[1, 0.03, 1.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
        <meshStandardMaterial color="#ff0000" opacity={0.6} transparent />
      </mesh>
    </group>
  );
}

const ModelViewer = () => {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <DocumentModel />
        </Float>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

const LoadingComponent = ({ setIsAssistantOpen, onComplete }) => {
  const [isZoomingOut, setIsZoomingOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsZoomingOut(true), 2000);
    setTimeout(onComplete, 3000);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: isZoomingOut ? 0.8 : 1, opacity: isZoomingOut ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-dark"
    >
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-light dark:bg-dark flex items-center justify-center">Loading 3D Model...</div>}>
            <ModelViewer />
          </Suspense>
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Revolutionizing eKatha Creation</h2>
            <p className="text-xl mb-8">
              Our advanced voice assistant technology makes property documentation effortless.
              Simply speak, and we'll handle the rest.
            </p>
            <button 
              onClick={() => setIsAssistantOpen(true)}
              className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
            >
              Try Voice Assistant
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default LoadingComponent;
