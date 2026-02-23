import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";


// https://vite.dev/config/
export default defineConfig({
  base: '/assets/',
  plugins: [react(), tailwindcss(), svgr()],
  build:{
    outDir:"../assets",
    emptyOutDir:false,
    rollupOptions:{
      output:{
        entryFileNames:'RB.js',
        chunkFileNames:'RB.js',
        assetFileNames: (assetInfo) => {
  if (assetInfo.name.endsWith('.css')) {
    return 'RB.css'
  }
  return '[name].[ext]'
}
      }
    }
  }
})
