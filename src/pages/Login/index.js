import { connect } from 'react-redux';
import userActions from '../../store/user/actions';

import Login from './Login';

const mapStateToProps = ({ user }) => ({
  loginError: user.error,
  isFetching: user.isFetching,
  isLoggedIn: Boolean(user.token || user.user),
});

const mapDispatchToProps = {
  ...userActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
