import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: 'local.dev',
    port: '8888',
  },
  plugins: [mkcert()],
});
