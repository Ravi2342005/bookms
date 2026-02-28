import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { DBMovie } from "@/hooks/useMovies";
import TheaterShowtimes from "./TheaterShowtimes";
import BookingDialog from "./BookingDialog";
import type { Theater } from "@/data/theaters";

// Map poster_url to local assets for seeded movies
import posterAction from "@/assets/poster-action.jpg";
import posterRomance from "@/assets/poster-romance.jpg";
import posterScifi from "@/assets/poster-scifi.jpg";
import posterHorror from "@/assets/poster-horror.jpg";
import posterComedy from "@/assets/poster-comedy.jpg";
import posterAnimation from "@/assets/poster-animation.jpg";

const posterMap: Record<string, string> = {
  "/posters/action.jpg": posterAction,
  "/posters/romance.jpg": posterRomance,
  "/posters/scifi.jpg": posterScifi,
  "/posters/horror.jpg": posterHorror,
  "/posters/comedy.jpg": posterComedy,
  "/posters/animation.jpg": posterAnimation,
};

const MovieCard = ({ movie }: { movie: DBMovie }) => {
  const [theatersOpen, setTheatersOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<{ theater: Theater; showtime: string } | null>(null);
  const posterSrc = posterMap[movie.poster_url ?? ""] ?? movie.poster_url ?? "";

  const handleSelectShowtime = (theater: Theater, showtime: string) => {
    setSelectedInfo({ theater, showtime });
    setTheatersOpen(false);
    setBookingOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-3 shadow-[var(--shadow-card)]">
          <img
            src={posterSrc}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button
              onClick={() => setTheatersOpen(true)}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Book Tickets
            </button>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {movie.rating}
          </div>
        </div>

        <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-1 mt-1">
          {movie.genre.map((g, i) => (
            <span key={g} className="text-xs text-muted-foreground">
              {g}{i < movie.genre.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      </motion.div>

      <TheaterShowtimes
        movie={movie}
        open={theatersOpen}
        onClose={() => setTheatersOpen(false)}
        onSelectShowtime={handleSelectShowtime}
      />

      <BookingDialog
        movie={movie}
        open={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setSelectedInfo(null);
        }}
        theaterName={selectedInfo?.theater.name}
        showtime={selectedInfo?.showtime}
      />
    </>
  );
};

export default MovieCard;
