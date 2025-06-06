import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/dashboard",
        items: [],
      },
      {
        title: "Shipments",
        url: "/dashboard/shipments",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Update Shipment",
        url: "/dashboard/update-status",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Icons.User,
        items: [],
      },
    ],
  },
];
