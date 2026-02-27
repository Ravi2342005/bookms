import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Movie } from "@/data/movies";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group cursor-pointer"
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-3 shadow-[var(--shadow-card)]">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Book Now
          </button>
        </div>
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {movie.rating}
        </div>
      </div>

      {/* Info */}
      <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
        {movie.title}
      </h3>
      <div className="flex flex-wrap gap-1 mt-1">
        {movie.genre.map((g) => (
          <span key={g} className="text-xs text-muted-foreground">
            {g}{movie.genre.indexOf(g) < movie.genre.length - 1 ? " · " : ""}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default MovieCard;
