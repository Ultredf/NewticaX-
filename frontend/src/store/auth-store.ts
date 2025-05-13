import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import api from '@/lib/axios';
import { User, RegisterInput, LoginInput } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  register: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,

        register: async (data: RegisterInput) => {
          try {
            set({ isLoading: true, error: null });
            const response = await api.post('/auth/register', data);
            set({
              user: response.data.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Terjadi kesalahan saat registrasi',
              isLoading: false,
            });
            throw error;
          }
        },

        login: async (data: LoginInput) => {
          try {
            set({ isLoading: true, error: null });
            const response = await api.post('/auth/login', data);
            set({
              user: response.data.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Terjadi kesalahan saat login',
              isLoading: false,
            });
            throw error;
          }
        },

        logout: async () => {
          try {
            set({ isLoading: true });
            await api.post('/auth/logout');
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Terjadi kesalahan saat logout',
              isLoading: false,
            });
          }
        },

        getMe: async () => {
          try {
            set({ isLoading: true });
            const response = await api.get('/auth/me');
            set({
              user: response.data.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: any) {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'auth-storage',
        // Exclude tidak perlu menyimpan state loading dan error di localStorage
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
