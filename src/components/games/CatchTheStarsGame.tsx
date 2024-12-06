import React, { useState, useEffect } from "react";

export function CatchTheStarsGame() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);
  const [catcherPosition, setCatcherPosition] = useState(200); // Posición inicial del cuadro
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(5); // Velocidad de caída de las estrellas

  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameOver) return;

    if (e.key === "ArrowLeft" && catcherPosition > 0) {
      setCatcherPosition(catcherPosition - 20);
    } else if (e.key === "ArrowRight" && catcherPosition < 380) {
      setCatcherPosition(catcherPosition + 20);
    }
  };

  const createStar = () => {
    const newStar = {
      id: Date.now(),
      x: Math.floor(Math.random() * 380), // Ancho de la pantalla
      y: 0,
    };
    setStars((prevStars) => [...prevStars, newStar]);
  };

  const updateStars = () => {
    setStars((prevStars) => {
      const newStars = prevStars
        .map((star) => ({
          ...star,
          y: star.y + speed,
        }))
        .filter((star) => star.y < 600); // Limita la altura de las estrellas

      // Verifica si alguna estrella ha sido atrapada
      newStars.forEach((star) => {
        if (
          star.y >= 580 && // Se encuentra cerca de la base de la pantalla
          star.x >= catcherPosition - 20 &&
          star.x <= catcherPosition + 20
        ) {
          setScore((prevScore) => prevScore + 1);
        }
      });

      return newStars;
    });
  };

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      createStar();
      updateStars();
    }, 1000);

    const moveInterval = setInterval(() => {
      updateStars();
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
    };
  }, [gameOver, catcherPosition, speed]);

  useEffect(() => {
    if (score >= 10) {
      setSpeed(speed + 1); // Aumenta la velocidad después de 10 puntos
    }
  }, [score]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [catcherPosition, gameOver]);

  useEffect(() => {
    if (stars.some((star) => star.y >= 600)) {
      setGameOver(true);
      alert(`¡Juego terminado! Tu puntaje final es: ${score}`);
    }
  }, [stars, score]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Atrapa las Estrellas</h1>
      <p>Puntaje: {score}</p>
      <p>{gameOver ? "¡Juego Terminado!" : "¡Atrapemos las estrellas!"}</p>
      <div
        style={{
          width: "400px",
          height: "600px",
          margin: "0 auto",
          position: "relative",
          backgroundColor: "#282c34",
          border: "2px solid #fff",
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              top: `${star.y}px`,
              left: `${star.x}px`,
              width: "20px",
              height: "20px",
              backgroundColor: "yellow",
              borderRadius: "50%",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: `${catcherPosition}px`,
            width: "60px",
            height: "20px",
            backgroundColor: "green",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}
