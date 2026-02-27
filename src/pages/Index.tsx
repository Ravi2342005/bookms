import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieListings from "@/components/MovieListings";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroBanner />
        <MovieListings />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 BookMyShow Clone. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
