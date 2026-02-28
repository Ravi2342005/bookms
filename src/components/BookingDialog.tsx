import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Loader2, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateBooking } from "@/hooks/useBookings";
import { useNavigate } from "react-router-dom";
import type { DBMovie } from "@/hooks/useMovies";

const PRICE_PER_SEAT = 250;

interface BookingDialogProps {
  movie: DBMovie;
  open: boolean;
  onClose: () => void;
  theaterName?: string;
  showtime?: string;
}

const BookingDialog = ({ movie, open, onClose, theaterName, showtime }: BookingDialogProps) => {
  const [seats, setSeats] = useState(1);
  const [step, setStep] = useState<"select" | "paying" | "done">("select");
  const { user } = useAuth();
  const navigate = useNavigate();
  const createBooking = useCreateBooking();

  const maxSeats = Math.min(movie.available_seats ?? 0, 10);

  const handleBook = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setStep("paying");
    try {
      await createBooking.mutateAsync({
        movieId: movie.id,
        seats,
        pricePerSeat: PRICE_PER_SEAT,
      });
      setStep("done");
    } catch {
      setStep("select");
    }
  };

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
          className="glass rounded-xl w-full max-w-md p-6 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-2xl font-display text-foreground mb-1">{movie.title}</h2>
          <p className="text-sm text-muted-foreground mb-1">
            {movie.genre.join(" · ")} · {movie.duration} · {movie.language}
          </p>
          {theaterName && showtime && (
            <p className="text-sm text-primary font-medium mb-6">
              {theaterName} — {showtime}
            </p>
          )}
          {!(theaterName && showtime) && <div className="mb-6" />}

          {step === "select" && (
            <div className="space-y-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Number of Tickets</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    className="rounded-lg bg-secondary p-2 hover:bg-secondary/80"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-2xl font-semibold text-foreground w-8 text-center">{seats}</span>
                  <button
                    onClick={() => setSeats(Math.min(maxSeats, seats + 1))}
                    className="rounded-lg bg-secondary p-2 hover:bg-secondary/80"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {movie.available_seats} seats available
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{seats} × ₹{PRICE_PER_SEAT}</span>
                  <span className="text-foreground font-semibold">₹{seats * PRICE_PER_SEAT}</span>
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={maxSeats === 0}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                {user ? "Pay & Book" : "Sign In to Book"}
              </button>
            </div>
          )}

          {step === "paying" && (
            <div className="flex flex-col items-center py-8 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Processing payment...</p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-8 gap-4">
              <div className="text-4xl">🎉</div>
              <p className="text-foreground font-semibold">Booking Confirmed!</p>
              <p className="text-sm text-muted-foreground text-center">
                {seats} ticket(s) for {movie.title}. Check your email for confirmation.
              </p>
              <button
                onClick={onClose}
                className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDialog;
