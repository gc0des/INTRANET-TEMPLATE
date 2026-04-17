import { flagAssets } from "../assets";
import { sanitizeDeep } from "./text.utils";

export const LANGUAGE_STORAGE_KEY = "company-language";

const rawLanguages = [
  { code: "en", flag: flagAssets.enUsFlag, label: "English" },
  { code: "pt-BR", flag: flagAssets.ptBrFlag, label: "Português (Brasil)" },
  { code: "es", flag: flagAssets.esMxFlag, label: "Español" },
];

export const languages = sanitizeDeep(rawLanguages);

export function translateRole(member) {
  return member.role;
}

const rawTranslations = {
  en: {
    common: {
      toggleSidebar: "Toggle sidebar",
      closeModal: "Close modal",
      openPolaroid: "Open Polaroid",
      buildLabel: "Build",
      footerCopyright: "Copyright © 2026 Company. All rights reserved.",
      footerDevelopedBy: "Developed as a reusable intranet template.",
      presenceStatuses: { available: "Available", lunch: "Lunch", busy: "Busy", away: "Away", offline: "Offline" },
    },
    sidebar: {
      brandEyebrow: "Internal Network",
      brandName: "Company",
      nav: { home: "Home", dashboard: "Dashboard", applications: "Applications", mural: "HR Mural", newsletter: "Newsletter", team: "Team Members", legalUpdates: "Legal Updates", trainings: "Trainings", policies: "Policies and Procedures" },
    },
    top: {
      workspace: "Company Workspace",
      language: "Language",
      authLabel: "Account",
      status: "Status",
      signOut: "Sign out",
      theme: { light: "Light mode", dark: "Dark mode", switchToLight: "Switch to light mode", switchToDark: "Switch to dark mode" },
    },
    login: {
      secureAccess: "Protected access",
      brandEyebrow: "Secure company access",
      title: "Company Intranet Template",
      description: "Use this entry screen as a placeholder for your authentication flow before entering the intranet.",
      allowedDomainEyebrow: "Allowed domain",
      allowedDomainDescription: "Use this area to explain access rules, identity providers, or internal security guidelines.",
      accessEyebrow: "Internal environment",
      accessTitle: "Restricted access",
      accessDescription: "This entry screen demonstrates how a protected intranet can start before loading the internal workspace.",
      footerNote: "Replace the sample Login action with the authentication method used by your organization.",
      loginEyebrow: "Authentication",
      loginTitle: "Continue to the intranet",
      loginDescription: "Use the sample Login button to enter the intranet during testing, then replace it with your own authentication flow.",
      loading: "Loading sign-in...",
      invalidDomain: "Access denied. Please use an approved account.",
      unexpectedError: "We could not validate your sign-in. Please try again.",
                },
    pages: {
      home: { eyebrow: "Overview", title: "Welcome to your company intranet", description: "Use this template as a starting point for internal communication, systems, and team visibility." },
      dashboard: { eyebrow: "Quick Links", title: "Operational dashboard", description: "Replace these cards with the sections and shortcuts your team uses every day." },
      applications: { eyebrow: "Systems", title: "Applications", description: "List the internal tools and external platforms your team depends on." },
      mural: { eyebrow: "People", title: "HR Mural", description: "Share announcements, birthday highlights, and important updates here." },
      newsletter: { eyebrow: "Updates", title: "Newsletter", description: "Publish recurring company updates, leadership notes, or weekly summaries." },
      team: { eyebrow: "Directory", title: "Team Members", description: "Maintain an internal directory with photos, roles, and short biographies." },
      legal: { eyebrow: "Compliance", title: "Legal Updates", description: "Use this section for legal resources, compliance notices, or policy alerts." },
      trainings: { eyebrow: "Learning", title: "Trainings", description: "Organize internal manuals, onboarding content, and recorded sessions." },
      policies: { eyebrow: "Guidelines", title: "Policies and Procedures", description: "Store internal procedures, handbooks, and operational standards." },
    },
    systemStatus: {
      eyebrow: "Monitoring",
      title: "System Status",
      description: "Track the operational state of the core platforms used by your company.",
      operational: "Operational",
      services: { platform: "Primary Platform", communications: "Communications", workflow: "Workflow Automation" },
    },
  },
  "pt-BR": {
    common: {
      toggleSidebar: "Alternar sidebar",
      closeModal: "Fechar modal",
      openPolaroid: "Abrir Polaroid",
      buildLabel: "Build",
      footerCopyright: "Copyright © 2026 Company. All rights reserved.",
      footerDevelopedBy: "Desenvolvido como template reutilizável de intranet.",
      presenceStatuses: { available: "Disponível", lunch: "Almoço", busy: "Ocupado", away: "Ausente", offline: "Offline" },
    },
    sidebar: {
      brandEyebrow: "Rede Interna",
      brandName: "Company",
      nav: { home: "Home", dashboard: "Dashboard", applications: "Aplicações", mural: "Mural de RH", newsletter: "Newsletter", team: "Team Members", legalUpdates: "Atualizações Jurídicas", trainings: "Treinamentos", policies: "Policies and Procedures" },
    },
    top: {
      workspace: "Workspace da empresa",
      language: "Idioma",
      authLabel: "Conta",
      status: "Status",
      signOut: "Sair",
      theme: { light: "Modo claro", dark: "Modo escuro", switchToLight: "Trocar para modo claro", switchToDark: "Trocar para modo escuro" },
    },
    login: {
      secureAccess: "Acesso protegido",
      brandEyebrow: "Acesso seguro da empresa",
      title: "Template de Intranet",
      description: "Use esta tela de entrada como placeholder para o seu fluxo de autenticação antes de entrar na intranet.",
      allowedDomainEyebrow: "Domínio permitido",
      allowedDomainDescription: "Use esta área para explicar regras de acesso, provedores de identidade ou diretrizes internas de segurança.",
      accessEyebrow: "Ambiente interno",
      accessTitle: "Acesso restrito",
      accessDescription: "Esta tela de entrada demonstra como uma intranet protegida pode começar antes de carregar o workspace interno.",
      footerNote: "Substitua a ação do botão Login pelo método de autenticação usado pela sua organização.",
      loginEyebrow: "Autenticação",
      loginTitle: "Continuar para a intranet",
      loginDescription: "Use o botão Login de exemplo para entrar na intranet durante os testes e depois substitua-o pelo seu fluxo de autenticação.",
      loading: "Carregando login...",
      invalidDomain: "Acesso negado. Use uma conta corporativa aprovada.",
      unexpectedError: "Não foi possível validar seu login. Tente novamente.",
                },
    pages: {
      home: { eyebrow: "Visão geral", title: "Bem-vindo à intranet da sua empresa", description: "Use este template como ponto de partida para comunicação interna, sistemas e visibilidade do time." },
      dashboard: { eyebrow: "Atalhos", title: "Dashboard operacional", description: "Substitua estes cards pelas áreas e acessos rápidos que seu time usa todos os dias." },
      applications: { eyebrow: "Sistemas", title: "Aplicações", description: "Liste as ferramentas internas e plataformas externas essenciais para o trabalho diário." },
      mural: { eyebrow: "Pessoas", title: "Mural de RH", description: "Compartilhe anúncios, aniversários e atualizações importantes aqui." },
      newsletter: { eyebrow: "Atualizações", title: "Newsletter", description: "Publique comunicados recorrentes, resumos semanais ou mensagens de liderança." },
      team: { eyebrow: "Diretório", title: "Team Members", description: "Mantenha um diretório interno com fotos, cargos e biografias curtas." },
      legal: { eyebrow: "Compliance", title: "Atualizações Jurídicas", description: "Use esta seção para recursos jurídicos, avisos de conformidade ou alertas internos." },
      trainings: { eyebrow: "Aprendizado", title: "Treinamentos", description: "Organize manuais, onboarding e treinamentos gravados." },
      policies: { eyebrow: "Diretrizes", title: "Policies and Procedures", description: "Armazene procedimentos internos, handbooks e padrões operacionais." },
    },
    systemStatus: {
      eyebrow: "Monitoramento",
      title: "Status dos sistemas",
      description: "Acompanhe o estado operacional das principais plataformas da sua empresa.",
      operational: "Operacional",
      services: { platform: "Plataforma principal", communications: "Comunicações", workflow: "Automação de fluxo" },
    },
  },
  es: {
    common: {
      toggleSidebar: "Alternar barra lateral",
      closeModal: "Cerrar modal",
      openPolaroid: "Abrir Polaroid",
      buildLabel: "Build",
      footerCopyright: "Copyright © 2026 Company. All rights reserved.",
      footerDevelopedBy: "Desarrollado como plantilla reutilizable de intranet.",
      presenceStatuses: { available: "Disponible", lunch: "Almuerzo", busy: "Ocupado", away: "Ausente", offline: "Offline" },
    },
    sidebar: {
      brandEyebrow: "Red interna",
      brandName: "Company",
      nav: { home: "Home", dashboard: "Dashboard", applications: "Aplicaciones", mural: "Mural de RH", newsletter: "Newsletter", team: "Team Members", legalUpdates: "Actualizaciones legales", trainings: "Capacitaciones", policies: "Policies and Procedures" },
    },
    top: {
      workspace: "Workspace de la empresa",
      language: "Idioma",
      authLabel: "Cuenta",
      status: "Estado",
      signOut: "Salir",
      theme: { light: "Modo claro", dark: "Modo oscuro", switchToLight: "Cambiar a modo claro", switchToDark: "Cambiar a modo oscuro" },
    },
    login: {
      secureAccess: "Acceso protegido",
      brandEyebrow: "Acceso seguro de la empresa",
      title: "Plantilla de intranet",
      description: "Usa esta pantalla de entrada como placeholder para tu flujo de autenticación antes de entrar en la intranet.",
      allowedDomainEyebrow: "Dominio permitido",
      allowedDomainDescription: "Usa esta área para explicar reglas de acceso, proveedores de identidad o directrices internas de seguridad.",
      accessEyebrow: "Entorno interno",
      accessTitle: "Acceso restringido",
      accessDescription: "Esta pantalla de entrada demuestra cómo una intranet protegida puede comenzar antes de cargar el espacio interno.",
      footerNote: "Sustituye la acción del botón Login por el método de autenticación usado por tu organización.",
      loginEyebrow: "Autenticación",
      loginTitle: "Continuar a la intranet",
      loginDescription: "Usa el botón Login de ejemplo para entrar en la intranet durante las pruebas y luego sustitúyelo por tu propio flujo de autenticación.",
      loading: "Cargando acceso...",
      invalidDomain: "Acceso denegado. Usa una cuenta corporativa aprobada.",
      unexpectedError: "No fue posible validar tu acceso. Inténtalo de nuevo.",
                },
    pages: {
      home: { eyebrow: "Resumen", title: "Bienvenido a la intranet de tu empresa", description: "Usa esta plantilla como punto de partida para comunicación interna, sistemas y visibilidad del equipo." },
      dashboard: { eyebrow: "Accesos", title: "Dashboard operativo", description: "Reemplaza estas tarjetas por las áreas y accesos rápidos que tu equipo usa a diario." },
      applications: { eyebrow: "Sistemas", title: "Aplicaciones", description: "Enumera las herramientas internas y plataformas externas esenciales para el trabajo diario." },
      mural: { eyebrow: "Personas", title: "Mural de RH", description: "Comparte anuncios, cumpleaños y actualizaciones importantes aquí." },
      newsletter: { eyebrow: "Actualizaciones", title: "Newsletter", description: "Publica comunicados recurrentes, resúmenes semanales o mensajes de liderazgo." },
      team: { eyebrow: "Directorio", title: "Team Members", description: "Mantén un directorio interno con fotos, cargos y biografías cortas." },
      legal: { eyebrow: "Compliance", title: "Actualizaciones legales", description: "Usa esta sección para recursos legales, avisos de cumplimiento o alertas internas." },
      trainings: { eyebrow: "Aprendizaje", title: "Capacitaciones", description: "Organiza manuales, onboarding y sesiones grabadas." },
      policies: { eyebrow: "Directrices", title: "Policies and Procedures", description: "Guarda procedimientos internos, handbooks y estándares operativos." },
    },
    systemStatus: {
      eyebrow: "Monitoreo",
      title: "Estado de los sistemas",
      description: "Sigue el estado operativo de las principales plataformas de tu empresa.",
      operational: "Operativo",
      services: { platform: "Plataforma principal", communications: "Comunicaciones", workflow: "Automatización de flujo" },
    },
  },
};


export const translations = sanitizeDeep(rawTranslations);







