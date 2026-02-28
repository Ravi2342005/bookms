import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Landmark, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PRICE_PER_SEAT = 250;

type PaymentMethod = "card" | "upi" | "netbanking";

interface PaymentDetailsProps {
  movieTitle: string;
  theaterName: string;
  showtime: string;
  seatIds: string[];
  seatCount: number;
  onPay: () => Promise<void>;
  onBack: () => void;
  onDone: () => void;
}

const PaymentDetails = ({
  movieTitle,
  theaterName,
  showtime,
  seatIds,
  seatCount,
  onPay,
  onBack,
  onDone,
}: PaymentDetailsProps) => {
  const [method, setMethod] = useState<PaymentMethod | "">("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [bookingId, setBookingId] = useState("");

  const totalAmount = seatCount * PRICE_PER_SEAT;

  const isCardValid = useMemo(() => {
    if (method !== "card") return false;
    return (
      cardName.trim().length > 0 &&
      /^\d{16}$/.test(cardNumber.replace(/\s/g, "")) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
      /^\d{3}$/.test(cvv)
    );
  }, [method, cardName, cardNumber, expiry, cvv]);

  const isUpiValid = useMemo(() => {
    if (method !== "upi") return false;
    return /^[\w.-]+@[\w]+$/.test(upiId.trim());
  }, [method, upiId]);

  const isFormValid = useMemo(() => {
    if (method === "card") return isCardValid;
    if (method === "upi") return isUpiValid;
    if (method === "netbanking") return true;
    return false;
  }, [method, isCardValid, isUpiValid]);

  const handlePay = async () => {
    setStep("processing");
    try {
      await onPay();
      const id = `BK${Date.now().toString(36).toUpperCase()}`;
      setBookingId(id);
      setStep("success");
    } catch {
      setStep("form");
    }
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  if (step === "processing") {
    return (
      <div className="flex flex-col items-center py-12 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">Processing your payment...</p>
      </div>
    );
  }

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-8 gap-5"
      >
        <CheckCircle2 className="h-14 w-14 text-green-500" />
        <h3 className="text-xl font-display text-foreground tracking-wide">Payment Successful!</h3>

        <div className="w-full glass rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking ID</span>
            <span className="text-foreground font-semibold">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Movie</span>
            <span className="text-foreground">{movieTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Showtime</span>
            <span className="text-foreground">{showtime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seats</span>
            <span className="text-foreground">{seatIds.join(", ")}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 mt-2">
            <span className="text-muted-foreground">Total Paid</span>
            <span className="text-foreground font-semibold">₹{totalAmount}</span>
          </div>
        </div>

        <button
          onClick={onDone}
          className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Back to Home
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back to Seats
      </button>

      {/* Booking Summary */}
      <div className="glass rounded-lg p-4 space-y-2 text-sm">
        <h3 className="text-base font-semibold text-foreground mb-2">Booking Summary</h3>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Movie</span>
          <span className="text-foreground">{movieTitle}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Showtime</span>
          <span className="text-foreground">{theaterName} — {showtime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Seats</span>
          <span className="text-foreground">{seatIds.join(", ")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tickets</span>
          <span className="text-foreground">{seatCount} × ₹{PRICE_PER_SEAT}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-2 mt-1">
          <span className="text-foreground font-semibold">Total</span>
          <span className="text-foreground font-semibold text-lg">₹{totalAmount}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Select Payment Method</h3>
        <RadioGroup
          value={method}
          onValueChange={(v) => setMethod(v as PaymentMethod)}
          className="space-y-2"
        >
          {[
            { value: "card", label: "Credit / Debit Card", icon: CreditCard },
            { value: "upi", label: "UPI", icon: Smartphone },
            { value: "netbanking", label: "Net Banking", icon: Landmark },
          ].map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                method === value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <RadioGroupItem value={value} />
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Card Form */}
      {method === "card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-3"
        >
          <div>
            <Label htmlFor="cardName" className="text-xs text-muted-foreground">Cardholder Name *</Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              className="mt-1 bg-secondary border-border"
            />
          </div>
          <div>
            <Label htmlFor="cardNum" className="text-xs text-muted-foreground">Card Number *</Label>
            <Input
              id="cardNum"
              value={formatCardNumber(cardNumber)}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="mt-1 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="expiry" className="text-xs text-muted-foreground">Expiry (MM/YY) *</Label>
              <Input
                id="expiry"
                value={formatExpiry(expiry)}
                onChange={(e) => setExpiry(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="MM/YY"
                maxLength={5}
                className="mt-1 bg-secondary border-border"
              />
            </div>
            <div className="w-24">
              <Label htmlFor="cvv" className="text-xs text-muted-foreground">CVV *</Label>
              <Input
                id="cvv"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                placeholder="•••"
                maxLength={3}
                className="mt-1 bg-secondary border-border"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* UPI Form */}
      {method === "upi" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
          <Label htmlFor="upiId" className="text-xs text-muted-foreground">UPI ID *</Label>
          <Input
            id="upiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="yourname@upi"
            className="mt-1 bg-secondary border-border"
          />
        </motion.div>
      )}

      {/* Net Banking - no extra form needed */}
      {method === "netbanking" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-xs text-muted-foreground">
            You will be redirected to your bank's portal to complete payment.
          </p>
        </motion.div>
      )}

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={!isFormValid}
        className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        Pay ₹{totalAmount}
      </button>
    </motion.div>
  );
};

export default PaymentDetails;
