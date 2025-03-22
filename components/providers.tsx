"use client";

import { storageAtom } from "@/app/utils/storage";
import { setTheme, Themes, useThemeDetector } from "@/app/utils/theme";
import { Provider, useAtom, useStore } from "jotai";
import { useEffect } from "react";

export default function Providers(props: { children: React.ReactNode }) {
	const { children } = props;
	const [storage, setStorage] = useAtom(storageAtom);
	const store = useStore();

	const isDark = false;

	const setDefaultTheme = () => {
		const theme = {
			content: isDark ? Themes[1] : Themes[0],
		};

		setTheme(theme);
	};

	useEffect(() => {
		setDefaultTheme();
	}, [isDark]);

	useEffect(() => {
		if (!!storage) return;
		setStorage([
			{
				name: "*",
				files: [
					{
						name: "Title Here",
						content: "content",
					},
				],
			},
			{
				name: "Today",
				files: [
					{
						name: "Untitled",
						content: "content",
					},
				],
			},
		]);
	}, []);

	return <Provider store={store}>{children}</Provider>;
}
