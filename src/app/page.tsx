"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { HomeIcon, Plus, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
interface WordItem {
  word: string;
  definition: string;
}

export default function Home() {
  const [words, setWords] = useState<WordItem[]>([]);
  const [visibleDefinitions, setVisibleDefinitions] = useState<{
    [key: number]: boolean;
  }>({});
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setCurrentIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [words]);

  useEffect(() => {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    }
  }, []);

  const toggleDefinition = (index: number) => {
    setVisibleDefinitions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addWord = () => {
    if (newWord && newDefinition) {
      const updatedWords = [
        ...words,
        { word: newWord, definition: newDefinition },
      ];
      setWords(updatedWords);
      localStorage.setItem("words", JSON.stringify(updatedWords));
      setNewWord("");
      setNewDefinition("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <div className="fixed top-0 left-0 right-0 border-b border-white/10 bg-[#121212]/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-4 mx-auto ">
          <p className="font-redhat text-2xl font-bold pl-2">Flashcards</p>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <main className="flex-1 relative">
        <div
          className="absolute inset-0 overflow-y-auto snap-y snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx global>{`
            .snap-mandatory::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {words.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="h-screen flex items-center justify-center snap-start px-4 cursor-pointer"
              onClick={() => toggleDefinition(index)}
            >
              <div className="max-w-md w-full space-y-4 text-center">
                {visibleDefinitions[index] ? (
                  <p className="text-4xl text-gray-400 font-redhat">
                    {item.definition}
                  </p>
                ) : (
                  <h1 className="text-4xl font-bold font-redhat">
                    {item.word}
                  </h1>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#121212]/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-4 mx-auto ">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <p>{currentIndex + 1 + " / " + words.length}</p>
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                className="h-14 w-14 rounded-full border-2 border-white/10"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerTitle className="hidden"></DrawerTitle>
            <DrawerContent className="bg-zinc-950 text-white h-full">
              <div className="mx-auto w-full max-w-sm p-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Enter word"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400 font-redhat"
                  />
                  <Input
                    placeholder="Enter definition"
                    value={newDefinition}
                    onChange={(e) => setNewDefinition(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400 font-redhat"
                  />
                </div>
                <div className="pt-6 pb-4 space-y-4">
                  <Button
                    onClick={addWord}
                    className="w-full bg-white text-black hover:bg-white/90 font-redhat"
                  >
                    Add Word
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full border border-white/10 font-redhat"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <Button variant="ghost" size="icon" className="h-12 w-12">
            <HomeIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
