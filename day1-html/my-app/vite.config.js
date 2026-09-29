import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← new import: this plugin scans your JSX for class names at build time

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // ← registering the plugin — like adding a compiler flag/pass, it processes your CSS before Vite bundles it
  ],
})