import react from '@vitejs/plugin-react-swc'
import path from 'path';
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), Pages({ dirs: './src/pages' })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      proxy: {
        '/admin': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
