import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import api from '@/lib/api';
import { User, RegisterInput, LoginInput } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  language: 'ENGLISH' | 'INDONESIAN';
  register: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
  clearError: () => void;
  setLanguage: (language: 'ENGLISH' | 'INDONESIAN') => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
        language: 'ENGLISH',

        register: async (data: RegisterInput) => {
          try {
            set({ isLoading: true, error: null });
            const response = await api.post('/auth/register', data);
            set({
              user: response.data.data,
              isAuthenticated: true,
              isLoading: false,
              language: response.data.data.language,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Registration failed',
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
              language: response.data.data.language,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Login failed',
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
              error: error.response?.data?.message || 'Logout failed',
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
              language: response.data.data.language,
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

        setLanguage: async (language: 'ENGLISH' | 'INDONESIAN') => {
          try {
            set({ isLoading: true });
            
            if (get().isAuthenticated) {
              await api.put('/auth/language', { language });
            }
            
            set({
              language,
              isLoading: false,
            });
            
            if (get().user) {
              set({
                user: {
                  ...get().user!,
                  language,
                },
              });
            }
          } catch (error: any) {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: 'auth-storage',
        // Exclude doesn't need to store state loading and error in localStorage
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          language: state.language,
        }),
      }
    )
  )
);