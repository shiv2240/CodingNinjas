import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei'
import { Suspense } from 'react'

// Simple 3D model of a document/paper
function DocumentModel() {
  return (
    <group>
      {/* Base paper */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.05, 4]} />
        <meshStandardMaterial color="#f5f5f7" />
      </mesh>
      
      {/* Text lines */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, 0.03, 0.8 - i * 0.4]} castShadow>
          <boxGeometry args={[2, 0.02, 0.1]} />
          <meshStandardMaterial color="#0071e3" opacity={0.7} transparent />
        </mesh>
      ))}
      
      {/* Logo */}
      <mesh position={[0, 0.03, -1.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
        <meshStandardMaterial color="#0071e3" />
      </mesh>
      
      {/* Stamp */}
      <mesh position={[1, 0.03, 1.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
        <meshStandardMaterial color="#ff0000" opacity={0.6} transparent />
      </mesh>
    </group>
  )
}

const ModelViewer = () => {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Suspense fallback={null}>
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <DocumentModel />
        </Float>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

export default ModelViewer