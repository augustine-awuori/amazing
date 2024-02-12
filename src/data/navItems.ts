export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Mart",
    href: "/shops",
  },
  {
    label: "Events",
    href: "/events",
  },
];

const AboutApp: NavItem = {
  label: "Info",
  href: "/about-app",
};

export const getNavItems = (): NavItem[] => [...NAV_ITEMS, AboutApp];
