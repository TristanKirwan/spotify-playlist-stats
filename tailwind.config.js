module.exports = {
  content: ["./frontend/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      text: "#00161d",
      background: "#F1F1F1",
      primary: "#3A6EA5",
      secondary: "#7A8450",
      tertiary: "#88292F",
      black: "#00161d",
      transparent: "transparent",
    },
    fontFamily: {
      "barlow-bold": ["barlow-bold"],
      "barlow-regular": ["barlow-regular"],
      "barlow-semibold": ["barlow-semibold"],
    },
    fontSize: {
      "heading-1": ["var(--heading-1)", "var(--heading-1-line-height)"],
      "heading-2": ["var(--heading-2)", "var(--heading-2-line-height)"],
      "heading-3": ["var(--heading-3)", "var(--heading-3-line-height)"],
      "heading-4": ["var(--heading-4)", "var(--heading-4-line-height)"],
      "heading-5": ["var(--heading-5)", "var(--heading-5-line-height)"],
      "body-1": ["var(--body-1)", "var(--body-1-line-height)"],
      "body-2": ["var(--body-2)", "var(--body-2-line-height)"],
      "body-3": ["var(--body-3)", "var(--body-3-line-height)"],
    },
    extend: {
      maxWidth: {
        tiny: "11.25rem",
        xxs: "15rem",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      minWidth: {
        xs: "18.75rem",
        sm: "24rem",
      },
    },
  },
  plugins: [],
};
