export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Listings",
    children: [
      {
        label: "View Listings",
        subLabel: "View all created listings",
        href: "/",
      },
      {
        label: "Create a new listing",
        subLabel: "Do you have an item you don't need anymore?",
        href: "/listings/new",
      },
    ],
  },
  {
    label: "Requests",
    children: [
      {
        label: "View Requests",
        subLabel: "View all created requests",
        href: "/requests",
      },
      {
        label: "Create a new request",
        subLabel: "Ask for an item that isn't available",
        href: "/requests/new",
      },
    ],
  },
  {
    label: "Shops",
    children: [
      {
        label: "View Shops",
        subLabel: "View all online shops",
        href: "/shops",
      },
      {
        label: "Create your online shop",
        subLabel: "Increase your visibility online",
        href: "/shops/new",
      },
    ],
  },
  {
    label: "About App",
    href: "/about-app",
  },
];
