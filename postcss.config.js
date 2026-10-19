// Tailwind CSS v4 ships its PostCSS plugin separately and handles vendor
// prefixing itself, so autoprefixer is no longer needed.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
