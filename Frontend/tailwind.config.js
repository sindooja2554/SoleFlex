/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#0a245c",
        "custom-blue-hover": "#1a347c", // Optional, already added for buttons
        "custom-background-color": "#0a245c"
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
