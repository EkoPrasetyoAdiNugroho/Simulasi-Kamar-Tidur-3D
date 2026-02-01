import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import Bed from './furniture/Bed'
import Desk from './furniture/Desk'
import Bookshelf from './furniture/Bookshelf'
import TableLamp from './furniture/TableLamp'
import Poster from './furniture/Poster'

interface SceneProps {
    isNight: boolean
    ambientIntensity: number
    lightIntensity: number
}

export default function Scene({ isNight, ambientIntensity, lightIntensity }: SceneProps) {
    const lightRef = useRef<THREE.DirectionalLight>(null)

    // Load textures with fallback
    const floorTexture = useTexture('/floor_texture.jpg', (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(4, 4)
    })

    const wallTexture = useTexture('/wall_texture.jpg', (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(3, 2)
    })

    // Animate light position slightly
    useFrame(({ clock }) => {
        if (lightRef.current && !isNight) {
            lightRef.current.position.x = 5 + Math.sin(clock.elapsedTime * 0.2) * 0.5
        }
    })

    const skyColor = isNight ? '#0a0a1a' : '#87CEEB'
    const adjustedAmbient = isNight ? ambientIntensity * 0.2 : ambientIntensity
    const adjustedLight = isNight ? lightIntensity * 0.1 : lightIntensity

    return (
        <>
            {/* Background & Environment */}
            <color attach="background" args={[skyColor]} />
            <fog attach="fog" args={[skyColor, 10, 50]} />
            {!isNight && <Environment preset="apartment" />}

            {/* Lighting */}
            <ambientLight intensity={adjustedAmbient} />
            <directionalLight
                ref={lightRef}
                position={[5, 10, 5]}
                intensity={adjustedLight}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />

            {/* Floor - TRANSLASI & ROTASI */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]} // ROTASI -90 derajat di sumbu X
                position={[0, 0, 0]} // TRANSLASI di lantai dasar
                receiveShadow
            >
                <planeGeometry args={[14, 14]} />
                <meshStandardMaterial
                    map={floorTexture}
                    roughness={0.6}
                    metalness={0.1}
                    color="#cccccc"
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Walls - TRANSLASI & ROTASI */}
            {/* Back Wall */}
            <mesh position={[0, 3, -7]} receiveShadow> {/* TRANSLASI dinding belakang */}
                <planeGeometry args={[14, 6]} />
                <meshStandardMaterial map={wallTexture} roughness={0.9} side={THREE.DoubleSide} />
            </mesh>

            {/* Left Wall */}
            <mesh
                position={[-7, 3, 0]} // TRANSLASI dinding kiri
                rotation={[0, Math.PI / 2, 0]} // ROTASI 90 derajat
                receiveShadow
            >
                <planeGeometry args={[14, 6]} />
                <meshStandardMaterial map={wallTexture} roughness={0.9} side={THREE.DoubleSide} />
            </mesh>

            {/* Right Wall (partial for viewing) */}
            <mesh
                position={[7, 3, -3]} // TRANSLASI dinding kanan (partial)
                rotation={[0, -Math.PI / 2, 0]} // ROTASI -90 derajat
                receiveShadow
            >
                <planeGeometry args={[8, 6]} />
                <meshStandardMaterial map={wallTexture} roughness={0.9} side={THREE.DoubleSide} />
            </mesh>

            {/* Furniture - TRANSLASI, ROTASI, SKALA */}
            <Bed position={[-3.5, 0, -4]} rotation={[0, 0, 0]} scale={1} />
            <Desk position={[3.5, 0, -4]} rotation={[0, -Math.PI / 6, 0]} scale={1}>
                <TableLamp position={[0.6, 1.3, 0]} isOn={isNight} />
            </Desk>
            <Bookshelf position={[-6, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={1} />
            <Poster position={[0, 3.5, -6.95]} />

            {/* Contact Shadows for realism */}
            <ContactShadows
                position={[0, 0.01, 0]}
                opacity={0.5}
                scale={20}
                blur={2}
                far={10}
            />

            {/* Camera Controls */}
            <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={15}
            />
        </>
    )
}
