import React from 'react';

const PlayersList = ({ players }) => {
  return (
    <div className="players">
      {players.map((player) => {
        return (
          <p className="players__row" key={player.createdAt}>
            {player.name}
          </p>
        );
      })}
    </div>
  );
};

export default PlayersList;
