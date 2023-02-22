import create, { createStore } from "zustand";

const useStore = create((set) => ({
  user: {
    name: "",
    email: "",
    id: "",
  },
  setUser: (token, id, email, fullName) => {
    if (token) {
      localStorage.setItem("rent-app-token", token);
    }
    set((state) => ({
      user: {
        name: fullName,
        email: email,
        id: id,
      },
    }));
  },
  removeUser: () => {
    localStorage.removeItem("rent-app-token");
    set((state) => ({
      user: {
        name: "",
        email: "",
        id: "",
      },
    }));
  },
}));

export const useUserStore = useStore;
