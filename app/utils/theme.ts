"use client"
import { useEffect, useState } from "react";

export const Themes  = [
    {
        name: "light",
        type: "light",
        scheme: {
            accent: "#68C7E6",
            accentActive: "#68C7E7",
            primary: "#F3F3F3",
            primaryFont: "#000000",
            secondary: "#ffffff",
            secondaryFont: "#686868",
            opaque: "rgba(104,104,104,0.3)",
            opaqueActive: "rgba(104,104,104,0.5)",
            shadow: "#E2E2E2",
            border: "#ECECEC"
        }
    }
    ,
    {
        name: "dark",
        type: "dark",
        scheme: {
            accent: "#697565",
            accentActive: "#7D9D72",
            primary: "#1B1F18",
            primaryFont: "#ffffff",
            secondary: "#3D4338",
            secondaryFont: "#DCDCDC",
            opaque: "rgba(104,104,104,0.3)",
            opaqueActive: "rgba(104,104,104,0.5)",
            shadow: "#E2E2E2",
            border: "#ECECEC"
        }
    }
]

export const setTheme = (data: any) => {
    const theme = data.content.scheme;
    for(const property in theme){
        document.documentElement.style.setProperty(`--note-${property}`, theme[property]);
    }
}

export const useThemeDetector = () => {
    const getCurrentTheme = () =>
        window?.matchMedia("(prefers-color-scheme: dark)")?.matches;
    const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
    const mqListener = (e: any) => {
        setIsDarkTheme(e.matches);
    };

    useEffect(() => {
        setIsDarkTheme(getCurrentTheme());
        const darkThemeMq = window?.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addListener(mqListener);
        return () => darkThemeMq.removeListener(mqListener);
    }, []);
    return isDarkTheme;
};
