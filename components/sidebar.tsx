import { Folder, showSidebarAtom, storageAtom } from "@/app/utils/storage";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
	const [storage, setStorage] = useAtom(storageAtom);
	const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

	return (
		<aside
			className={`fixed right-14 transition-all  flex flex-col w-[200px] h-screen bg-slate-100 ${
				showSidebar ? "translate-x-0" : "translate-x-full"
			}`}
		>
			{storage?.map((folder) => (
				<div className="flex flex-col gap-2 transition-all">
					<FolderGroup folder={folder} />
				</div>
			))}
		</aside>
	);
}

function FolderGroup(props: { folder: Folder }) {
	const { folder } = props;
	const [storage, setStorage] = useAtom(storageAtom);
	const [showFiles, setShowFiles] = useState(true);
	const [showCreateInput, setShowCreateInput] = useState(false);
	const [input, setInput] = useState("");

	const handleCreateFile = () => {
		if (!input || !storage) return;
		console.log("Creating file", input);
		const newStorage = storage.map((f) => {
			if (f.name === folder.name) {
				return {
					...f,
					files: [
						...f.files,
						{
							name: input,
							content: "",
						},
					],
				};
			}
			return f;
		});
		setStorage(newStorage);
		setShowCreateInput(false);
		setInput("");
	};

	return (
		<div className="flex flex-col select-none text-sm ">
			<div
				onClick={() => setShowFiles(!showFiles)}
				className="flex items-center gap-3 px-3 py-1 cursor-pointer hover:bg-gray-500/10 group	"
			>
				<i
					className={`far fa-chevron-right ${
						showFiles ? "rotate-90" : ""
					} transition-all`}
				/>
				<span>{folder.name}</span>
				<div className="absolute right-4 hidden group-hover:flex ">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setShowCreateInput(true);
						}}
						className="px-1 aspect-square text-xs cursor-pointer"
					>
						<i className="far fa-plus" />
					</button>
				</div>
			</div>
			<div
				className={`flex flex-col ${showFiles ? "" : "h-0 invisible"}`}
			>
				{folder?.files.map((file, i) => (
					<Link
						key={i}
						href={`/file/${file.name}`}
						className="flex items-center gap-2 px-3 py-1 pl-8 hover:bg-gray-500/10"
					>
						<i className="far fa-file text-slate-700" />
						<span>{file.name}</span>
					</Link>
				))}
				{!!showCreateInput && (
					<div className="flex gap-2 items-center px-3 py-1 pl-8">
						<i className="far fa-file text-slate-700" />
						<input
							onChange={(e) => setInput(e.target.value)}
							type="text"
							className="w-full h-full outline-none border-none"
							placeholder="File name"
						/>
						<div className="flex gap-2">
							{[
								{
									name: "Create",
									onClick: handleCreateFile,
									icon: "check",
								},
								{
									name: "Cancel",
									onClick: () => {
										setInput("");
										setShowCreateInput(false);
									},
									icon: "times",
									className: "hover:text-red-500",
								},
							].map((actionBtn, i) => (
								<div key={i}>
									<button
										onClick={actionBtn.onClick}
										className={`transition-all text-gray-800 hover:text-black ${actionBtn.className}`}
									>
										<i
											className={`far fa-${actionBtn.icon}`}
										/>
									</button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
