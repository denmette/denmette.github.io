module.exports = {
  darkMode: "class",
  content: [
    "./themes/custom/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.{md,html}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h2: {
              fontSize: theme("fontSize.xl")[0],
              lineHeight: theme("fontSize.xl")[1].lineHeight,
              marginTop: "1.6em",
              marginBottom: "0.6em",
            },
            h3: {
              fontSize: theme("fontSize.lg")[0],
              lineHeight: theme("fontSize.lg")[1].lineHeight,
              marginTop: "1.4em",
              marginBottom: "0.5em",
            },
            h4: {
              fontSize: theme("fontSize.base")[0],
              lineHeight: theme("fontSize.base")[1].lineHeight,
              fontWeight: theme("fontWeight.semibold"),
              marginTop: "1.2em",
              marginBottom: "0.4em",
            },
          },
        },
        invert: {
          css: {
            h2: {
              fontSize: theme("fontSize.xl")[0],
              lineHeight: theme("fontSize.xl")[1].lineHeight,
              marginTop: "1.6em",
              marginBottom: "0.6em",
            },
            h3: {
              fontSize: theme("fontSize.lg")[0],
              lineHeight: theme("fontSize.lg")[1].lineHeight,
              marginTop: "1.4em",
              marginBottom: "0.5em",
            },
            h4: {
              fontSize: theme("fontSize.base")[0],
              lineHeight: theme("fontSize.base")[1].lineHeight,
              fontWeight: theme("fontWeight.semibold"),
              marginTop: "1.2em",
              marginBottom: "0.4em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
