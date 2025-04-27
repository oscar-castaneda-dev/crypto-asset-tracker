import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import { Home } from "@/pages/home";
import { NotFound } from "@/pages/not-found";
import { store } from "@/store";

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
