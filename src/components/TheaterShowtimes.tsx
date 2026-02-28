import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock } from "lucide-react";
import { theaters, type Theater } from "@/data/theaters";
import type { DBMovie } from "@/hooks/useMovies";

interface TheaterShowtimesProps {
  movie: DBMovie;
  open: boolean;
  onClose: () => void;
  onSelectShowtime: (theater: Theater, showtime: string) => void;
}

const TheaterShowtimes = ({ movie, open, onClose, onSelectShowtime }: TheaterShowtimesProps) => {
  const [selectedShowtime, setSelectedShowtime] = useState<{ theaterId: string; time: string } | null>(null);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-xl w-full max-w-2xl p-6 relative max-h-[85vh] overflow-y-auto"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-2xl font-display text-foreground mb-6">
            Theaters Showing {movie.title}
          </h2>

          <div className="space-y-4">
            {theaters.map((theater) => (
              <div
                key={theater.id}
                className="rounded-lg border border-border bg-secondary/30 p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      {theater.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{theater.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">Showtimes</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {theater.showtimes.map((time) => {
                    const isSelected =
                      selectedShowtime?.theaterId === theater.id &&
                      selectedShowtime?.time === time;
                    return (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedShowtime({ theaterId: theater.id, time });
                          onSelectShowtime(theater, time);
                        }}
                        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TheaterShowtimes;
