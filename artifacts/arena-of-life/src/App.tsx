import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import FounderStory from "@/components/FounderStory";
import Programs from "@/components/Programs";
import Merchandise from "@/components/Merchandise";
import Board from "@/components/Board";
import Events from "@/components/Events";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Admin from "@/components/Admin";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import ChatWidget from "@/components/ChatWidget";

const queryClient = new QueryClient();

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function Landing() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const scrollToHash = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView();
    };
    setTimeout(scrollToHash, 50);
    window.addEventListener("load", () => setTimeout(scrollToHash, 50), { once: true });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <FounderStory />
        <Programs />
        <Merchandise />
        <Board />
        <Events />
        <Donate />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router base={base}>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/admin" component={Admin} />
            <Route>
              <Landing />
            </Route>
          </Switch>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
