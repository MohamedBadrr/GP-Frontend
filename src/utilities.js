// Points for fingers
const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };
  
  // Infinity Gauntlet Style
  const style = {
    0: { color: "yellow", size: 10 },
    1: { color: "gold", size: 3 },
    2: { color: "green", size: 6 },
    3: { color: "gold", size: 3 },
    4: { color: "gold", size: 3 },
    5: { color: "purple", size: 6 },
    6: { color: "gold", size: 3 },
    7: { color: "gold", size: 3 },
    8: { color: "gold", size: 3 },
    9: { color: "blue", size: 6 },
    10: { color: "gold", size: 3 },
    11: { color: "gold", size: 3 },
    12: { color: "gold", size: 3 },
    13: { color: "red", size: 6 },
    14: { color: "gold", size: 3 },
    15: { color: "gold", size: 3 },
    16: { color: "gold", size: 3 },
    17: { color: "orange", size: 6 },
    18: { color: "gold", size: 3 },
    19: { color: "gold", size: 3 },
    20: { color: "gold", size: 3 },
  };
  
  // Drawing function
  export const drawHand = (predictions, ctx) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const landmarks = prediction.landmarks;
  
        for (let j = 0; j < landmarks.length; j++) {
          const x = landmarks[j][0];
          const y = landmarks[j][1];
  
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 3 * Math.PI);
  
          ctx.fillStyle = "aqua";
          ctx.fill();
        }
      });
    }
  };
  