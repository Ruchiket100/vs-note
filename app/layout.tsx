import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "VS Notes",
	description: "A simple note-taking app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://cdn.jsdelivr.net/gh/Ruchiket100/fontawesome-pro@master/fontawesome-pro-6.5.1-web/css/all.css"
					rel="stylesheet"
					type="text/css"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary text-primaryFont select-text`}
			>
				<Providers>
					<div className="flex flex-col h-screen justify-between">
						<div className=" mx-4 my-2 h-full flex gap-4 relative">
							<div className="w-[80vw] h-full flex-1">
								{children}
							</div>
							<div className="w-[15vw] h-full rounded-lg bg-red-500">
								fdskl
							</div>
							<div className="w-[4vw] h-full rounded-lg bg-red-500">
								fdskl
							</div>
						</div>
						<footer className="bg-accent flex mx-4 my-2 h-[3vh] mb-4 z-50 rounded-full">
							fsdf
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
