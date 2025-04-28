import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="container p-10container mx-auto px-4 py-6 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto">
        <p className="text-sm tracking-widest text-muted-foreground mb-4">
          ERROR 404
        </p>
        <h2 className="text-5xl font-normal mb-8">Page not found</h2>
        <div className="h-px w-16 bg-gray-200 dark:bg-gray-700 mb-4"></div>
        <p className="text-muted-foreground text-center text-lg mb-7">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="rounded-md px-8">
          <a href="/">Return to homepage</a>
        </Button>
      </div>
    </main>
  );
}
