"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { HomeIcon, Menu, Plus, Settings, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface WordItem {
  word: string;
  definition: string;
}

export default function Home() {
  const [position, setPosition] = useState("random");
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
      toast.success("Another word enters the Hall of Knowledge! 🏛️");
    }
  };
  // const deleteWord = (index: number) => {
  //   const updatedWords = words.filter((_, i) => i !== index);
  //   setWords(updatedWords);
  //   localStorage.setItem("words", JSON.stringify(updatedWords));
  //   toast.error("Poof! That word just vanished into the void. 🚀");
  // };
  console.log(currentIndex);

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <main className="flex-1 relative">
        <div
          className="fixed inset-0 overflow-y-auto snap-y snap-mandatory"
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
          {words.length == 0 ? (
            <div className="h-full w-full p-4 flex justify-center items-center">
              <p className="text-2xl text-gray-400 font-openSans">
                The void is empty... for now. Add some words to bring it to
                life! ✨
              </p>
            </div>
          ) : (
            words.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="h-screen flex items-center justify-center snap-start px-4 cursor-pointer"
                onClick={() => toggleDefinition(index)}
              >
                <div className="max-w-md border-2 rounded-3xl border-gray-400 p-1  h-[65%] flex items-center justify-center w-full space-y-4 text-center">
                  {visibleDefinitions[index] ? (
                    <p className="text-xl text-gray-300 font-opensans">
                      {item.definition}
                    </p>
                  ) : (
                    <h1 className="text-4xl font-bold font-poppins">
                      {item.word}
                    </h1>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <div className="fixed top-0 left-0 right-0 border-b border-white/10 bg-[#121212]/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-2 mx-auto ">
          <p className="font-poppins font-semibold text-2xl pl-2">Flashcards</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-12 h-12">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-white bg-[#121212] border-white/10 mt-1">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="random">
                  Sort randomly
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="byDate">
                  Sort by date
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#121212]/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-2 mx-auto ">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <HomeIcon className="h-6 w-6" />
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-neutral-900"
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
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400 font-opensans"
                  />
                  <Input
                    placeholder="Enter definition"
                    value={newDefinition}
                    onChange={(e) => setNewDefinition(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400 font-opensans"
                  />
                </div>
                <div className="pt-6 pb-4 space-y-4">
                  <Button
                    onClick={addWord}
                    className="w-full bg-white text-black hover:bg-white/90 font-poppins"
                  >
                    Add Word
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full border border-white/10 font-poppins"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
