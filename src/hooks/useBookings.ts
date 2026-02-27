import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export function useBookings() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookings")
        .select("*, movies(*)")
        .eq("user_id", user.id)
        .order("booked_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ movieId, seats, pricePerSeat }: { movieId: number; seats: number; pricePerSeat: number }) => {
      if (!user) throw new Error("Must be logged in");

      const paymentAmount = seats * pricePerSeat;

      // Create booking as pending
      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          movie_id: movieId,
          seats,
          status: "pending" as const,
          payment_amount: paymentAmount,
        })
        .select()
        .single();

      if (error) throw error;

      // Mock payment: simulate 2s delay then mark as paid
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { error: updateError } = await supabase
        .from("bookings")
        .update({ status: "paid" as const })
        .eq("id", booking.id);

      if (updateError) throw updateError;

      // Decrement available seats
      const { error: rpcError } = await supabase.rpc("decrement_seats", {
        movie_id_param: movieId,
        seat_count: seats,
      });
      if (rpcError) console.error("Failed to decrement seats:", rpcError);

      // Mock email notification via toast
      toast({
        title: "🎬 Booking Confirmed!",
        description: `Your ${seats} ticket(s) have been booked. Confirmation email sent to ${user.email}`,
      });

      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err: Error) => {
      toast({
        title: "Booking Failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });
}
