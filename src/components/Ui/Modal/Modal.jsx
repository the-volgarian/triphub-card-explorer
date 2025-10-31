import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

export default function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);

  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setMounted(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`modal ${visible ? "modal--show" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div className="modal__backdrop" />
      <div
        className="modal__panel"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h3 id="modal-title" className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.body
  );
}
