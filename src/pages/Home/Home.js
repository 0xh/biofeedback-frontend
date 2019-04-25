import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';

export default class Home extends React.Component {
  responseGoogle = async (res) => {
    const accessToken = res.accessToken || res.Zi.access_token;
    const { userLogin } = this.props;
    await userLogin(accessToken);
  };

  render() {
    const { user } = this.props;
    return (
      <>
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
        {
          user.user && <h3>Hello, {user.user.name}</h3>
        }
      </>
    );
  }
}

Home.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.shape({

  }).isRequired,
};
