import brandIcon from "./brand-icon.svg";
import brandMark from "./brand-mark.svg";
import appPlaceholder from "./apps/app-placeholder.svg";

import enUsFlag from "./flags/en-us.png";
import esMxFlag from "./flags/es-mx.png";
import ptBrFlag from "./flags/pt-br.png";

const teamPhotoModules = import.meta.glob("./team/*", { eager: true, import: "default" });

export const brandingAssets = { brandIcon, brandMark };
export const appAssets = { primaryApp: appPlaceholder, collaborationApp: appPlaceholder, knowledgeApp: appPlaceholder, analyticsApp: appPlaceholder, workflowApp: appPlaceholder };
export const flagAssets = { enUsFlag, esMxFlag, ptBrFlag };
export const documentAssets = { workbook: "#" };
export const newsletterAssets = {};
export const trainingAssets = {};

export function resolveTeamPhoto(pathOrFilename = "") {
  const filename = String(pathOrFilename).split("/").pop();
  return teamPhotoModules[`./team/${filename}`] ?? brandIcon;
}
