import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IUserStore {
  userInfo: any;
  sessionInfo: any;
  loading: boolean;
  isLoggedIn: boolean;
  isOnboarded: boolean;
  role: string;
  error: string;
  getUser: () => any;
  getSession: () => any;
  getRole: () => string;
  getIsOnboarded: () => boolean;
  setLogin: (isLoggedIn: boolean) => void;
  getUserLoggedIn: () => boolean;
  getError: () => string;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setUserInfo: (userInfo: any) => void;
  setSessionInfo: (sessionInfo: any) => void;
  setIsOnboarded: (isOnboarded: boolean) => void;
  setRole: (role: string) => void;
}

const userStore = create(
  devtools(persist(
    (set: any, get: () => IUserStore) => ({
      userInfo: {},
      sessionInfo: {},
      loading: false,
      isLoggedIn: false,
      isOnboarded: false,
      role: "",
      error: "",
      getUser: () => get()?.userInfo,
      getSession: () => get()?.sessionInfo,
      getRole: () => get()?.role,
      getIsOnboarded: () => get()?.isOnboarded,
      setLogin: (isLoggedIn) => set({ isLoggedIn }),
      getUserLoggedIn: () => get()?.isLoggedIn,
      getError: () => get()?.error,
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      setUserInfo: (userInfo) => set({ userInfo }),
      setSessionInfo: (sessionInfo) => set({ sessionInfo }),
      setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
      setRole: (role) => set({ role }),
    }),
    { name: "user-store" }
  )
));

export default userStore;
