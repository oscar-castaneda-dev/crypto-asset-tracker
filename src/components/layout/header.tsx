import { ModeToggle } from "../theme/mode-toggle";

export function Header() {
  return (
    <header className="flex justify-between mb-9">
      <h1 className="text-3xl font-bold">Crypto asset tracker</h1>
      <ModeToggle />
    </header>
  );
}
