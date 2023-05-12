import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Details from "./components/Details";
import SearchParams from "./components/searchParam";
import AdoptedPetContext from "./providers/adoptedPetContext";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adobt me!</Link>
          </header>
          <h1>Adopt Me!</h1>
          <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
