import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginView from './LoginView';
import Loading from '../../core/components/Loading';

export default class Login extends Component {
  componentDidMount() {
    const { isLoggedIn, history } = this.props;
    if (isLoggedIn) {
      history.push('/');
    }
  }

  onLogin = async (res) => {
    const accessToken = res.accessToken || res.Zi.access_token;
    const { userLogin } = this.props;
    await userLogin(accessToken);
    const { loginError, history } = this.props;
    if (!loginError) {
      history.push('/');
    }
  };

  onLoginFailure = () => {}

  render() {
    const { isFetching } = this.props;
    return (
      <Loading isFetching={isFetching}>
        <LoginView
          {...this.props}
          onLogin={this.onLogin}
          onLoginFailure={this.onLoginFailure}
        />
      </Loading>
    );
  }
}

Login.defaultProps = {
  loginError: undefined,
};

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loginError: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
};
