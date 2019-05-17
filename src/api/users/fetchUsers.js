import fetchService from '../fetchService';

const fetchUsers = async () => {
  try {
    const res = await fetchService('/user');
    const response = await res.json();

    const ok = res.status >= 200 && res.status < 299;

    if (!ok) return Error(response.message);
    return response;
  } catch (error) {
    return Error(error);
  }
};
export default fetchUsers;
