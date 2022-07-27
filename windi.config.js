import { defineConfig } from "windicss/helpers";
const spacingDefault = 20;

export default defineConfig({
	extract: {
		// A common use case is scanning files from the root directory
		include: ["src/**/*.{vue,html,jsx,tsx}"],
		// if you are excluding files, make sure you always include node_modules and .git
		exclude: ["node_modules", ".git", "dist"]
	},
	theme: {
		extend: {
			colors: {
				primary: ""
			},
			spacing: {
				xs: `${spacingDefault * 0.25}px`,
				sm: `${spacingDefault * 0.5}px`,
				md: `${spacingDefault}px`,
				lg: `${spacingDefault * 1.5}px`,
				xl: `${spacingDefault * 2}px`,
				"2xl": `${spacingDefault * 3}px`
			}
		}
	}
});
