import create, { createStore } from "zustand";

const useStore = create((set) => ({
  user: {
    name: "",
    phone: "",
    id: "",
  },
  setUser: (token, id, phone, fullName) => {
    if (token) {
      localStorage.setItem("rent-app-token", token);
    }
    set((state) => ({
      user: {
        name: fullName,
        phone: phone,
        id: id,
      },
    }));
  },
  removeUser: () => {
    localStorage.removeItem("rent-app-token");
    set((state) => ({
      user: {
        name: "",
        phone: "",
        id: "",
      },
    }));
  },
}));

export const useUserStore = useStore;
