import fetchService from '../fetchService';

const userLogin = async (body) => {
  try {
    const response = await fetchService('/auth/google', {
      method: 'post', body, withAuth: false,
    });
    const res = await response.json();
    const ok = response.status >= 200 && response.status < 299;

    if (!ok) return Error(res.message);
    return res.jwt;
  } catch (error) {
    return Error(error);
  }
};

export default userLogin;
