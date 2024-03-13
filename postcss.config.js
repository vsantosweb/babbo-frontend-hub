module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    },
    autoprefixer: {},
  },
}
