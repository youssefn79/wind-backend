const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// DATA STORAGE (Simulated)
// ==========================
let data = {
  speed: 20,
  temp: 28,
  pressure: 101,
  status: "OFF",
  reynolds: "stable"
};

// ==========================
// CALCULATE REYNOLDS
// ==========================
function calculateReynolds(speed) {
  if (speed < 30) return "stable";
  return "unstable";
}

// ==========================
// GET DATA (Dashboard)
// ==========================
app.get("/api/data", (req, res) => {
  data.reynolds = calculateReynolds(data.speed);

  res.json({
    speed: data.speed,
    temp: data.temp,
    pressure: data.pressure,
    status: data.status,
    reynolds: data.reynolds
  });
});

// ==========================
// CONTROL (ON/OFF)
// ==========================
app.post("/api/control", (req, res) => {
  const { status } = req.body;

  if (status === "ON" || status === "OFF") {
    data.status = status;
  }

  res.json({ success: true, status: data.status });
});

// ==========================
// UPDATE SPEED (Slider)
// ==========================
app.post("/api/speed", (req, res) => {
  const { speed } = req.body;

  if (typeof speed === "number") {
    data.speed = speed;
  }

  res.json({ success: true, speed: data.speed });
});

// ==========================
// SIMULATE SENSOR CHANGES
// ==========================
setInterval(() => {
  if (data.status === "ON") {
    data.temp = (25 + Math.random() * 10).toFixed(1);
    data.pressure = (100 + Math.random() * 5).toFixed(1);
  }
}, 2000);

// ==========================
app.listen(3000, () => {
  console.log("Backend running on port 3000");
});