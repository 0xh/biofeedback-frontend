import { connect } from 'react-redux';
import Navbar from './Navbar';
import userActions from '../../../store/user/actions';

const mapStateToProps = ({ user }) => ({
  isLoggedIn: Boolean(user.token || user.user),
  isFetching: user.isFetching,
});

const mapDispatchToProps = {
  ...userActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
