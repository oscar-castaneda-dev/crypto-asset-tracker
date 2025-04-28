import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "@/pages/home";
import { NotFound } from "@/pages/not-found";
import { store } from "@/store";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}
