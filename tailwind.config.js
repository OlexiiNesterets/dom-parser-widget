/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,js,tsx,jsx,html}"],
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
    future: {
        hoverOnlyWhenSupported: true,
    }
}