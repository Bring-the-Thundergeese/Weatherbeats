import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Player from './components/PlayerTest';
import WebPlayback from './components/WebPlayback';

function App() {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  // useeffect will fetch the data.
  useEffect(() => {
    // right now the token just fetches from the server sessions
    // TODO: have the token refresh if it is expired (include timestamp in session)
    // TODO: for some reason, fetching the token just give an empty object. working on this later
    const fetchToken = async () => {
      try {
        const response = await fetch('/auth/token');
        const data = await response.json();
        const { accessToken } = data;
        setToken(accessToken);
      } catch (error) {
        console.error('Token fetch error: ', error);
      }
    };
    console.log('Current token ', token);

    // fetch userdata
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('User data fetch error: ', error);
      }
    };

    fetchToken();
    fetchUserData();
  }, [token]);

  // ive put examples of using this funcitonality in teh body
  return (
    <div>
      <h1>
        my token:
        {token}
        {' '}
      </h1>
      <p>{JSON.stringify(userData)}</p>
      {/* example track uri passed as a prop. will hard code it in backend later */}
      { (!token) ? <Login /> : <Player token={token} trackUri="spotify:track:6rqhFgbbKwnb9MLmUQDhG6" /> }

    </div>
  );
}

export default App;
