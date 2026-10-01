import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { LazyRender } from "@/components/LazyRender";
import Layout from "@/components/layout/Layout";

import Home from "@/pages/Home";

// Code splitting por rota — chunks isolados carregados sob demanda
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const HowWeWorkPage = lazy(() => import("@/pages/HowWeWorkPage"));
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage"));
const EngineeringPage = lazy(() => import("@/pages/EngineeringPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Overlays e analytics carregados de forma diferida
const Toaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));
const CookieBanner = lazy(() => import("@/components/cookie-banner").then((m) => ({ default: m.CookieBanner })));
const Analytics = lazy(() => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })));
const SpeedInsights = lazy(() => import("@vercel/speed-insights/react").then((m) => ({ default: m.SpeedInsights })));

const queryClient = new QueryClient();

export const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<ServicesPage />} />
              <Route path="/como-trabalhamos" element={<HowWeWorkPage />} />
              <Route path="/experiencia" element={<ExperiencePage />} />
              <Route path="/engenharia" element={<EngineeringPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/duvidas-frequentes" element={<FAQPage />} />

              {/* Redirecionamentos de rotas antigas no cliente (fallback para ambiente local) */}
              <Route path="/setores" element={<Navigate to="/experiencia" replace />} />
              <Route path="/autoridade" element={<Navigate to="/experiencia" replace />} />
              <Route path="/diferenciais" element={<Navigate to="/engenharia" replace />} />
              <Route path="/tecnologias" element={<Navigate to="/engenharia" replace />} />
              <Route path="/faq" element={<Navigate to="/duvidas-frequentes" replace />} />

              {/* Rota 404 (Catch-All) */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <LazyRender delay={2500}>
          <Suspense fallback={null}>
            <Toaster />
            <Sonner />
            <CookieBanner />
            <Analytics />
            <SpeedInsights />
          </Suspense>
        </LazyRender>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
