import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8070,
    hmr: {
      clientPort: 8070,
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // framer-motion and its sub-packages
          if (
            id.includes('/framer-motion/') ||
            id.includes('/motion-dom/') ||
            id.includes('/motion-utils/')
          ) return 'framer-motion';

          // React core (including scheduler to avoid circular deps)
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) return 'react';

          if (id.includes('react-router')) return 'router';

          // Radix UI and its peer deps
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
        }
      }
    }
  }
}));
