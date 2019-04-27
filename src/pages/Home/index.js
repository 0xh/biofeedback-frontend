import { connect } from 'react-redux';
import userActions from '../../store/user/actions';
import Home from './Home';
import usersActions from '../../store/users/actions';

const mapStateToProps = ({ user, users }) => ({
  user,
  users: users.data,
  usersError: users.error,
  isFetching: user.isFetching || users.isFetching,
});

const mapDispatchToProps = {
  ...userActions,
  ...usersActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
