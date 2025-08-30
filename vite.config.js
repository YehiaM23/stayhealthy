import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        proxy: {
            '^/api': {
                target: 'https://chinamobao-8181.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/api',
                changeOrigin: true,
            }
        }
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': new URL('./src', import.meta.url).pathname,
            'app': new URL('./src/app', import.meta.url).pathname,
            'components': new URL('./src/components', import.meta.url).pathname
        }
    }
})
