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
    scale: {
      105: "1.05",
      115: "1.15",
    },
    letterSpacing: {
      normal: "0em",
      wider: ".075em",
      widest: ".15em",
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
      borderWidth: ["even", "odd"],
      padding: ["even", "odd"],
      opacity: ["hover", "group-hover"],
      letterSpacing: ["hover"],
    },
  },
  plugins: [],
};
