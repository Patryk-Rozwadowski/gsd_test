interface ITheme {
	colors: {
		accent: string;
		accentLight: string;
		dark: string;
		border: string;
		inactive: string;
		separator: string;
	};
	styles: {
		boxShadow: string;
		borderRadius: string;
		transitionTime: string;
	};
}

export type { ITheme };
