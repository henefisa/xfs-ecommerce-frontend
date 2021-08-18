module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDelay: {
        0: "0ms",
        400: "400ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
