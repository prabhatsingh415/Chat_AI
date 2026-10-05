/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: ["InterRegular"],
        "inter-medium": ["InterMedium"],
        "inter-semibold": ["InterSemiBold"],
        "inter-bold": ["InterBold"],
      },
    },
  },
  plugins: [],
};
