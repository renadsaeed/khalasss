// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://waslalkhair.runasp.net",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/khalasss/",
  plugins: [react()],
  server: {
    port: 5173, // ✅ تثبيت البورت هنا
    proxy: {
      "/api": {
        target: "https://waslalkhair.runasp.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
