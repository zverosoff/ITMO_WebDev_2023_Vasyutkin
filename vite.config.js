import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    port: '8888',
    host: 'local.dev',
  },
  plugins: [mkcert()],
});
