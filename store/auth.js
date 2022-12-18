import create, { createStore } from "zustand";
// import { devtools, persist } from "zustand/middleware";

const useStore = create((set) => ({
  user: {
    name: "",
    email: "",
    id: "",
  },
  setUser: (token, data) => {
    if (token) {
      localStorage.setItem("rent-app-token", token);
    }
    set((state) => ({
      user: {
        name: data.fullName,
        email: data.email,
        id: data._id,
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
