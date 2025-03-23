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

		if (lineNumbersRef.current) {
			lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
		}
	};

	const debouncedUpdate = debounce(updateLineNumbers, 100);

	return (
		<div className="flex h-full w-full bg-primary">
			{/* <Sidebar /> */}

			<div
				className="flex bg-secondary h-full rounded-lg shadow-sm flex-col text-end gap-[2px] w-[60px] p-4  text-secondaryFont/50 font-medium border-r border-border"
				ref={lineNumbersRef}
			>
				{lines.map((line) => (
					<span>{line}</span>
				))}
			</div>
			<ContentEditable
				onKeyUp={handleCursorMove}
				onClick={handleCursorMove}
				className="flex-1 p-4 outline-none  bg-secondary shadow-sm h-full rounded-lg text-lg/6.5"
				innerRef={editorRef as any}
				html={content}
				onChange={(e) => {
					setContent(e.target.value);
					// debouncedUpdate();
				}}
			/>
			{/* <aside className=" bg-accent h-screen flex flex-col z-20">
				<span
					onClick={() => setShowSidebar(!showSidebar)}
					className="p-4 flex items-center hover:bg-accentActive text-2xl text-primaryFont cursor-pointer"
				>
					<i className="fa-light fa-files" />
				</span>
				<span className="p-4 flex items-center hover:bg-accentActive text-2xl text-primaryFont">
					<i className="fa-light fa-gear" />
				</span>
			</aside>
			<div className="fixed bottom-0 bg-accent py-1 w-full px-4 text-sm">
				characters
			</div> */}
		</div>
	);
}
