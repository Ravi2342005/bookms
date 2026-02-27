import { Search, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-display text-gradient tracking-wider">BOOKMYSHOW</span>
          </a>

          {/* Search - desktop */}
          <div className="hidden md:flex flex-1 max-w-md items-center rounded-lg bg-secondary px-3 py-2 gap-2">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4" />
              Mumbai
            </button>
            <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center rounded-lg bg-secondary px-3 py-2 gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> Mumbai
              </button>
              <button className="w-full rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
