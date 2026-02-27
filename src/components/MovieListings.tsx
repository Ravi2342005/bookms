import { useState } from "react";
import { motion } from "framer-motion";
import { useMovies } from "@/hooks/useMovies";
import MovieCard from "./MovieCard";
import { genres } from "@/data/movies";

const MovieListings = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const { data: movies = [], isLoading } = useMovies();

  const filtered =
    activeGenre === "All"
      ? movies
      : movies.filter((m) => m.genre.includes(activeGenre));

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16">
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

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-xl bg-secondary aspect-[2/3] mb-3" />
              <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
              <div className="h-3 bg-secondary rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
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
      )}

      {!isLoading && filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          No movies found in this genre.
        </p>
      )}
    </section>
  );
};

export default MovieListings;
