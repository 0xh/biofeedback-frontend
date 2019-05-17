import fetchService from '../fetchService';

const createInstitution = async (body) => {
  try {
    const res = await fetchService('/institution', { method: 'POST', body: JSON.stringify(body) });
    const response = await res.json();

    const ok = res.status >= 200 && res.status < 299;

    if (!ok) return Error(response.message);

    return response;
  } catch (error) {
    return Error(error);
  }
};
export default createInstitution;
