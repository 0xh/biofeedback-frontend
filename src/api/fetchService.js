import store from '../store';

const myFetchFactory = appStore => (
  endpoint,
  { dev = false, withAuth = true, ...configuration } = { },
) => {
  const { token } = appStore.getState().user;
  const headers = new Headers({
    ...(withAuth && { Authorization: `Bearer ${token}` }),
    'Content-Type': 'application/json',
  });
  const newConfiguration = {
    method: 'GET',
    ...configuration,
    headers,
  };
  const baseUrl = dev
    ? 'http://localhost:5000'
    : 'https://biofeedback-api.herokuapp.com';
  return fetch(`${baseUrl}${endpoint}`, newConfiguration);
};

const fetchService = myFetchFactory(store.store);
export default fetchService;
