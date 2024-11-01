import type { Config } from "tailwindcss";
import tailwindcss_forms from "@tailwindcss/forms"
import daisyui from "daisyui"
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},

  },
  daisyui: {
    themes: ["coffee"]
  },
  plugins: [daisyui, tailwindcss_forms({ strategy: "class" })],
};
export default config;
