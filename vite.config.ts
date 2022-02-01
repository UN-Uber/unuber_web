import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [
			{ find: '@', replacement: '/src' }
        ],
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
	plugins: [react()],
});
