import {defineConfig} from'vite'
// import mkcert from'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // https: true,
    host: '127.0.0.1',
    port: 8089
  },
//   plugins: [mkcert()]
})