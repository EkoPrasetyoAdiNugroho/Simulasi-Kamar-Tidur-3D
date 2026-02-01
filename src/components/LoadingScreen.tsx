import { Html, useProgress } from '@react-three/drei'

export default function LoadingScreen() {
    const { progress } = useProgress()

    return (
        <Html center>
            <div className="loading-screen" style={{
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="loading-spinner" style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#00d9ff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <p style={{ color: 'white', marginTop: '16px', fontSize: '14px' }}>
                    Memuat 3D Scene... {progress.toFixed(0)}%
                </p>
            </div>
        </Html>
    )
}
