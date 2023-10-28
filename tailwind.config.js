/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/*.ejs', './src/views/partials/*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},

    },
    require("daisyui")
  ],
  daisyui: {
    themes: ["wireframe"],
  },
};