import { connect } from 'react-redux';
import userActions from '../../store/user/actions';
import Home from './Home';

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  ...userActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
