import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Companies from "@/pages/companies";
import Bostream from "@/pages/bostream";
import InvestorRelations from "@/pages/investor-relations";
import Careers from "@/pages/careers";
import News from "@/pages/news";
import Contact from "@/pages/contact";

function Router() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/companies" component={Companies} />
          <Route path="/companies/bostream" component={Bostream} />
          <Route path="/investor-relations" component={InvestorRelations} />
          <Route path="/careers" component={Careers} />
          <Route path="/news" component={News} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
