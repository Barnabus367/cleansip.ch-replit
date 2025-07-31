import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { SubtleBackground, ParticleOverlay } from "@/components/subtle-background";
import { useSubtleParticles } from "@/hooks/use-subtle-particles";
import { SmoothScrollContainer } from "@/components/parallax-section";
import { PageTransition } from "@/components/page-transition";
import { reportWebVitals, preloadCriticalResources } from "@/utils/performance";
import { useEffect } from "react";
import Home from "@/pages/home";
import Product from "@/pages/product";
import Contact from "@/pages/contact";
import FAQ from "@/pages/faq";
import About from "@/pages/about";
import ComingSoon from "@/pages/coming-soon";
import ManifestPage from "@/pages/manifest";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <PageTransition>
            <Home />
          </PageTransition>
        )}
      </Route>
      <Route path="/product/:handle">
        {() => (
          <PageTransition>
            <Product />
          </PageTransition>
        )}
      </Route>
      <Route path="/category/strohhalme">
        {() => (
          <PageTransition>
            <Product />
          </PageTransition>
        )}
      </Route>
      <Route path="/contact">
        {() => (
          <PageTransition>
            <Contact />
          </PageTransition>
        )}
      </Route>
      <Route path="/faq">
        {() => (
          <PageTransition>
            <FAQ />
          </PageTransition>
        )}
      </Route>
      <Route path="/about">
        {() => (
          <PageTransition>
            <About />
          </PageTransition>
        )}
      </Route>
      <Route path="/coming-soon">
        {() => (
          <PageTransition>
            <ComingSoon />
          </PageTransition>
        )}
      </Route>
      <Route path="/manifest">
        {() => (
          <PageTransition>
            <ManifestPage />
          </PageTransition>
        )}
      </Route>
      <Route>
        {() => (
          <PageTransition>
            <NotFound />
          </PageTransition>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  const { particles } = useSubtleParticles();

  useEffect(() => {
    // Initialize performance monitoring
    reportWebVitals();
    preloadCriticalResources();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <SmoothScrollContainer>
            <SubtleBackground />
            <Toaster />
            <Router />
            <ParticleOverlay particles={particles} />
          </SmoothScrollContainer>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
