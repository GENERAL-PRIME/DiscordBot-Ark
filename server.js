const express = require("express");
const app = express();
const port = 3000;

const questions = [
  {
    id: 1,
    title: "What is the best yoga posture for beginners?",
    content:
      "I am new to yoga and looking for recommendations on the best posture to start with.",
    timestamp: "2024-07-22T10:00:00Z",
  },
  {
    id: 2,
    title: "How often should I practice yoga?",
    content:
      "I want to incorporate yoga into my daily routine but am unsure about the frequency.",
    timestamp: "2024-07-22T11:00:00Z",
  },
  {
    id: 3,
    title: "What is the best yoga posture for beginners?",
    content:
      "I am new to yoga and looking for recommendations on the best posture to start with.",
    timestamp: "2024-07-22T10:00:00Z",
  },
  {
    id: 4,
    title: "What is the best yoga posture for beginners?",
    content:
      "I am new to yoga and looking for recommendations on the best posture to start with.",
    timestamp: "2024-07-22T10:00:00Z",
  },
  {
    id: 5,
    title: "What is the best yoga posture for beginners?",
    content:
      "I am new to yoga and looking for recommendations on the best posture to start with.",
    timestamp: "2024-07-22T10:00:00Z",
  },
  {
    id: 6,
    title: "What is the best yoga posture for beginners?",
    content:
      "I am new to yoga and looking for recommendations on the best posture to start with.",
    timestamp: "2024-07-22T10:00:00Z",
  },
  {
    id: 7,
    title: "What is the best yoga posture for beginners?",
    content:
      "I am new to yoga and looking for recommendations on the best posture to start with.",
    timestamp: "2024-07-22T10:00:00Z",
  },
  {
    id: 8,
    title: "What is the best yoga posture for beginners?",
    content:
      "I am new to yoga and looking for recommendations on the best posture to start with.",
    timestamp: "2024-07-22T10:00:00Z",
  },
];

app.get("/questions", (req, res) => {
  res.json({ questions });
});

app.listen(port, () => {
  console.log(`Forum API listening at http://localhost:${port}`);
});
