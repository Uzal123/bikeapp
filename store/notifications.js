import create, {} from "zustand";
// import { devtools, persist } from "zustand/middleware";

export const useStore = create((set) => ({
    notifications: [],
    removeNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((item) => item.id != id),
        }));
    },
    setNotification: (id, message, status, timeDelay = 3000) => {

        set((state) => ({
            notifications: [...state.notifications, {
                id,
                message,
                status
            }]
        }));
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((item) => item.id != id),
            }));
        }, timeDelay);
    },

}));

export const useNotificationStore = useStore;

export default useStore;