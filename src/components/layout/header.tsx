import { ModeToggle } from "../theme/mode-toggle";

export function Header() {
  return (
    <header className="flex justify-between mb-9">
      <a href="/" className="hover:opacity-80 transition-opacity">
        <h1 className="text-3xl font-bold">Crypto asset tracker</h1>
      </a>
      <ModeToggle />
    </header>
  );
}
