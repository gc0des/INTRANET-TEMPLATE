import { CheckCircle2 } from "lucide-react";
import { appAssets } from "../assets";

const TEMPLATE_SERVICES = [
  { id: "platform", name: "platform", logo: appAssets.primaryApp, description: "Replace this card with the status source for your primary internal platform." },
  { id: "communications", name: "communications", logo: appAssets.collaborationApp, description: "Use this slot for phone, chat, or communication systems used by your team." },
  { id: "workflow", name: "workflow", logo: appAssets.workflowApp, description: "Track automation, CRM, or workflow tools that support your operation." },
];

export function SystemStatusWidget({ labels }) {
  const names = labels.services ?? {};

  return (
    <div className="clean-panel rounded-[1.75rem] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--usa-primary)" }}>{labels.eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold" style={{ color: "var(--usa-heading)" }}>{labels.title}</h3>
      <p className="mt-2 text-sm leading-7" style={{ color: "var(--usa-muted)" }}>{labels.description}</p>
      <div className="mt-5 space-y-4">
        {TEMPLATE_SERVICES.map((service) => (
          <div key={service.id} className="rounded-[1.5rem] border p-4" style={{ borderColor: "var(--usa-border)", backgroundColor: "var(--usa-panel-soft)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <img src={service.logo} alt={names[service.name] ?? service.name} className="h-12 w-12 shrink-0 rounded-xl border object-cover" style={{ borderColor: "var(--usa-border)" }} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold leading-tight" style={{ color: "var(--usa-primary)" }}>{names[service.name] ?? service.name}</h3>
                  <p className="mt-2 text-base font-semibold leading-tight" style={{ color: "#22c55e" }}>{labels.operational}</p>
                </div>
              </div>
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dcfce7]"><CheckCircle2 size={20} style={{ color: "#22c55e" }} /></span>
            </div>
            <p className="mt-4 text-sm" style={{ color: "var(--usa-muted)" }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
