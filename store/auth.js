import create, { createStore } from "zustand";

const useStore = create((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: {
    name: "",
    phone: "",
    id: "",
    verifiedPhone: false,
  },
  setUser: (token, id, phone, fullName,verifiedPhone) => {
    if (token) {
      localStorage.setItem("rent-app-token", token);
    }
    set((state) => ({
      isAuthenticated: true,
      isLoading : false,
      user: {
        name: fullName,
        phone: phone,
        id: id,
        verifiedPhone: verifiedPhone,
      },
    }));
  },
  removeUser: () => {
    localStorage.removeItem("rent-app-token");
    set((state) => ({
      isAuthenticated: false,
      isLoading : false,
      user: {
        name: "",
        phone: "",
        id: "",
        verifiedPhone: false,
      },
    }));
  },
  setAuthincatedUser: () => {
    set((state) => ({
      isAuthenticated: false,
      isLoading : false,
      user: {
        name: "",
        phone: "",
        id: "",
        verifiedPhone: false,
      },
    }));
  }
}));

export const useUserStore = useStore;
