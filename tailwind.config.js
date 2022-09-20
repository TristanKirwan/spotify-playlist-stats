module.exports = {
  content: ["./frontend/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      orange: "#e57a55",
      black: "#00161d",
      "dark-blue": "#07242e",
      "dark-green": "#082a35",
      white: "#fff8e1",
      "light-blue": "#99dbcf",
      "neutral-blue": "#3e8780",
      green: "#0e313b",
      "true-white": "#FFFFFF",
      "gradient-dark-green": "#0D3039",
      "gradient-light-green": "#8FD7CA",
      transparent: "transparent",
    },
    fontFamily: {
      "barlow-bold": ["barlow-bold"],
      "barlow-regular": ["barlow-regular"],
      "barlow-semibold": ["barlow-semibold"],
    },
    fontSize: {
      "chapter-title-number": [
        "var(--chapter-title-number)",
        "var(--chapter-title-number-line-height)",
      ],
      "subchapter-title-number": [
        "var(--subchapter-title-number)",
        "var(--subchapter-title-number-line-height)",
      ],
      "hero-stat-number": [
        "var(--hero-stat-number)",
        "var(--hero-stat-number-line-height)",
      ],
      "heading-1": ["var(--heading-1)", "var(--heading-1-line-height)"],
      "heading-2": ["var(--heading-2)", "var(--heading-2-line-height)"],
      "heading-3": ["var(--heading-3)", "var(--heading-3-line-height)"],
      "heading-4": ["var(--heading-4)", "var(--heading-4-line-height)"],
      "heading-5": ["var(--heading-5)", "var(--heading-5-line-height)"],
      "body-1": ["var(--body-1)", "var(--body-1-line-height)"],
      "body-2": ["var(--body-2)", "var(--body-2-line-height)"],
      "body-3": ["var(--body-3)", "var(--body-3-line-height)"],
      "body-4": ["var(--body-4)", "var(--body-4-line-height)"],
      "button-text-1": [
        "var(--button-text-1)",
        "var(--button-text-1-line-height)",
      ],
      "button-text-2": [
        "var(--button-text-2)",
        "var(--button-text-2-line-height)",
      ],
    },
    extend: {
      width: {
        sidebar: "var(--sidebar-width)",
      },
    },
  },
  plugins: [],
};
