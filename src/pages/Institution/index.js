import { connect } from 'react-redux';
import Institution from './Institution';
import institutionActions from '../../store/institution/actions';
import usersActions from '../../store/users/actions';

const mapStateToProps = ({ institutions, users }) => ({
  institutions: institutions.data.map(({ admin, ...rest }) => ({
    ...rest,
    adminName: admin ? admin.name : '-',
    adminId: admin ? admin._id : '',
  })),
  isFetching: institutions.isFetching,
  admins: users.data.filter(user => user.role === 'MeasurementAdmin'),
});

const mapDispatchToProps = {
  ...institutionActions,
  ...usersActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Institution);
