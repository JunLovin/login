import { useEffect, useRef } from "react";
import gsap from 'gsap'

type ToastTypes = {
  show: boolean,
  message: string,
  duration?: number,
  onClose: () => void,
  type: "success" | "error" | unknown
}

const Toast = ({ show, message, duration = 2000, onClose, type = "success" } : ToastTypes ) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (show) {
      gsap.fromTo(
        toastRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
      const timer = setTimeout(() => {
        gsap.to(toastRef.current, {
          y: -60,
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power3.in",
          onComplete: onClose,
        });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <div
      ref={toastRef}
      style={{
        position: "fixed",
        top: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        pointerEvents: "none",
        minWidth: 220,
      }}
      className={`transition-all px-6 py-3 rounded-xl shadow-xl font-semibold text-white text-center ${
        type === "error"
          ? "bg-red-600"
          : "bg-gradient-to-r from-purple-600 to-cyan-600"
      } ${show ? "block" : "hidden"}`}

    >
      {message}
    </div>
  );
};

export default Toast;