export interface SidebarLink {
  label: string;
  href: string;
}

export const sidebarLinks: SidebarLink[] = [
  { label: "Home", href: "/" },
  { label: "Install App", href: "/sidebar/pwa-install" },
  { label: "User Guide", href: "/sidebar/userguide" },
  { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029VbBp3dD3bbV9jFXPdd29" },
  { label: "Bug & Discussion", href: "/sidebar/bugandfeature" },
  { label: "Terms & Conditions", href: "/sidebar/terms" },
];
