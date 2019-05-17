import fetchService from '../fetchService';

const deleteInstitution = async (id) => {
  try {
    const res = await fetchService(`/institution/${id}`, { method: 'DELETE' });
    const { status } = res;
    const response = await status === 204 ? res.text() : res.json();

    const ok = status >= 200 && status < 299;

    if (!ok) return Error(response.message);
    return response;
  } catch (error) {
    return Error(error);
  }
};

export default deleteInstitution;
