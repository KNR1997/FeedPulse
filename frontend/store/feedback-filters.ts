import { atom } from "jotai";

export const feedbackCategoryAtom = atom<string>("");
export const feedbackStatusAtom = atom<string>("");
export const feedbackPageAtom = atom<number>(1);
