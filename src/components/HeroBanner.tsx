import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";
import { movies, Movie } from "@/data/movies";

const featured = movies.filter((m) => m.featured);

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const movie = featured[current];

  const go = (dir: number) =>
    setCurrent((prev) => (prev + dir + featured.length) % featured.length);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 55vw, 560px)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-10 sm:pb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genre.map((g) => (
                  <span key={g} className="rounded-full bg-primary/20 px-3 py-0.5 text-xs font-medium text-primary">
                    {g}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display text-foreground leading-none mb-3">
                {movie.title}
              </h1>
              {movie.description && (
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mb-4">
                  {movie.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1 text-accent font-semibold">
                  <Star className="h-4 w-4 fill-accent" /> {movie.rating}/10
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {movie.duration}
                </span>
                <span>{movie.language}</span>
              </div>
              <button className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                Book Tickets
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-foreground hover:bg-background/70 transition hidden sm:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-foreground hover:bg-background/70 transition hidden sm:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
