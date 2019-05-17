import fetchService from '../fetchService';

const fetchInstitutions = async () => {
  try {
    const res = await fetchService('/institution');
    const { status } = res;
    const response = await status === 204 ? res.text() : res.json();

    const ok = status >= 200 && status < 299;
    if (!ok) return Error(response.message);

    return response;
  } catch (error) {
    return Error(error);
  }
};

export default fetchInstitutions;
