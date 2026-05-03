
const mockUsers: any[] = [];
let currentToken: string | null = localStorage.getItem('mockToken');
let currentUser: any = null;

export const mockApi = {
  async signUp(data: any) {
    await new Promise(r => setTimeout(r, 600));

    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) throw new Error('Пользователь уже существует');

    const user = {
      id: 'user_' + Date.now(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      clientId: data.clientId,
      approved: true,
    };

    mockUsers.push(user);
    const token = 'mock-jwt-' + Date.now();

    localStorage.setItem('mockToken', token);
    currentToken = token;
    currentUser = user;

    return { data: { token, user } };
  },

  async signIn(data: any) {
    await new Promise(r => setTimeout(r, 500));

    if (data.email === 'test@scan.ru' && data.password === '123456') {
      const token = 'mock-jwt-123456';
      localStorage.setItem('mockToken', token);
      currentToken = token;
      currentUser = { email: data.email, firstName: 'Тестовый', lastName: 'Пользователь' };
      return { data: { token, user: currentUser } };
    }

    throw new Error('Неверный email или пароль');
  },

  getToken() {
    return localStorage.getItem('mockToken');
  },

  logout() {
    localStorage.removeItem('mockToken');
    currentToken = null;
    currentUser = null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('mockToken');
  }
};