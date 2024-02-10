import auth from "../services/auth";

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
  // {
  //   label: "Shops",
  //   children: [
  //     {
  //       label: "View Shops & Products",
  //       subLabel: "View all online shops & their products",
  //       href: "/shops",
  //     },
  //     {
  //       label: "Create Your Online Shop",
  //       subLabel: "Increase your visibility online",
  //       href: "/shops/new",
  //     },
  //   ],
  // },
  // {
  //   label: "Listings",
  //   children: [
  //     {
  //       label: "View Listings",
  //       subLabel: "View all created listings",
  //       href: "/listings",
  //     },
  //     {
  //       label: "Create a new listing",
  //       subLabel: "Do you have an item you don't need anymore?",
  //       href: "/listings/new",
  //     },
  //   ],
  // },
  {
    label: "Events",
    href: "/events",
  },
];

const AboutApp: NavItem = {
  label: "Info",
  href: "/about-app",
};

const OrdersNavItem: NavItem = {
  label: "Orders",
  children: [
    {
      label: "View My Orders",
      subLabel: "View orders you made to other shops",
      href: "/orders/my",
    },
    {
      label: "View Shops Orders",
      subLabel: "View orders made to your shops",
      href: "/orders/my-shops",
    },
  ],
};

export const getNavItems = (): NavItem[] => {
  const authenticated = auth.getCurrentUser()
    ? [
        ...NAV_ITEMS,
        // OrdersNavItem
      ]
    : NAV_ITEMS;

  return [...authenticated, AboutApp];
};
