export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  { label: "Mart", href: "/shops" },
  { label: "Events", href: "/events" },
  { label: "Chats", href: "/chats" },
  { label: "Info", href: "/about-app" },
];

export const getNavItems = (): NavItem[] => [...NAV_ITEMS];
