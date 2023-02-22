import create from "zustand";

const useStore = create((set) => ({
    coordinates: {},
    city: "",
    setCity: (city) => set({
        city
    }),
    setCoordinates: (coordinates) => set({
        coordinates
    }),
    setCity: (city) => set({
        city
    })
}));

fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => useStore.setState({
        city: data.city,
        coordinates: {
            lat: data.latitude,
            lng: data.longitude
        }
    }))
    .catch((error) => console.log("error fetching city", error));

export const useAppStore = useStore;

export default useStore;