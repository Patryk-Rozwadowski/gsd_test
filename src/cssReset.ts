import { css } from "@emotion/react";
import emotionReset from "emotion-reset";

const cssReset = [
	css`
		*,
		*::after,
		*::before {
			box-sizing: border-box;
			-moz-osx-font-smoothing: grayscale;
			-webkit-font-smoothing: antialiased;
			font-smoothing: antialiased;
		}
	`,
	emotionReset,
];

export { cssReset };
