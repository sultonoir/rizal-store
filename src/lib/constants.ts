export const APP_TITLE = "Rizal Store";
export const DATABASE_PREFIX = "acme";
export const TEST_DB_PREFIX = "test_acme";
export const EMAIL_SENDER = '"Rizal Store" <noreply@acme.com>';

export enum Paths {
  Home = "/",
  Login = "/login",
  Signup = "/signup",
  Dashboard = "/dashboard",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
}

export const AdminMenulist = [
  {
    title: "Dashboard",
    path: "/dashboard",
    keybind: "⇧⌘P",
  },
  {
    title: "Chats",
    path: "/dashboard/chats",
    keybind: "⇧⌘C",
  },
  {
    title: "Products",
    path: "/dashboard/products",
    keybind: "⌘J",
  },
  {
    title: "Settings",
    path: "/dashboard/products",
    keybind: "⇧⌘S",
  },
];

export const UserMenulist = [
  {
    title: "Profile",
    path: "/profile",
    keybind: "⇧⌘P",
  },
  {
    title: "Chats",
    path: "/profile/chat",
    keybind: "⇧⌘C",
  },
  {
    title: "History",
    path: "/profile/history",
    keybind: "⌘J",
  },
  {
    title: "Wishlist",
    path: "/profile/wishlist",
    keybind: "⌘K",
  },
  {
    title: "Settings",
    path: "/profile/setting",
    keybind: "⇧⌘S",
  },
];

export const categories = [
  {
    id: "3t6w4txtsj",
    name: "t-shirt",
    description: "Comfortable and casual tops",
    subcategories: [
      {
        id: "m3crvmdfkt",
        name: "basic t-shirt",
        description: "Simple and classic T-shirt design",
      },
      {
        id: "lasyufor62",
        name: "basic oversized t-shirt",
        description: "Oversized T-shirt with a relaxed fit",
      },
      {
        id: "0jdl2nekob",
        name: "long sleeve t-shirt",
        description: "Long-sleeved T-shirt for colder weather",
      },
      {
        id: "7vrdi6rfsa",
        name: "oversized t-shirt",
        description: "Oversized T-shirt with a loose fit",
      },
    ],
  },
  {
    id: "70kf4u5ehk",
    name: "outwear",
    description: "Outerwear for protection from the elements",
    subcategories: [
      {
        id: "eoyyi0e479",
        name: "bomber jacket",
        description: "Stylish and warm bomber jacket",
      },
      {
        id: "yyayt751lu",
        name: "hoodie",
        description: "Cozy and warm hoodie for casual wear",
      },
      {
        id: "ftwrupnu8o",
        name: "jeans jacket",
        description: "Stylish and durable jeans jacket",
      },
      {
        id: "hi4j5zed8p",
        name: "sukajan",
        description: "Warm and comfortable sukajan jacket",
      },
    ],
  },
  {
    id: "avk3ss6zhy",
    name: "shirt",
    description: "Formal and elegant tops",
    subcategories: [
      {
        id: "dwzq4vz0nd",
        name: "shirt oversize",
        description: "Oversized shirt with a relaxed fit",
      },
      {
        id: "b3q2ml3r4k",
        name: "shirt basic",
        description: "Simple and classic shirt design",
      },
      {
        id: "mau3itzgeb",
        name: "shirt long-sleeved",
        description: "Long-sleeved shirt for formal occasions",
      },
      {
        id: "7qkse5b0kf",
        name: "work shirt",
        description: "Formal and professional work shirt",
      },
    ],
  },
  {
    id: "w6xhq5eynx",
    name: "accessories",
    description: "Accessories to complete your look",
    subcategories: [
      {
        id: "ey0lekflyb",
        name: "eyewear",
        description: "Stylish and protective eyewear",
      },
      {
        id: "7a4pywl451",
        name: "bags",
        description: "Stylish and functional bags",
      },
      {
        id: "53xcgwyhmw",
        name: "hats",
        description: "Stylish and protective hats",
      },
      {
        id: "846i81jrrk",
        name: "shoes",
        description: "Stylish and comfortable shoes",
      },
    ],
  },
  {
    id: "zft9t69ejg",
    name: "pants",
    description: "Comfortable and stylish bottoms",
    subcategories: [
      {
        id: "9eijkkd7jo",
        name: "cargo pants",
        description: "Functional and stylish cargo pants",
      },
      {
        id: "kbib7sxe1k",
        name: "chino pants",
        description: "Stylish and comfortable chino pants",
      },
      {
        id: "bbr4sqoalw",
        name: "denim pants",
        description: "Classic and durable denim pants",
      },
      {
        id: "pnzumf46ns",
        name: "jeans pants",
        description: "Stylish and comfortable jeans pants",
      },
    ],
  },
];

export const categoriesMobile = [
  ...categories.map((category) => ({
    id: category.id,
    name: category.name,
  })),
  ...categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
    })),
  ),
];

type StepType =
  | "success"
  | "paid"
  | "shipped"
  | "cancel"
  | "default"
  | "secondary"
  | "pending"
  | null
  | undefined;

export const Hiws = [
  {
    step: "Step 1",
    title: "Filter & Discover",
    desc: "Smart filtering and suggestions make it easy to find",
    image: "/HIW1img.png",
    type: "success" as StepType, // Explicitly cast to the expected type
  },
  {
    step: "Step 2",
    title: "Add to bag",
    desc: "Easily select the correct items and add them to the cart",
    image: "/HIW2img.png",
    type: "paid" as StepType, // Explicitly cast to the expected type
  },
  {
    step: "Step 3",
    title: "Fast shipping",
    desc: "The carrier will confirm and ship quickly to you",
    image: "/HIW3img.png",
    type: "shipped" as StepType, // Explicitly cast to the expected type
  },
  {
    step: "Step 4",
    title: "Enjoy the product",
    desc: "Have fun and enjoy your 5-star quality products",
    image: "/HIW4img.png",
    type: "cancel" as StepType, // Explicitly cast to the expected type
  },
];
