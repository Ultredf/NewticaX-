// frontend/src/store/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  language: 'ENGLISH' | 'INDONESIAN';
  getMe: () => Promise<void>;
  setLanguage: (language: 'ENGLISH' | 'INDONESIAN') => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
      language: 'ENGLISH',
      
      getMe: async () => {
        try {
          set({ isLoading: true });
          // Placeholder for API call
          // Normally you'd fetch the user from API
          set({
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
        }
      },
      
      setLanguage: async (language) => {
        set({ language });
        // Placeholder for API call to update language preference
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        language: state.language,
      }),
    }
  )
);