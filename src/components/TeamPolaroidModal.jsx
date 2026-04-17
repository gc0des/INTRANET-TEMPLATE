import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function TeamPolaroidModal({ member, labels, onClose }) {
  const isLongBio = Boolean(member?.bio && member.bio.length > 520);

  return (
    <AnimatePresence>
      {member ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            exit={{ opacity: 0, scale: 0.96, rotate: 0 }}
            transition={{ duration: 0.22 }}
            className={`relative w-full rounded-[2rem] bg-[#fffdf6] p-5 text-[#1f2a22] shadow-[0_24px_80px_rgba(0,0,0,0.28)] ${isLongBio ? "max-w-5xl" : "max-w-xl"}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-1/2 top-4 h-7 w-24 -translate-x-1/2 rounded-md bg-[#efe3bf]/80 shadow-sm" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/6 text-[#2e673b] transition hover:bg-black/10"
              aria-label={labels.close}
            >
              <X size={18} />
            </button>

            <div className={`mt-8 ${isLongBio ? "grid gap-5 xl:grid-cols-[0.88fr_1.12fr]" : ""}`}>
              <div className="rounded-[1.5rem] border border-black/6 bg-white p-4 shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
                <div className="overflow-hidden rounded-[1.2rem] bg-[#d7dfd8]">
                  <img src={member.photo} alt={member.name} className={`w-full object-cover ${isLongBio ? "h-[420px]" : "h-[360px]"}`} />
                </div>

                <div className="px-2 pb-2 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#17301d]">{member.name}</p>
                      {member.displayRole || member.role ? <p className="mt-1 text-sm text-[#4f5d53]">{member.displayRole || member.role}</p> : null}
                    </div>
                    {member.department ? (
                      <span className="rounded-full bg-[#eef6dd] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2e673b]">
                        {member.department}
                      </span>
                    ) : null}
                  </div>

                  {!isLongBio ? (
                    <div className="mt-5 space-y-3 text-sm leading-7 text-[#37443b]">
                      <p className="font-medium text-[#2e673b]">{labels.summary}</p>
                      <p>{member.bio || labels.empty}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              {isLongBio ? (
                <div className="rounded-[1.5rem] border border-black/6 bg-white p-5 shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2e673b]">{labels.summary}</p>
                    <span className="h-6 w-20 rounded-md bg-[#efe3bf]/80 shadow-sm" />
                  </div>
                  <div className="max-h-[430px] overflow-y-auto pr-2 text-sm leading-7 text-[#37443b]">
                    <p>{member.bio || labels.empty}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
