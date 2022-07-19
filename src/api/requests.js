const HOST = 'https://62d174e1d4eb6c69e7ddd330.mockapi.io';

const request = async (url, method = 'GET', body = null) => {
  const data = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  return data.json();
};

export const gettingPlayers = async () => {
  return await request(`${HOST}/players`);
};

export const createPlayer = async (body) => {
  return await request(`${HOST}/players`, 'POST', body);
};
