import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import Scene from './components/Scene'
import LoadingScreen from './components/LoadingScreen'

function App() {
    const [isNight, setIsNight] = useState(false)
    const [showNotification, setShowNotification] = useState(false)

    // Leva controls for real-time adjustments
    const { ambientIntensity, lightIntensity, shadowsEnabled } = useControls('Lighting', {
        ambientIntensity: { value: 0.4, min: 0, max: 1, step: 0.1 },
        lightIntensity: { value: 1.5, min: 0, max: 3, step: 0.1 },
        shadowsEnabled: { value: true }
    })

    const handleScreenshot = () => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
            const link = document.createElement('a')
            link.download = `kamar-3d-${Date.now()}.png`
            link.href = canvas.toDataURL('image/png')
            link.click()
            setShowNotification(true)
            setTimeout(() => setShowNotification(false), 2000)
        }
    }

    return (
        <div className="canvas-container">
            {/* Leva Control Panel */}
            <Leva collapsed />

            {/* Info Panel */}
            <div className="info-panel">
                <h1>🏠 Kamar Tidur 3D</h1>
                <p>
                    Klik & drag untuk putar kamera<br />
                    Scroll untuk zoom<br />
                    Gunakan panel kanan untuk adjust
                </p>
            </div>

            {/* Control Buttons */}
            <div className="controls-panel">
                <button
                    className={`control-btn ${isNight ? 'active' : ''}`}
                    onClick={() => setIsNight(!isNight)}
                >
                    {isNight ? '🌙 Mode Malam' : '☀️ Mode Siang'}
                </button>
                <button className="control-btn" onClick={handleScreenshot}>
                    📸 Screenshot
                </button>
            </div>

            {/* Screenshot Notification */}
            {showNotification && (
                <div className="screenshot-notification">
                    ✅ Screenshot tersimpan!
                </div>
            )}

            {/* 3D Canvas */}
            <Canvas
                shadows={shadowsEnabled}
                camera={{ position: [8, 6, 8], fov: 60 }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
            >
                <Suspense fallback={<LoadingScreen />}>
                    <Scene
                        isNight={isNight}
                        ambientIntensity={ambientIntensity}
                        lightIntensity={lightIntensity}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default App
