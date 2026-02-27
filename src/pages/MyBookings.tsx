import { useBookings } from "@/hooks/useBookings";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

const MyBookings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: bookings = [], isLoading } = useBookings();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-display text-foreground mb-8">MY BOOKINGS</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse glass rounded-xl p-6 flex gap-4">
                <div className="w-20 h-28 bg-secondary rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-secondary rounded w-1/3" />
                  <div className="h-4 bg-secondary rounded w-1/4" />
                  <div className="h-4 bg-secondary rounded w-1/5" />
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No bookings yet</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="glass rounded-xl p-6 flex gap-4 items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {(booking.movies as any)?.title ?? "Movie"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {booking.seats} ticket(s) · ₹{booking.payment_amount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(booking.booked_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    booking.status === "paid"
                      ? "bg-green-500/20 text-green-400"
                      : booking.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;
