import create, {
    createStore
} from "zustand";
// import { devtools, persist } from "zustand/middleware";

const useStore = create((set) => ({
    notifications: [],
    setNotification: (id, message, status) => {

        set((state) => ({
            notifications: [...state.notifications, {
                id,
                message,
                status
            }]
        }));
    },
    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((item) => item.id != id),
        }));
    },
}));

export const useUserStore = useStore;