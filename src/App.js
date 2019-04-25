import React, { Component } from 'react';
import './App.css';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import jwt from 'jsonwebtoken';

class App extends Component {
  responseGoogle = async (res) => {
    console.log(res);
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: res.accessToken }, null, 2)],
      { type: 'application/json' },
    );
    const options = {
      method: 'POST',
      body: tokenBlob,
    };
    const response = await fetch('https://biofeedback-api.herokuapp.com/auth/google', options);
    const body = await response.json();
    console.log(jwt.decode(body.jwt, 'asdfsadfasdfasdf'));
  };

  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={console.log}
          responseType="token"
          cookiePolicy="single_host_origin"
          scope="https://www.googleapis.com/auth/plus.login"
        />

        <GoogleLogout
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={console.log}
        />
      </div>
    );
  }
}

export default App;
