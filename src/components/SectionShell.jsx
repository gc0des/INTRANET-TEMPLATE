import { motion } from "framer-motion";

export function SectionShell({ id, title, eyebrow, description, children, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`clean-panel rounded-[2rem] p-5 2xl:p-8 ${className}`}
    >
      <div className="mb-4 flex flex-col gap-2 2xl:mb-6 2xl:gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--usa-primary)" }}>
              {eyebrow}
            </p>
          )}
          <h2 className="section-title mt-2">{title}</h2>
        </div>
        {description && <p className="max-w-2xl muted-copy">{description}</p>}
      </div>
      {children}
    </motion.section>
  );
}
