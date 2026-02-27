import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Tables } from "@/integrations/supabase/types";

export type DBMovie = Tables<"movies">;

export function useMovies() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("movies-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "movies" }, () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  return query;
}

export function useFeaturedMovies() {
  return useQuery({
    queryKey: ["movies", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("featured", true)
        .order("rating", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}
