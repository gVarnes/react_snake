import React, { useEffect, useState } from 'react';
import { gettingPlayers } from './api/requests';
import Game from './components/Game';
import Register from './components/Register';
import PlayersList from './components/PlayerLists';

import './index.scss';

const Application = () => {
  const [currentPlayer, setCurrentPlayer] = useState('');

  const [players, setPlayers] = useState();

  useEffect(() => {
    gettingPlayers().then((res) => setPlayers(res));
  }, [currentPlayer]);

  const createPlayer = (name) => {
    setCurrentPlayer(name);
  };
  return (
    <div className="wrapper">
      {currentPlayer === '' ? (
        <Register actionOnSubmitName={createPlayer} />
      ) : (
        <Game playerName={currentPlayer} />
      )}
      {players && <PlayersList players={players} />}
    </div>
  );
};

export default Application;
