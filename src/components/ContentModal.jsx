import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function ContentModal({ isOpen, title, eyebrow, onClose, children, maxWidth = "max-w-4xl", closeLabel }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`relative w-full ${maxWidth} overflow-hidden rounded-[2rem] border clean-panel`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "var(--usa-border)" }}>
              <div>
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--usa-primary)" }}>
                    {eyebrow}
                  </p>
                ) : null}
                <h3 className="mt-1 text-xl font-semibold" style={{ color: "var(--usa-heading)" }}>
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl transition hover:bg-black/5"
                aria-label={closeLabel}
              >
                <X size={18} style={{ color: "var(--usa-heading)" }} />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
