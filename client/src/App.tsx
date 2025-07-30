import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SubtleBackground, ParticleOverlay } from "@/components/subtle-background";
import { useSubtleParticles } from "@/hooks/use-subtle-particles";
import Home from "@/pages/home";
import Product from "@/pages/product";
import ComingSoon from "@/pages/coming-soon";
import ManifestPage from "@/pages/manifest";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:handle" component={Product} />
      <Route path="/category/strohhalme" component={Product} />
      <Route path="/coming-soon" component={ComingSoon} />
      <Route path="/manifest" component={ManifestPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { particles } = useSubtleParticles();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SubtleBackground />
        <Toaster />
        <Router />
        <ParticleOverlay particles={particles} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
