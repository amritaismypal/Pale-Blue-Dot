import nextVitals from 'eslint-config-next/core-web-vitals'

export default [
  ...nextVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'studio/seed/**'],
    rules: { 'import/no-anonymous-default-export': 'off' },
  },
]
