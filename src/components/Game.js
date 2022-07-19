import React, { useState, useEffect } from 'react';
import Square from './Square';
import { BOARD, BOARD_LENGTH, MOVES, SPEED } from './../constants';

const checkPostion = (position) => {
  switch (true) {
    case position >= BOARD_LENGTH:
      return 0;
    case position < 0:
      return BOARD_LENGTH - 1;
    default:
      return position;
  }
};

const Game = ({ playerName }) => {
  const [snake, setSnake] = useState([[3, 2]]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [food, setFood] = useState([1, 1]);
  const [direction, setDirection] = useState(null);
  const [head, setHead] = useState(snake[snake.length - 1]);
  const [endScreen, setEndScreen] = useState(false);

  useEffect(() => {
    setHead(snake[snake.length - 1]);
    const interval = gameLoop();

    return () => clearInterval(interval);
  }, [snake, gameOver]);

  const startGame = () => {
    direction === null ? setDirection([0, -1]) : setDirection(direction);
    setSpeed(SPEED);
    setGameOver(false);
  };
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    setEndScreen(true);
  };

  const pauseGame = () => {
    setDirection(direction);
    setSpeed(null);
    setGameOver(true);
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_LENGTH),
        Math.floor(Math.random() * BOARD_LENGTH),
      ];
    } while (
      snake.some((elem) => elem[0] === newFood[0] && elem[1] === newFood[1])
    );

    setFood(newFood);
  };

  const moveSnake = ({ keyCode }) => {
    return keyCode >= 37 && keyCode <= 40 && setDirection(MOVES[keyCode]);
  };

  const collision = (piece, snk = snake) => {
    for (const part of snk) {
      if (piece[0] === part[0] && piece[1] === part[1]) return true;
    }
    return false;
  };

  const gameLoop = () => {
    const timerId = setTimeout(() => {
      if (!gameOver) {
        const newSnake = [...snake];

        const head = [
          checkPostion(newSnake[newSnake.length - 1][0] + direction[0]),
          checkPostion(newSnake[newSnake.length - 1][1] + direction[1]),
        ];

        newSnake.push(head);

        let spliceIntex = 1;
        if (head[0] === food[0] && head[1] === food[1]) {
          spliceIntex = 0;
          generateFood();
        }
        if (collision(head)) endGame();

        setSnake(newSnake.slice(spliceIntex));
      }
    }, speed);
    return timerId;
  };

  return (
    <div className="game" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      <h1>
        {playerName} Score {snake.length}
      </h1>

      {/* this is a checking if variable true and game is over it shows game over screen else we are playing*/}
      {endScreen ? (
        <div className="endscreen"> Game Over</div>
      ) : (
        <div className="box">
          {BOARD.map((row, indexRow) => (
            <div className="flex" key={indexRow}>
              {row.map((col, indexCol) => {
                let headClass =
                  head[0] === indexRow && head[1] === indexCol && 'head';

                let type =
                  snake.some((elem) => {
                    return elem[0] === indexRow && elem[1] === indexCol;
                  }) && 'snake';
                if (type !== 'snake') {
                  type = food[0] === indexRow && food[1] === indexCol && 'food';
                }
                return (
                  <Square key={indexCol} type={type} headClass={headClass} />
                );
              })}
            </div>
          ))}
        </div>
      )}
      <div className="button_block">
        <button className="button" onClick={() => startGame()}>
          Start
        </button>
        <button className="button" onClick={() => pauseGame()}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default Game;
