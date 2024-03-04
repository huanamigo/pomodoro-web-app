import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://huanamigo.github.io/pomodoro-web-app/',
  plugins: [react()],
});
