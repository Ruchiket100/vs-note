"use client";

import { storageAtom } from "@/app/utils/storage";
import { Provider, useAtom, useStore } from "jotai";
import { useEffect } from "react";

export default function Providers(props: { children: React.ReactNode }) {
	const { children } = props;
	const [storage, setStorage] = useAtom(storageAtom);
	const store = useStore();
	useEffect(() => {
		if (!!storage) return;
		setStorage([
			{
				name: "*",
				files: [
					{
						name: "Untitled",
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
