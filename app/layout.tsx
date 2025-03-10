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
				className={`${geistSans.variable} ${geistMono.variable} antialiased `}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
