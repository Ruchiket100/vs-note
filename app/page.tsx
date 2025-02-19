"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { debounce, set } from "lodash";
import Sidebar from "@/components/sidebar";
import { useAtom } from "jotai";
import { showSidebarAtom, storageAtom } from "./utils/storage";

export default function Home() {
	const editorRef = useRef<any>(null);
	const [content, setContent] = useState("Hello World");
	const [lineHeight, setLineHeight] = useState(26);
	const [lines, setLines] = useState([1]);
	const lineNumbersRef = useRef<HTMLDivElement>(null);
	const [storage, setStorage] = useAtom(storageAtom);
	const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

	const handleCursorMove = () => {
		const selection = window.getSelection();
		if (!selection) return;
		if (!selection.rangeCount) return;

		const range = selection.getRangeAt(0);
		const cursorTop = range.getBoundingClientRect().top;
		const editorTop = editorRef.current?.getBoundingClientRect()?.top;
		const scrollTop = editorRef.current?.scrollTop;

		// Calculate current line
		const currentLine =
			Math.floor((cursorTop - editorTop + scrollTop) / lineHeight) + 1;
		if (currentLine > Math.max(...lines))
			setLines(Array.from({ length: currentLine }, (_, i) => i + 1));
		console.log("Current line:", currentLine); // Optional: Highlight current line
	};

	const updateLineNumbers = () => {
		if (!editorRef.current) return;

		// Get total lines based on scroll height and line height
		const totalLines = Math.ceil(
			editorRef.current.scrollHeight / lineHeight
		);
		setLines(Array.from({ length: totalLines }, (_, i) => i + 1));

		// Sync scroll position
		if (lineNumbersRef.current) {
			lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
		}
	};

	const debouncedUpdate = debounce(updateLineNumbers, 100);

	return (
		<div className="flex">
			<Sidebar />

			<div
				className="flex flex-col text-end gap-[2px] w-[60px] p-4 h-screen text-amber-900/30 font-medium bg-amber-50"
				ref={lineNumbersRef}
			>
				{lines.map((line) => (
					<span>{line}</span>
				))}
			</div>
			<ContentEditable
				onKeyUp={handleCursorMove}
				onClick={handleCursorMove}
				className="flex-1 p-4 outline-none max-h-screen h-full text-lg/6.5"
				innerRef={editorRef as any}
				html={content}
				onChange={(e) => {
					setContent(e.target.value);
					// debouncedUpdate();
				}}
			/>
			<button onClick={() => console.log(storage)}>Hello World</button>
			<aside className=" bg-amber-100 h-screen flex flex-col z-20">
				<span
					onClick={() => setShowSidebar(!showSidebar)}
					className="p-4 flex items-center hover:bg-amber-200/30 text-2xl text-amber-950 cursor-pointer"
				>
					<i className="fa-light fa-files" />
				</span>
				<span className="p-4 flex items-center hover:bg-amber-200/30 text-2xl text-slate-700">
					<i className="fa-light fa-gear" />
				</span>
			</aside>
			<div className="fixed bottom-0 bg-yellow-200 py-1 w-full px-4 text-sm">
				characters
			</div>
		</div>
	);
}
