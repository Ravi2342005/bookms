import posterAction from "@/assets/poster-action.jpg";
import posterRomance from "@/assets/poster-romance.jpg";
import posterScifi from "@/assets/poster-scifi.jpg";
import posterHorror from "@/assets/poster-horror.jpg";
import posterComedy from "@/assets/poster-comedy.jpg";
import posterAnimation from "@/assets/poster-animation.jpg";

export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  rating: number;
  language: string;
  releaseDate: string;
  duration: string;
  votes: string;
  featured?: boolean;
  description?: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Shadow Protocol",
    poster: posterAction,
    genre: ["Action", "Thriller"],
    rating: 8.4,
    language: "English",
    releaseDate: "2026-02-20",
    duration: "2h 15m",
    votes: "124.5K",
    featured: true,
    description: "A rogue agent must uncover a global conspiracy before time runs out.",
  },
  {
    id: 2,
    title: "Eternal Sunset",
    poster: posterRomance,
    genre: ["Romance", "Drama"],
    rating: 7.9,
    language: "Hindi",
    releaseDate: "2026-02-14",
    duration: "2h 30m",
    votes: "89.2K",
    featured: true,
    description: "Two strangers find love in the most unexpected place.",
  },
  {
    id: 3,
    title: "Beyond the Stars",
    poster: posterScifi,
    genre: ["Sci-Fi", "Adventure"],
    rating: 9.1,
    language: "English",
    releaseDate: "2026-03-01",
    duration: "2h 45m",
    votes: "201.3K",
    featured: true,
    description: "Humanity's last hope lies beyond the edge of the known universe.",
  },
  {
    id: 4,
    title: "Whispers in the Dark",
    poster: posterHorror,
    genre: ["Horror", "Mystery"],
    rating: 7.2,
    language: "English",
    releaseDate: "2026-02-25",
    duration: "1h 55m",
    votes: "67.8K",
  },
  {
    id: 5,
    title: "The Great Misadventure",
    poster: posterComedy,
    genre: ["Comedy", "Family"],
    rating: 7.6,
    language: "Hindi",
    releaseDate: "2026-02-18",
    duration: "2h 05m",
    votes: "95.1K",
  },
  {
    id: 6,
    title: "Enchanted Realms",
    poster: posterAnimation,
    genre: ["Animation", "Fantasy"],
    rating: 8.8,
    language: "English",
    releaseDate: "2026-03-05",
    duration: "1h 50m",
    votes: "156.7K",
  },
];

export const genres = ["All", "Action", "Romance", "Sci-Fi", "Horror", "Comedy", "Animation", "Drama", "Thriller", "Fantasy"];
