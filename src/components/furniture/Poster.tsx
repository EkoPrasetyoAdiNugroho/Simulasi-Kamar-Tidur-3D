import { useTexture } from '@react-three/drei'

interface PosterProps {
    position: [number, number, number]
}

export default function Poster({ position }: PosterProps) {
    const posterTexture = useTexture('/poster_image.jpg')

    return (
        <group position={position}> {/* TRANSLASI Poster */}
            {/* Frame - TRANSLASI lokal */}
            <mesh castShadow>
                <boxGeometry args={[1.7, 2.2, 0.05]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
            </mesh>

            {/* Poster image - TRANSLASI lokal */}
            <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[1.5, 2]} />
                <meshBasicMaterial map={posterTexture} />
            </mesh>

            {/* Glass reflection effect - TRANSLASI lokal */}
            <mesh position={[0, 0, 0.035]}>
                <planeGeometry args={[1.5, 2]} />
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.05}
                    roughness={0}
                    metalness={1}
                />
            </mesh>
        </group>
    )
}
