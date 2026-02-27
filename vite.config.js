import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // 1. Quita el punto inicial. Debe ser una ruta absoluta desde el dominio.
  base: '/arrozmurcia/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Arroz Murcia',
        short_name: 'ArrozMurcia',
        description: 'Cocina autentico arroz de Murcia',
        // 2. Añade explícitamente estas dos líneas para que la PWA sepa dónde empezar
        start_url: '/arrozmurcia/',
        scope: '/arrozmurcia/',
        theme_color: '#1a1a2e',
        background_color: '#1a1a2e',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
