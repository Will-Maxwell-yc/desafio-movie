import api from './api';
import { LoginRequest, LoginResponse } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setAuth: (loginResponse: LoginResponse) => {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('user', JSON.stringify({
      id: loginResponse.id,
      nome: loginResponse.nome,
      tipoUsuario: loginResponse.tipoUsuario
    }));
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};

