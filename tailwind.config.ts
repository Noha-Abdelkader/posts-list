    
    /** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{vue,js,ts}",
    // './components/**/*.{vue,js,ts}',
    // './layouts/**/*.{vue,js,ts}',
    // './pages/**/*.{vue,js,ts}',
    // './app.vue',
    // './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        "custom-green": {
          500: '#AED581',
          600:'#9CCC65'
        },
      },
    },
  },
  plugins: [],
};

export default config