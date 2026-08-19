import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Seo from "./components/Seo";
import Index from "./pages/Index";
import Curriculum from "./pages/Curriculum";
import KnowledgeHub from "./pages/KnowledgeHub";
import KnowledgeArticle from "./pages/KnowledgeArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Seo />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/curriculo" element={<Curriculum />} />
          <Route path="/conhecimentos" element={<KnowledgeHub />} />
          <Route path="/conhecimentos/:slug" element={<KnowledgeArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
