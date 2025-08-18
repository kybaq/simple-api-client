// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ ESM에서는 __dirname, __filename이 없으므로 직접 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './', // electron 빌드 시, asset 경로 지정을 위해 설정함
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // 👉 필요시 디버깅 편리
  },
  server: {
    port: 5173,
    strictPort: true, // 👉 포트 이미 사용 중이면 실패 (명시적임)
    open: true, // 👉 dev시 브라우저 자동 열기
  },
});
