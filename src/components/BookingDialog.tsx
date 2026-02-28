import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateBooking } from "@/hooks/useBookings";
import { useNavigate } from "react-router-dom";
import type { DBMovie } from "@/hooks/useMovies";
import SeatLayout from "./SeatLayout";
import PaymentDetails from "./PaymentDetails";

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
  const [step, setStep] = useState<"select" | "seats" | "payment">("select");
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const createBooking = useCreateBooking();

  const maxSeats = Math.min(movie.available_seats ?? 0, 10);

  const handlePay = async () => {
    await createBooking.mutateAsync({
      movieId: movie.id,
      seats,
      pricePerSeat: PRICE_PER_SEAT,
    });
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
          className={`glass rounded-xl w-full ${step === "payment" ? "max-w-md" : "max-w-lg"} p-6 relative max-h-[90vh] overflow-y-auto`}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10">
            <X className="h-5 w-5" />
          </button>

          {step !== "payment" && (
            <>
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
            </>
          )}

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
                onClick={() => {
                  if (!user) {
                    navigate("/auth");
                    return;
                  }
                  setStep("seats");
                }}
                disabled={maxSeats === 0}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {user ? "Select Seats" : "Sign In to Book"}
              </button>
            </div>
          )}

          {step === "seats" && (
            <div>
              <button
                onClick={() => setStep("select")}
                className="text-xs text-muted-foreground hover:text-foreground mb-3"
              >
                ← Back
              </button>
              <SeatLayout
                maxSeats={maxSeats}
                totalSeats={movie.available_seats ?? 60}
                selectedCount={seats}
                onConfirm={(seatIds) => {
                  setSelectedSeatIds(seatIds);
                  setStep("payment");
                }}
              />
            </div>
          )}

          {step === "payment" && (
            <PaymentDetails
              movieTitle={movie.title}
              theaterName={theaterName ?? ""}
              showtime={showtime ?? ""}
              seatIds={selectedSeatIds}
              seatCount={seats}
              onPay={handlePay}
              onBack={() => setStep("seats")}
              onDone={onClose}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDialog;
