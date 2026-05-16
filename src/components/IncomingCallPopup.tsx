import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, PhoneOff, X } from "lucide-react";

const CONFIG = {
  delay: 10000,
  countdown: 30,
  whatsappNumber: "923446012505",
  calLink: "https://cal.com/yasir-bashir-bp4wob/30min",
  cookieKey: "yasir_call_dismissed",
  cooldownMs: 3 * 24 * 60 * 60 * 1000, // 3 days
};

const WA_MESSAGE = encodeURIComponent(
  "Hi Yasir! 👋\n\nI just came from your website yasirbashir.com and accepted your call.\n\nI'm interested in learning about your AI automation services.\n\nMy biggest challenge right now is: "
);
const WA_URL = `https://wa.me/${CONFIG.whatsappNumber}?text=${WA_MESSAGE}`;

type PopupState = "hidden" | "ringing" | "accepted" | "declined";

const playRingtone = (): (() => void) => {
  try {
    const audio = new Audio("/sounds/iphone-ringtone.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    };
  } catch {
    return () => {};
  }
};

const IncomingCallPopup = () => {
  const [state, setState] = useState<PopupState>("hidden");
  const [displayName, setDisplayName] = useState("");
  const [nameTyped, setNameTyped] = useState(false);
  const [remaining, setRemaining] = useState(CONFIG.countdown);
  const [showToast, setShowToast] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stopRingtoneRef = useRef<(() => void) | null>(null);

  // Cookie helpers
  const isDismissed = useCallback(() => {
    try {
      const val = localStorage.getItem(CONFIG.cookieKey);
      if (!val) return false;
      return Date.now() - parseInt(val, 10) < CONFIG.cooldownMs;
    } catch {
      return false;
    }
  }, []);

  const setDismissed = useCallback(() => {
    try {
      localStorage.setItem(CONFIG.cookieKey, Date.now().toString());
    } catch {}
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (state !== "ringing") return;
    const name = "Yasir Bashir";
    let i = 0;
    setDisplayName("");
    setNameTyped(false);
    const interval = setInterval(() => {
      i++;
      setDisplayName(name.slice(0, i));
      if (i >= name.length) {
        clearInterval(interval);
        setNameTyped(true);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [state]);

  // Countdown
  useEffect(() => {
    if (state !== "ringing") return;
    setRemaining(CONFIG.countdown);
    countdownRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          handleDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [state]);

  // Main trigger
  useEffect(() => {
    if (isDismissed()) return;
    if (sessionStorage.getItem("yasir_call_shown")) return;

    timerRef.current = setTimeout(() => {
      sessionStorage.setItem("yasir_call_shown", "1");
      // Vibrate on mobile
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      stopRingtoneRef.current = playRingtone();
      setState("ringing");
    }, CONFIG.delay);

    // Exit intent on desktop
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && timerRef.current) {
        clearTimeout(timerRef.current);
        sessionStorage.setItem("yasir_call_shown", "1");
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        stopRingtoneRef.current = playRingtone();
        setState("ringing");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave, { once: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDismissed]);

  const handleAccept = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (stopRingtoneRef.current) stopRingtoneRef.current();
    setState("accepted");
    setTimeout(() => {
      setState("hidden");
      window.open(WA_URL, "_blank");
    }, 1500);
  }, []);

  const handleDecline = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (stopRingtoneRef.current) stopRingtoneRef.current();
    setState("hidden");
    setDismissed();
    setTimeout(() => setShowToast(true), 3000);
    setTimeout(() => setShowToast(false), 11000);
  }, [setDismissed]);

  const barPercent = (remaining / CONFIG.countdown) * 100;

  return (
    <>
      {/* Call Popup */}
      <div
        className={`call-popup ${state === "ringing" || state === "accepted" ? "visible" : ""} ${state === "accepted" ? "call-accepted" : ""}`}
      >
        {/* Dynamic Island */}
        <div className="call-island">
          <div className="call-island-pill" />
        </div>

        {/* Carrier */}
        <div className="call-carrier">
          📶 AI Automation · yasirbashir.com
        </div>

        {/* Photo with ripple rings */}
        <div className="call-photo-wrap">
          <div className="call-ring call-ring-1" />
          <div className="call-ring call-ring-2" />
          <div className="call-ring call-ring-3" />
          <div className="call-photo-circle">
            <span className="call-initials">YB</span>
          </div>
        </div>

        {/* Caller info */}
        <div className="call-info">
          <div className={`call-name ${nameTyped ? "typed" : ""}`}>
            {displayName}
          </div>
          <div className="call-title">
            {state === "accepted" ? "Connecting on WhatsApp..." : "AI Growth Strategist"}
          </div>
          {state === "ringing" && (
            <div className="call-status-row">
              <span className="call-status-dot" />
              <span className="call-status-text">incoming whatsapp call...</span>
            </div>
          )}
        </div>

        {/* Countdown */}
        {state === "ringing" && (
          <div className="call-countdown-wrap">
            <div className="call-countdown-bar" style={{ width: `${barPercent}%` }} />
            <span className="call-countdown-text">
              Yasir stops calling in {remaining}s
            </span>
          </div>
        )}

        {/* Action buttons */}
        {state === "ringing" && (
          <div className="call-actions">
            <button className="call-action-btn call-decline" onClick={handleDecline} aria-label="Decline call">
              <span className="call-btn-icon call-decline-icon">
                <PhoneOff size={26} />
              </span>
              <span>Decline</span>
            </button>
            <button className="call-action-btn call-accept" onClick={handleAccept} aria-label="Accept call">
              <span className="call-btn-icon call-accept-icon">
                <Phone size={26} />
              </span>
              <span>Accept</span>
            </button>
          </div>
        )}

        {/* Accepted checkmark */}
        {state === "accepted" && (
          <div className="call-accepted-check">✓ Connected</div>
        )}
      </div>

      {/* Decline recovery toast */}
      <div className={`call-decline-toast ${showToast ? "visible" : ""}`}>
        <button onClick={() => setShowToast(false)} className="call-toast-close" aria-label="Close">
          <X size={14} />
        </button>
        <span>No worries! Book a time that works ✨</span>
        <a href={CONFIG.calLink} target="_blank" rel="noopener noreferrer">
          Book Free Audit →
        </a>
      </div>
    </>
  );
};

export default IncomingCallPopup;
