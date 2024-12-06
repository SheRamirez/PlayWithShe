import React, { useState, useEffect } from "react";

export function FindTheOddColorGame() {
  const [gridSize, setGridSize] = useState(4); // Tamaño de la cuadrícula (4x4 por defecto)
  const [colors, setColors] = useState<string[]>([]);
  const [oddColorIndex, setOddColorIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Tiempo límite de 30 segundos

  const generateColors = () => {
    const baseColor = randomColor();
    const oddColor = slightlyDifferentColor(baseColor);
    const newColors = Array(gridSize * gridSize).fill(baseColor);
    const randomIndex = Math.floor(Math.random() * newColors.length);
    newColors[randomIndex] = oddColor;

    setColors(newColors);
    setOddColorIndex(randomIndex);
  };

  const randomColor = () => {
    const randomValue = () => Math.floor(Math.random() * 256);
    return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
  };

  const slightlyDifferentColor = (baseColor: string) => {
    const [r, g, b] = baseColor
      .match(/\d+/g)!
      .map(Number)
      .map((value) => Math.min(255, value + (Math.random() > 0.5 ? 20 : -20)));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleColorClick = (index: number) => {
    if (index === oddColorIndex) {
      setScore(score + 1);
      generateColors();
    } else {
      setScore(Math.max(0, score - 1));
    }
  };

  useEffect(() => {
    generateColors();
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      alert(`¡Se acabó el tiempo! Tu puntaje final es: ${score}`);
      setGridSize(4); // Reinicia el tamaño
      setScore(0);
      setTimeLeft(30);
      generateColors();
    }
  }, [timeLeft]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Busca el color diferente</h1>
      <p>Tiempo restante: {timeLeft}s</p>
      <p>Puntaje: {score}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => handleColorClick(index)}
            style={{
              width: "100%",
              paddingBottom: "100%",
              backgroundColor: color,
              border: "1px solid #000",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
