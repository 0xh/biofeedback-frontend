import { connect } from 'react-redux';
import Institution from './Institution';
import institutionActions from '../../store/institution/actions';
import usersActions from '../../store/users/actions';

const mapStateToProps = ({ institutions }) => ({
  institutions: institutions.data.map(({ admin, ...rest }) => ({
    ...rest,
    adminName: admin ? admin.name : '-',
  })),
  isFetching: institutions.isFetching,
});

const mapDispatchToProps = {
  ...institutionActions,
  ...usersActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Institution);
