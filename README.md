# 🏠 3D Bedroom Simulation

An interactive 3D room simulation (Bedroom) built using **React Three Fiber** and **TypeScript**.

![3D Room Preview](preview.png)

## 🌐 Live Demo

🎮 **Play LUDO GAME:**
👉 https://simulasi-kamar-tidur-3d.vercel.app/

## ✨ Features

* 🎮 **360° Camera Controls** — Rotate, zoom, and explore the room from any angle
* 🌙 **Day/Night Mode** — Toggle between different lighting environments
* 📸 **Screenshot** — Save the current 3D view as a PNG image
* 🎛️ **Control Panel (Leva)** — Adjust lighting intensity in real time
* 💡 **Interactive Desk Lamp** — Turns on automatically when Night Mode is active
* 🖼️ **Realistic Textures** — HD textures for the wooden floor, walls, and furniture

## 🛠️ Tech Stack

* **React 18** + **TypeScript**
* **Vite** — Build tool and development server
* **Three.js** — 3D rendering engine
* **React Three Fiber** — React renderer for Three.js
* **@react-three/drei** — Helper components for React Three Fiber
* **Leva** — GUI control panel for real-time adjustments

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/username/3d-room-react.git
cd 3d-room-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and navigate to:

`http://localhost:3000`

## 🎯 Usage

| Action            | How to Use                                  |
| ----------------- | ------------------------------------------- |
| Rotate the camera | Click and drag the mouse                    |
| Zoom              | Scroll the mouse wheel                      |
| Day/Night Mode    | Click the "Day/Night Mode" button           |
| Screenshot        | Click the "Screenshot" button               |
| Adjust lighting   | Open the Leva panel in the top-right corner |

## 📁 Project Structure

```text
3d-room-react/
├── public/
│   ├── floor_texture.jpg
│   ├── wall_texture.jpg
│   ├── wood_furniture_texture.jpg
│   ├── bed_fabric_texture.jpg
│   ├── pillow_texture.jpg
│   ├── metal_texture.jpg
│   ├── books_texture.jpg
│   └── poster_image.jpg
├── src/
│   ├── components/
│   │   ├── Scene.tsx          # Main 3D scene
│   │   ├── LoadingScreen.tsx
│   │   └── furniture/
│   │       ├── Bed.tsx
│   │       ├── Desk.tsx
│   │       ├── Bookshelf.tsx
│   │       ├── TableLamp.tsx
│   │       └── Poster.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 3D Transformations

The code uses special comments to document 3D transformations:

* `// TRANSLATION` — Changes the position of an object
* `// ROTATION` — Changes the orientation of an object
* `// SCALE` — Changes the size of an object

## 📝 Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the project for production
npm run preview  # Preview the production build
```

## 👤 Author

**EKO PRASETYO ADI NUGROHO**

* **Student ID:** 105841114223
* **Course:** Computer Graphics

## 📄 License

MIT License — Free to use for academic purposes.
