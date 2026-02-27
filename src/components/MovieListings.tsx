import { useState } from "react";
import { motion } from "framer-motion";
import { movies, genres } from "@/data/movies";
import MovieCard from "./MovieCard";

const MovieListings = () => {
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered =
    activeGenre === "All"
      ? movies
      : movies.filter((m) => m.genre.includes(activeGenre));

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16">
      {/* Section header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-display text-foreground">
            NOW SHOWING
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Book tickets for the latest movies
          </p>
        </div>
        <a href="#" className="text-sm text-primary hover:underline hidden sm:block">
          See All →
        </a>
      </div>

      {/* Genre filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeGenre === genre
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
      >
        {filtered.map((movie) => (
          <motion.div
            key={movie.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          No movies found in this genre.
        </p>
      )}
    </section>
  );
};

export default MovieListings;
