import React from 'react';
import './styles.scss';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

const LoginView = ({ onLogin, onLoginFailure }) => (
  <div className="login-form">
    <h2 className="text-center">Sign in</h2>
    <div className="text-center social-btn">
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onLogin}
        onFailure={onLoginFailure}
        responseType="token"
        cookiePolicy="single_host_origin"
        scope="https://www.googleapis.com/auth/plus.login"
      />
    </div>
  </div>
);

LoginView.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLoginFailure: PropTypes.func.isRequired,
};

export default LoginView;
