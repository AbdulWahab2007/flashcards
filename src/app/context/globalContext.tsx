"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface Word {
  word: string;
  definition: string;
  tags: string[];
  index: number;
}

interface WordsContextType {
  words: Word[];
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
  displayedWords: Word[];
  setDisplayedWords: React.Dispatch<React.SetStateAction<Word[]>>;
  addWord: (word: string, definition: string, tags: string[]) => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isSystem: boolean;
  setIsSystem: React.Dispatch<React.SetStateAction<boolean>>;
}
const WordsContext = createContext<WordsContextType | undefined>(undefined);

export function WordsProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [displayedWords, setDisplayedWords] = useState<Word[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystem, setIsSystem] = useState(false);

  useEffect(() => {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
      setWords(JSON.parse(storedWords));
      setDisplayedWords(JSON.parse(storedWords));
    }
  }, []);
  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const storedTheme = localStorage.getItem("theme");

      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
        setIsSystem(false);
      } else if (storedTheme === "light") {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
        setIsSystem(false);
      } else {
        const isSystemDark = systemPrefersDark.matches;
        document.documentElement.classList.toggle("dark", isSystemDark);
        setIsDarkMode(isSystemDark);
        setIsSystem(true);
      }
    };
    applyTheme();
    const systemThemeChangeHandler = (e: MediaQueryListEvent) => {
      if (isSystem) {
        document.documentElement.classList.toggle("dark", e.matches);
        setIsDarkMode(e.matches);
      }
    };

    systemPrefersDark.addEventListener("change", systemThemeChangeHandler);

    return () => {
      systemPrefersDark.removeEventListener("change", systemThemeChangeHandler);
    };
  }, [isSystem]);
  const addWord = (
    newWord: string,
    newDefinition: string,
    newTags: string[]
  ) => {
    if (newWord && newDefinition && newTags.length > 0) {
      const updatedWords = [
        ...words,
        {
          word: newWord,
          definition: newDefinition,
          tags: newTags,
          index: words.length,
        },
      ];
      setWords(updatedWords);
      setDisplayedWords(updatedWords);
      localStorage.setItem("words", JSON.stringify(updatedWords));

      toast.success("Another word enters the Hall of Knowledge! 🏛️");
    }
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        setWords,
        displayedWords,
        setDisplayedWords,
        addWord,
        isDarkMode,
        setIsDarkMode,
        isSystem,
        setIsSystem,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}
export function useWords() {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error("useWords must be used within a WordsProvider");
  }
  return context;
}
