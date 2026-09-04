import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Plugin customizado: converte os <link rel="stylesheet"> do CSS principal
 * gerado pelo Vite em preload não-bloqueante (media="print" → "all").
 * Isso elimina o CSS render-blocking apontado pelo Lighthouse, reduzindo FCP/LCP.
 * Só atua em produção (mode === 'production') para não interferir no HMR do dev.
 */
function viteDeferCss(): Plugin {
  return {
    name: 'vite-defer-css',
    apply: 'build',
    transformIndexHtml(html) {
      // Converte <link rel="stylesheet" crossorigin? href="/assets/....css">
      // em preload não-bloqueante + noscript fallback.
      // O Vite injeta crossorigin em algumas configurações — o regex cobre ambos os casos.
      return html.replace(
        /<link rel="stylesheet"(\s+crossorigin)? href="(\/assets\/[^"]+\.css)">/g,
        (_match, _crossorigin, href) =>
          `<link rel="preload" href="${href}" as="style">` +
          `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all';this.onload=null">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8070,
    hmr: {
      clientPort: 8070,
      overlay: false,
    },
    watch: {
      ignored: [
        '**/coverage/**',
        '**/coverage-report/**',
        '**/coverage-new/**',
        '**/.git/**',
        '**/tasks/**',
        '**/specs/**',
        '**/reviews/**',
        '**/test-results/**',
        '**/playwright-report/**',
        '**/*.log',
      ],
    },
  },
  plugins: [react(), viteDeferCss(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    // CSS code split: true garante que cada chunk carregue só o CSS que precisa,
    // evitando que o bundle inteiro de CSS bloqueie o render inicial.
    cssCodeSplit: true,
    // modulePreload polyfill: garante que navegadores antigos carreguem
    // os preload de módulos corretamente sem bloquear a renderização.
    modulePreload: { polyfill: true },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // framer-motion e sub-pacotes
          if (
            id.includes('/framer-motion/') ||
            id.includes('/motion-dom/') ||
            id.includes('/motion-utils/')
          ) return 'framer-motion';

          // React core
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) return 'react';

          if (id.includes('react-router')) return 'router';

          // Radix UI e peer deps
          if (
            id.includes('@radix-ui') ||
            id.includes('react-remove-scroll') ||
            id.includes('@floating-ui') ||
            id.includes('use-callback-ref') ||
            id.includes('react-style-singleton') ||
            id.includes('use-sidecar')
          ) return 'radix';

          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('@emailjs')) return 'emailjs';
          if (id.includes('@tanstack')) return 'tanstack';
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) return 'forms';
        }
      }
    }
  }
}));
