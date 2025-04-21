import { create } from 'zustand';

interface IAuth {
    token: string | null;
    decoded: object | null;
}

interface IAuthStore extends IAuth {
    setAuthStore: (newAuthData: IAuth) => void;
    reset: () => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
    token: null,
    decoded: null,
    setAuthStore: (newAuthData: IAuth) =>
        set((state) => ({ ...state, ...newAuthData })),
    reset: () => set({ token: null, decoded: null })
}));

export default useAuthStore;
