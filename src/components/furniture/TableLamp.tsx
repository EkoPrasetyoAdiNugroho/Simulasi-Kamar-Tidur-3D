import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface TableLampProps {
    position: [number, number, number]
    isOn?: boolean
}

export default function TableLamp({ position, isOn = false }: TableLampProps) {
    const metalTexture = useTexture('/metal_texture.jpg')
    const bulbRef = useRef<THREE.Mesh>(null)

    // Subtle pulsing when on
    useFrame(({ clock }) => {
        if (bulbRef.current && isOn) {
            const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.1
            bulbRef.current.scale.setScalar(pulse)
        }
    })

    return (
        <group position={position}> {/* TRANSLASI Lampu */}
            {/* Base - TRANSLASI lokal */}
            <mesh position={[0, 0.025, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.15, 0.05, 32]} />
                <meshStandardMaterial map={metalTexture} metalness={0.8} roughness={0.2} color="#888888" />
            </mesh>

            {/* Stem - TRANSLASI lokal */}
            <mesh position={[0, 0.25, 0]} castShadow>
                <cylinderGeometry args={[0.02, 0.025, 0.45, 16]} />
                <meshStandardMaterial map={metalTexture} metalness={0.9} roughness={0.15} color="#aaaaaa" />
            </mesh>

            {/* Lampshade - TRANSLASI lokal */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <coneGeometry args={[0.18, 0.22, 32, 1, true]} />
                <meshStandardMaterial
                    color={isOn ? "#444444" : "#222222"}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Bulb (emissive when on) - TRANSLASI lokal */}
            <mesh ref={bulbRef} position={[0, 0.45, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                    color={isOn ? "#ffffaa" : "#333333"}
                    emissive={isOn ? "#ffaa00" : "#000000"}
                    emissiveIntensity={isOn ? 2 : 0}
                />
            </mesh>

            {/* Light source when on */}
            {isOn && (
                <>
                    <pointLight
                        position={[0, 0.45, 0]}
                        color="#ffaa00"
                        intensity={3}
                        distance={5}
                        decay={2}
                        castShadow
                    />
                    <spotLight
                        position={[0, 0.55, 0]}
                        angle={Math.PI / 3}
                        penumbra={0.5}
                        color="#ff9900"
                        intensity={8}
                        distance={4}
                        castShadow
                        target-position={[0, 0, 0]}
                    />
                </>
            )}
        </group>
    )
}
