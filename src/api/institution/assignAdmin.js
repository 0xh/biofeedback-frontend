import fetchService from '../fetchService';

const assignAdmin = async (institutionId, adminId) => {
  try {
    const res = await fetchService(`/institution/${institutionId}/user/${adminId}`,
      { method: 'PUT' });

    const response = await res.json();
    const ok = res.status >= 200 && res.status < 299;

    if (!ok) return Error(response.message);

    return response;
  } catch (error) {
    return Error(error);
  }
};

export default assignAdmin;
