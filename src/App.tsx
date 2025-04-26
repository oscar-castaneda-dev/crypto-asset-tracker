import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/theme/mode-toggle";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <h1>App</h1>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}
