export type StoryOption = {
  type: "preset" | "custom";
  label: string;
};

export type StyleOption = {
  name: string;
  image: string;
};

export const storyOptions: StoryOption[] = [
  { type: "preset", label: "Adventure Story" },
  { type: "preset", label: "Funny Story" },
  { type: "preset", label: "Scary Story" },
  { type: "preset", label: "Inspirational Story" },
  { type: "preset", label: "Romantic Story" },
  { type: "preset", label: "Sci-Fi Story" },
  { type: "preset", label: "Thriller Story" },
  { type: "custom", label: "Custom Prompt" },
];

export const styleOptions: StyleOption[] = [
  { name: "Artistic", image: "/shortVideoGen/styleOptions/artistic.jpg" },
  { name: "Realistic", image: "/shortVideoGen/styleOptions/realistic.jpg" },
  { name: "Fantasy", image: "/shortVideoGen/styleOptions/fantasy.jpg" },
  { name: "Dark", image: "/shortVideoGen/styleOptions/dark.jpg" },
  { name: "Water color", image: "/shortVideoGen/styleOptions/watercolor.jpg" },
  { name: "GTA", image: "/shortVideoGen/styleOptions/gta.png" },
  { name: "comic", image: "/shortVideoGen/styleOptions/comic.png" },
  { name: "Paint", image: "/shortVideoGen/styleOptions/paint.jpg" },
];
