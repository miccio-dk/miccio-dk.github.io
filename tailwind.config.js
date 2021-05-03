module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      dark: {
        DEFAULT: "#000000",
      },
      light: {
        DEFAULT: "#FFFFFF",
      },
      primary: {
        DEFAULT: "#009CF8",
      },
      secondary: {
        DEFAULT: "#F1F1E6",
      },
    },
    extend: {
      gridTemplateColumns: {
        w8: "repeat(auto-fill, minmax(8rem, 1fr))",
        w12: "repeat(auto-fill, minmax(12rem, 1fr))",
        w16: "repeat(auto-fill, minmax(16rem, 1fr))",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover", "focus"],
      borderRadius: ["hover", "focus"],
      opacity: ["hover", "group-hover"],
      letterSpacing: ["hover"],
    },
  },
  plugins: [],
};
