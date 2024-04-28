import { Html, useProgress } from "@react-three/drei"
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: "#000000",
          fontWeight: 800,
          marginTop: 40,
          zIndex: 50
        }}
      >{progress.toFixed(2)} |%</p>
    </Html>
  )
}

export default Loader