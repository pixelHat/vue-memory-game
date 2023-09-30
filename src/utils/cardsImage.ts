import { range } from "lodash-es";

interface CardImage {
  component: "p" | "font-awesome-icon";
  icon: string;
  text: string;
  name: string;
}

export const NUMBERS: CardImage[] = range(1, 9).map((number) => ({
  name: number.toString(),
  component: "p",
  text: number.toString(),
  icon: "",
}));

const icons = [
  "fa-solid fa-user-secret",
  "fa-solid fa-house",
  "fa-solid fa-dog",
  "fa-solid fa-bone",
  "fa-solid fa-map-pin",
  "fa-solid fa-map",
  "fa-solid fa-truck-fast",
  "fa-solid fa-mug-hot",
  "fa-solid fa-ghost",
  "fa-solid fa-poo",
  "fa-solid fa-gift",
  "fa-solid fa-gear",
  "fa-solid fa-trash",
  "fa-solid fa-lock",
  "fa-solid fa-tag",
  "fa-solid fa-video",
  "fa-solid fa-camera",
  "fa-solid fa-fire",
];
export const ICONS: CardImage[] = icons.map((icon, index) => ({
  name: (index + 1).toString(),
  component: "font-awesome-icon",
  text: "",
  icon: `fa-solid ${icon}`,
}));
