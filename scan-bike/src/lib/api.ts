import { mockApi } from './mockApi';

const api = {
  post: async (url: string, data: any) => {
    if (url.includes('sign_up')) return await mockApi.signUp(data);
    if (url.includes('sign_in')) return await mockApi.signIn(data);
    throw new Error('Неизвестный эндпоинт');
  }
};

export { api };
export { mockApi };