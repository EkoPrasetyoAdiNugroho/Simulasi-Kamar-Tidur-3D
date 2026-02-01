import { useTexture } from '@react-three/drei'

interface BedProps {
    position: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
}

export default function Bed({ position, rotation = [0, 0, 0], scale = 1 }: BedProps) {
    // Load textures
    const fabricTexture = useTexture('/bed_fabric_texture.jpg')
    const woodTexture = useTexture('/wood_furniture_texture.jpg')
    const pillowTexture = useTexture('/pillow_texture.jpg')

    return (
        <group
            position={position} // TRANSLASI Kasur
            rotation={rotation} // ROTASI Kasur
            scale={scale} // SKALA Kasur
        >
            {/* Bed Frame - TRANSLASI lokal */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.6, 0.4, 3.4]} />
                <meshStandardMaterial map={woodTexture} color="#8B4513" roughness={0.4} />
            </mesh>

            {/* Headboard - TRANSLASI lokal */}
            <mesh position={[0, 0.8, -1.6]} castShadow>
                <boxGeometry args={[2.6, 1.2, 0.1]} />
                <meshStandardMaterial map={woodTexture} color="#654321" roughness={0.3} />
            </mesh>

            {/* Mattress - TRANSLASI lokal */}
            <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.4, 0.35, 3.2]} />
                <meshStandardMaterial map={fabricTexture} color="#3355aa" roughness={0.8} />
            </mesh>

            {/* Blanket fold - TRANSLASI lokal */}
            <mesh position={[0, 0.78, 0.8]} castShadow>
                <boxGeometry args={[2.3, 0.12, 1.5]} />
                <meshStandardMaterial map={fabricTexture} color="#2244aa" roughness={0.9} />
            </mesh>

            {/* Pillows - TRANSLASI lokal */}
            <mesh position={[-0.6, 0.85, -1.2]} castShadow>
                <boxGeometry args={[0.7, 0.2, 0.45]} />
                <meshStandardMaterial map={pillowTexture} color="#ffffff" roughness={0.95} />
            </mesh>
            <mesh position={[0.6, 0.85, -1.2]} castShadow>
                <boxGeometry args={[0.7, 0.2, 0.45]} />
                <meshStandardMaterial map={pillowTexture} color="#ffffff" roughness={0.95} />
            </mesh>

            {/* Decorative pillow - TRANSLASI & ROTASI lokal */}
            <mesh
                position={[0, 0.9, -0.8]}
                rotation={[0.2, 0, 0]} // ROTASI sedikit miring
                castShadow
            >
                <boxGeometry args={[0.5, 0.15, 0.4]} />
                <meshStandardMaterial color="#ff6b6b" roughness={0.9} />
            </mesh>
        </group>
    )
}
