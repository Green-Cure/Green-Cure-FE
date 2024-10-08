/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gcPrimary: {
          basePrimary: "#56c596",
          100: "#e3f5ee",
          200: "#c7ecdc",
          300: "#abe2ca",
          400: "#8ed8b9",
          500: "#72cfa7",
          600: "#2d947f",
          700: "#329d9c",
          800: "#32898b",
          900: "#32798b",
          1000: "#205072",
        },
        gcSecondary: {
          baseSecondary: "#aab9c5",
          100: "#eaedf1",
          200: "#d4dce2",
          300: "#bfcbd4",
          400: "#93a6b6",
          500: "#7d94a6",
          600: "#678196",
          700: "#576e80",
          800: "#485a69",
          900: "#394753",
          1000: "#29343c",
        },
        gcNeutrals: {
          baseWhite: "#fafafa",
          100: "#e3e3e3",
          200: "#cccbcb",
          300: "#b5b3b3",
          400: "#9f9c9c",
          500: "#898483",
          600: "#726c6c",
          700: "#5a5555",
          800: "#433f3e",
          900: "#2b2928",
          1000: "#151413",
          baseBlack: "#0a0b0a",
        },
        gcSuccess: {
          100: "#A4F4E7",
          200: "#15B097",
          300: "#0B7B69",
        },
        gcWarning: {
          100: "#F4C790",
          200: "#EDA145",
          300: "#CC7914",
        },
        gcError: {
          100: "#E4626F",
          200: "#C03744",
          300: "#8C1823",
        },
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "weather-radial-cerah": "radial-gradient(circle at right bottom, #FEFFD8 17%, #B8CDE8 67%, #90B1F2 97%, #90B1F2 100%)",
        "weather-radial-berawan": "radial-gradient(circle at right bottom, #D8FFEC 17%, #B8CDE8 67%, #90B1F2 97%, #90B1F2 100%)",
        "weather-radial-hujan": "radial-gradient(circle at right bottom, #DDE7FF 17%, #A1B2D3 67%, #7C92BF 97%, #7C92BF 100%)",
        "weather-radial-badai": "radial-gradient(circle at right bottom, #A8BBEA 17%, #7C92BF 67%, #506183 97%, #506183 100%)",
        "weather-radial-bersalju": "radial-gradient(circle at right bottom, #D8FFEC 17%, #B8CDE8 67%, #90B1F2 97%, #90B1F2 100%)",
        "custom-gradient-detection": "linear-gradient(153.68deg, rgba(0, 0, 0, 0) -22.88%, #2D947F 106.43%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
