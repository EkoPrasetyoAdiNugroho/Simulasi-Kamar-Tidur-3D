import { useTexture } from '@react-three/drei'

interface BookshelfProps {
    position: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
}

export default function Bookshelf({ position, rotation = [0, 0, 0], scale = 1 }: BookshelfProps) {
    const woodTexture = useTexture('/wood_furniture_texture.jpg')
    const booksTexture = useTexture('/books_texture.jpg')

    const shelfHeights = [0.1, 0.7, 1.3, 1.9, 2.5]

    return (
        <group
            position={position} // TRANSLASI Rak Buku
            rotation={rotation} // ROTASI Rak Buku
            scale={scale} // SKALA Rak Buku
        >
            {/* Left side panel - TRANSLASI lokal */}
            <mesh position={[-0.9, 1.3, 0]} castShadow>
                <boxGeometry args={[0.08, 2.6, 0.45]} />
                <meshStandardMaterial map={woodTexture} color="#4a3728" roughness={0.4} />
            </mesh>

            {/* Right side panel - TRANSLASI lokal */}
            <mesh position={[0.9, 1.3, 0]} castShadow>
                <boxGeometry args={[0.08, 2.6, 0.45]} />
                <meshStandardMaterial map={woodTexture} color="#4a3728" roughness={0.4} />
            </mesh>

            {/* Back panel - TRANSLASI lokal */}
            <mesh position={[0, 1.3, -0.2]} castShadow>
                <boxGeometry args={[1.72, 2.6, 0.05]} />
                <meshStandardMaterial map={woodTexture} color="#3d2d1f" roughness={0.5} />
            </mesh>

            {/* Shelves - TRANSLASI lokal */}
            {shelfHeights.map((h, i) => (
                <mesh key={i} position={[0, h, 0]} castShadow receiveShadow>
                    <boxGeometry args={[1.72, 0.05, 0.4]} />
                    <meshStandardMaterial map={woodTexture} color="#4a3728" roughness={0.4} />
                </mesh>
            ))}

            {/* Books on shelves - TRANSLASI lokal */}
            {[0.4, 1.0, 1.6].map((h, i) => (
                <mesh key={`books-${i}`} position={[0, h, 0.02]} castShadow>
                    <boxGeometry args={[1.5, 0.4, 0.28]} />
                    <meshStandardMaterial map={booksTexture} roughness={0.7} />
                </mesh>
            ))}

            {/* Decorative items on top shelf */}
            <mesh position={[-0.4, 2.25, 0]} castShadow>
                <boxGeometry args={[0.15, 0.3, 0.12]} />
                <meshStandardMaterial color="#2266aa" roughness={0.3} metalness={0.1} />
            </mesh>
            <mesh position={[0.2, 2.2, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.1, 0.25]} />
                <meshStandardMaterial color="#22aa66" roughness={0.4} />
            </mesh>
        </group>
    )
}
