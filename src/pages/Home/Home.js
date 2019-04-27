import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import { LoadingOverlay, Loader } from 'react-overlay-loader';

export default class Home extends React.Component {
  responseGoogle = async (res) => {
    const accessToken = res.accessToken || res.Zi.access_token;
    const { userLogin } = this.props;
    await userLogin(accessToken);
  };

  logout = async () => {
    const { userLogout } = this.props;
    await userLogout();
  }

  getUsers = async () => {
    const { fetchUsers } = this.props;
    await fetchUsers();
  }

  render() {
    const {
      user, users, usersError, isFetching,
    } = this.props;
    return (
      <LoadingOverlay>
        <Loader loading={isFetching} />
        {
          user.user ? (
            <GoogleLogout
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.logout}
            />
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={console.log}
              responseType="token"
              cookiePolicy="single_host_origin"
              scope="https://www.googleapis.com/auth/plus.login"
            />
          )
        }

        {
          usersError && <div className="alert alert-danger">{usersError}</div>
        }
        {
          user.user && <h3>Hello, {user.user.name}</h3>
        }

        <button
          onClick={this.getUsers}
          type="button"
        >Fetch users
        </button>
        {

        }

        {
          users.map(u => <div key={u._id}>{u.name}</div>)
        }
      </LoadingOverlay>
    );
  }
}

Home.defaultProps = {
  usersError: undefined,
};

Home.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({

  }).isRequired,
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  usersError: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};
