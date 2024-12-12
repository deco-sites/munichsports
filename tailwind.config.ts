import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        // TODO: move everything to the theme component
        // #f4f4f4
        // #ececec
        // #dddddd
        // #a5a5a5
        // #9a9a9a
        // #888888
        // #606060
        // #454545
        // #333333
        // #dc0727
      },
    },
  },
};
