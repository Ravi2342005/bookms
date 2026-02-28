import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface SeatLayoutProps {
  maxSeats: number;
  totalSeats?: number;
  selectedCount: number;
  onConfirm: (seatIds: string[]) => void;
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = 12;

function generateFilledSeats(totalSeats: number): Set<string> {
  const filled = new Set<string>();
  const total = ROWS.length * COLS;
  const filledCount = total - totalSeats;
  // Deterministic pseudo-random fill
  const allSeats: string[] = [];
  for (const row of ROWS) {
    for (let col = 1; col <= COLS; col++) {
      allSeats.push(`${row}${col}`);
    }
  }
  // Fill from back rows first with some scatter
  const seed = [5, 11, 2, 8, 0, 7, 3, 10, 1, 9, 4, 6];
  let count = 0;
  for (let r = ROWS.length - 1; r >= 0 && count < filledCount; r--) {
    for (const s of seed) {
      if (s < COLS && count < filledCount) {
        filled.add(`${ROWS[r]}${s + 1}`);
        count++;
      }
    }
  }
  return filled;
}

const SeatLayout = ({ maxSeats, totalSeats = 60, selectedCount, onConfirm }: SeatLayoutProps) => {
  const filledSeats = useMemo(() => generateFilledSeats(totalSeats), [totalSeats]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSeat = useCallback(
    (seatId: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(seatId)) {
          next.delete(seatId);
        } else if (next.size < selectedCount) {
          next.add(seatId);
        }
        return next;
      });
    },
    [selectedCount]
  );

  return (
    <div className="space-y-5">
      {/* Screen */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-3/4 h-2 rounded-b-full bg-primary/30" />
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Screen</span>
      </div>

      {/* Seat grid */}
      <div className="flex flex-col items-center gap-1.5">
        {ROWS.map((row) => (
          <div key={row} className="flex items-center gap-1">
            <span className="w-5 text-[10px] text-muted-foreground text-right">{row}</span>
            {Array.from({ length: COLS }, (_, i) => {
              const seatId = `${row}${i + 1}`;
              const isFilled = filledSeats.has(seatId);
              const isSelected = selected.has(seatId);

              return (
                <button
                  key={seatId}
                  disabled={isFilled}
                  onClick={() => toggleSeat(seatId)}
                  title={isFilled ? "Unavailable" : seatId}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded text-[9px] font-semibold transition-colors ${
                    isFilled
                      ? "bg-muted text-muted-foreground/30 cursor-not-allowed"
                      : isSelected
                        ? "bg-primary text-primary-foreground"
                        : "border border-green-500 text-green-500 hover:bg-green-500/20 cursor-pointer"
                  }`}
                >
                  {isFilled ? "" : i + 1}
                </button>
              );
            })}
            <span className="w-5 text-[10px] text-muted-foreground">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-muted inline-block" /> Filled
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded border border-green-500 inline-block" /> Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-primary inline-block" /> Selected
        </span>
      </div>

      {/* Selection info */}
      <p className="text-center text-xs text-muted-foreground">
        {selected.size} / {selectedCount} seats selected
      </p>

      <button
        onClick={() => onConfirm(Array.from(selected))}
        disabled={selected.size !== selectedCount}
        className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        Confirm Seats
      </button>
    </div>
  );
};

export default SeatLayout;
