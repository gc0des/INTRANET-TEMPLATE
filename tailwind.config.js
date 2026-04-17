/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#eef9f0",
          100: "#d7efdd",
          200: "#b1debe",
          300: "#83c594",
          400: "#57a86d",
          500: "#3a8f53",
          600: "#2b7140",
          700: "#215a34",
          800: "#1c482c",
          900: "#173c26",
          950: "#092115"
        }
      },
      boxShadow: {
        glass: "0 18px 60px rgba(9, 33, 21, 0.16)"
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "sans-serif"]
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(163, 230, 188, 0.22), transparent 35%), radial-gradient(circle at top right, rgba(47, 105, 67, 0.24), transparent 28%), linear-gradient(135deg, rgba(4, 31, 18, 0.95), rgba(17, 74, 42, 0.82))"
      }
    }
  },
  plugins: []
};
