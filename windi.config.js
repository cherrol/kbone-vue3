import { defineConfig } from "windicss/helpers";

export default defineConfig({
	extract: {
		// A common use case is scanning files from the root directory
		include: ["src/**/*.vue"],
		// if you are excluding files, make sure you always include node_modules and .git
		exclude: ["node_modules", ".git", "dist"]
	},
	theme: {
		extend: {
			colors: {
				primary: "var(--van-primary-color)",
				success: "var(--van-success-color)",
				danger: "var(--van-danger-color)",
				warning: "var(--van-warning-color)",
				black: "var(--van-black)",
				white: "var(--van-white)"
			},
			spacing: {
				base: "var(--van-padding-base)",
				xs: "var(--van-padding-xs)",
				sm: "var(--van-padding-sm)",
				md: "var(--van-padding-md)",
				lg: "var(--van-padding-lg)",
				xl: "var(--van-padding-xl)",
				"2xl": "var(--van-padding-2xl)"
			},
			borderColor: {
				base: "var(--van-border-color)",
				primary: "var(--van-primary-color)",
				success: "var(--van-success-color)",
				danger: "var(--van-danger-color)",
				warning: "var(--van-warning-color)",
				black: "var(--van-black)",
				white: "var(--van-white)"
			},
			borderRadius: {
				sm: "var(--van-border-radius-sm)",
				md: "var(--van-border-radius-md)",
				lg: "var(--van-border-radius-lg)",
				max: "var(--van-border-radius-max)"
			},
			borderWidth: {
				base: "var(--van-border-width-base)",
				sm: "var(--van-border-width-sm)",
				md: "var(--van-border-width-md)"
			},
			textColor: {
				color: "var(--van-text-color)",
				light: "var(--van-text-color-2)",
				lighter: "var(--van-text-color-3)",
				primary: "var(--van-primary-color)",
				success: "var(--van-success-color)",
				danger: "var(--van-danger-color)",
				warning: "var(--van-warning-color)",
				black: "var(--van-black)",
				white: "var(--van-white)"
			},
			fontSize: {
				xs: "var(--van-font-size-xs)",
				sm: "var(--van-font-size-sm)",
				md: "var(--van-font-size-md)",
				lg: "var(--van-font-size-lg)"
			},
			fontFamily: {
				base: "var(--van-base-font-family)",
				number: "var(--van-price-integer-font-family)"
			},
			backgroundColor: {
				color: "var(--van-background-color)",
				light: "var(--van-background-color-light)",
				primary: "var(--van-primary-color)",
				success: "var(--van-success-color)",
				danger: "var(--van-danger-color)",
				warning: "var(--van-warning-color)",
				black: "var(--van-black)",
				white: "var(--van-white)"
			}
		}
	}
});
