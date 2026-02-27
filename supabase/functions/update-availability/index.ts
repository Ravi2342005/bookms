import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Reset available seats for movies with low availability (simulated scheduled task)
  const { data: movies, error: fetchError } = await supabase
    .from("movies")
    .select("id, available_seats, title")
    .lt("available_seats", 20);

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const updates = [];
  for (const movie of movies ?? []) {
    const newSeats = Math.floor(Math.random() * 80) + 60; // Reset to 60-140
    const { error } = await supabase
      .from("movies")
      .update({ available_seats: newSeats })
      .eq("id", movie.id);

    if (!error) {
      updates.push({ id: movie.id, title: movie.title, old: movie.available_seats, new: newSeats });
    }
  }

  return new Response(
    JSON.stringify({ message: "Availability updated", updates }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
