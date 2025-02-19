import {atom} from "jotai"

type File = {
    name: string;
    content: string;
}

export type Folder = {
    name: string;
    files: File[];
}

export const storageAtom = atom<Folder[] | null>(null);
export const showSidebarAtom = atom<boolean>(true);


// what we need -
// 0 - sidebar -  folder list - create folder - create file 
// 1 - editor - title - content
// 3 - statbar - word count - character count - line count
// 4 - settings panel - custom fonts - custom themes - custom font size