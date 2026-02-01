import { ReactNode } from 'react'
import { useTexture } from '@react-three/drei'

interface DeskProps {
    position: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
    children?: ReactNode
}

export default function Desk({ position, rotation = [0, 0, 0], scale = 1, children }: DeskProps) {
    const woodTexture = useTexture('/wood_furniture_texture.jpg')
    const metalTexture = useTexture('/metal_texture.jpg')

    const legPositions: [number, number, number][] = [
        [-0.9, 0.6, -0.4],
        [0.9, 0.6, -0.4],
        [-0.9, 0.6, 0.4],
        [0.9, 0.6, 0.4]
    ]

    return (
        <group
            position={position} // TRANSLASI Meja
            rotation={rotation} // ROTASI Meja
            scale={scale} // SKALA Meja
        >
            {/* Desktop surface - TRANSLASI lokal */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.2, 0.08, 1]} />
                <meshStandardMaterial map={woodTexture} color="#A0522D" roughness={0.35} />
            </mesh>

            {/* Drawer unit - TRANSLASI lokal */}
            <mesh position={[-0.7, 0.7, 0]} castShadow>
                <boxGeometry args={[0.6, 0.9, 0.8]} />
                <meshStandardMaterial map={woodTexture} color="#8B4513" roughness={0.4} />
            </mesh>

            {/* Drawer handles - TRANSLASI lokal */}
            {[0.85, 0.55, 0.25].map((y, i) => (
                <mesh key={i} position={[-0.38, y, 0]} castShadow>
                    <boxGeometry args={[0.02, 0.06, 0.15]} />
                    <meshStandardMaterial map={metalTexture} metalness={0.8} roughness={0.2} />
                </mesh>
            ))}

            {/* Metal legs - TRANSLASI lokal */}
            {legPositions.map((pos, i) => (
                <mesh key={i} position={pos} castShadow>
                    <cylinderGeometry args={[0.04, 0.04, 1.2]} />
                    <meshStandardMaterial map={metalTexture} metalness={0.7} roughness={0.3} />
                </mesh>
            ))}

            {/* Chair */}
            <Chair position={[0, 0, 1.2]} rotation={[0, Math.PI, 0]} />

            {/* Children (lamp, etc) */}
            {children}
        </group>
    )
}

// Chair sub-component
function Chair({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
    const woodTexture = useTexture('/wood_furniture_texture.jpg')
    const metalTexture = useTexture('/metal_texture.jpg')

    return (
        <group
            position={position} // TRANSLASI Kursi
            rotation={rotation} // ROTASI Kursi
        >
            {/* Seat - TRANSLASI lokal */}
            <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.08, 0.55]} />
                <meshStandardMaterial map={woodTexture} color="#D2691E" roughness={0.5} />
            </mesh>

            {/* Backrest - TRANSLASI lokal */}
            <mesh position={[0, 0.95, -0.25]} castShadow>
                <boxGeometry args={[0.5, 0.55, 0.08]} />
                <meshStandardMaterial map={woodTexture} color="#D2691E" roughness={0.5} />
            </mesh>

            {/* Chair legs - TRANSLASI lokal */}
            {[
                [-0.22, 0.27, -0.22],
                [0.22, 0.27, -0.22],
                [-0.22, 0.27, 0.22],
                [0.22, 0.27, 0.22]
            ].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow>
                    <cylinderGeometry args={[0.025, 0.03, 0.55]} />
                    <meshStandardMaterial map={metalTexture} metalness={0.6} roughness={0.3} />
                </mesh>
            ))}
        </group>
    )
}
