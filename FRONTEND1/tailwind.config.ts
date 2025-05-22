import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}', // Add any other folders if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
