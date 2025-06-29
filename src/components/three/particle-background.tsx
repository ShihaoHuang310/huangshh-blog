"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

interface ParticleFieldProps {
  count?: number
}

function ParticleField({ count = 5000 }: ParticleFieldProps) {
  const ref = React.useRef<THREE.Points>(null!)
  const [sphere] = React.useState(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create a sphere distribution
      const radius = Math.random() * 25 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Color gradient from blue to purple
      const colorIntensity = Math.random()
      colors[i * 3] = 0.3 + colorIntensity * 0.4 // R
      colors[i * 3 + 1] = 0.4 + colorIntensity * 0.3 // G
      colors[i * 3 + 2] = 0.8 + colorIntensity * 0.2 // B
    }
    
    return { positions, colors }
  })

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
      
      // Animate particle positions
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere.positions} colors={sphere.colors}>
        <PointMaterial
          transparent
          color="#4facfe"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

interface CodeMatrixProps {
  count?: number
}

function CodeMatrix({ count = 200 }: CodeMatrixProps) {
  const ref = React.useRef<THREE.Points>(null!)
  const [matrix] = React.useState(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Create columns of falling code
      const column = Math.floor(i / 20)
      const row = i % 20

      positions[i * 3] = (column - 5) * 4 // X - spread across columns
      positions[i * 3 + 1] = row * 2 + Math.random() * 40 // Y - vertical position
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // Z - depth

      // Matrix green with variations
      const intensity = Math.random()
      colors[i * 3] = 0.1 + intensity * 0.2 // R
      colors[i * 3 + 1] = 0.6 + intensity * 0.4 // G
      colors[i * 3 + 2] = 0.1 + intensity * 0.3 // B

      sizes[i] = Math.random() * 3 + 1
    }

    return { positions, colors, sizes }
  })

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      const colors = ref.current.geometry.attributes.color.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        // Move particles down
        positions[i + 1] -= 0.2 + Math.random() * 0.1

        // Reset position when off screen
        if (positions[i + 1] < -30) {
          positions[i + 1] = 30
          // Randomize color intensity for new "character"
          const intensity = Math.random()
          colors[i] = 0.1 + intensity * 0.2
          colors[i + 1] = 0.6 + intensity * 0.4
          colors[i + 2] = 0.1 + intensity * 0.3
        }
      }

      ref.current.geometry.attributes.position.needsUpdate = true
      ref.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={matrix.positions} colors={matrix.colors}>
      <PointMaterial
        transparent
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Interactive floating code blocks
function FloatingCode() {
  const meshRef = React.useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 2
    }
  })

  return (
    <group ref={meshRef}>
      {/* Create floating geometric shapes representing code blocks */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <boxGeometry args={[1, 0.1, 2]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.7, 0.5)}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

interface ParticleBackgroundProps {
  variant?: "particles" | "matrix" | "both" | "code"
  className?: string
  interactive?: boolean
}

export function ParticleBackground({
  variant = "particles",
  className = "",
  interactive = false
}: ParticleBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        {(variant === "particles" || variant === "both") && (
          <ParticleField count={interactive ? 5000 : 3000} />
        )}

        {(variant === "matrix" || variant === "both") && (
          <CodeMatrix count={interactive ? 300 : 200} />
        )}

        {(variant === "code" || variant === "both") && (
          <FloatingCode />
        )}
      </Canvas>
    </div>
  )
}
