import { connect } from 'react-redux';
import Institution from './Institution';
import institutionActions from '../../store/institution/actions';

const mapStateToProps = ({ institutions }) => ({
  institutions: institutions.data,
  isFetching: institutions.isFetching,
});

const mapDispatchToProps = {
  ...institutionActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Institution);
