import "./styles.css";
import Plx from "react-plx";

export default function Plxx() {
  return (
    <div>
      
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 800,
            properties: [
              {
                startValue: 1,
                endValue: 1.18,
                property: "scale"
              }
            ]
          }
        ]}
        style={{  
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex:-1,
        }}
      >
        
        <img style={{ width: "100%" }} src="zzz.jpg" alt="background" / >
      </Plx>
      
      <div
        style={{
          position: "fixed",
          lefft: 0,
          top: 0,
          zIndex: 200,
          paddingTop: "56%",
          height: "400vh",
          width: "100%"
        }}
      >
        <div
          style={{
            background: "#000",
            height: "100%"
          }}
        ></div>
      </div>
    </div>
  );
}