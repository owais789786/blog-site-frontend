import { axiosInstance } from '../../api/axiosInstance';

export async function submitAuth({ mode, firstName, lastName, email, password }) {
    const endpoint = mode === 'signup' ? '/auth/register' : '/auth/login';
    const payload =
        mode === 'signup'
            ? { firstName, lastName, email, password }
            : { email, password };

    const { data } = await axiosInstance.post(endpoint, payload);
    return data;
}
