/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", "var(--font-sans)"],
                mono: ["var(--font-geist-mono)", "var(--font-mono)"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                "background-card": "var(--background-card)",
                border: "var(--border)",
            },
        },
    },
    plugins: [],
}