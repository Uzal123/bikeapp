/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1FC39E",
                customGray: {
                    light: "#F9F9F9",
                    navbar: "#F4F0F0E0",
                    dark: "#545454",
                },
                gray: {
                    1000: "#2D2D2D",
                },
                customWhite: {
                    light: "rgba(203, 201, 201, 0.56)"
                }
            }
        },
    },
    plugins: [],
}