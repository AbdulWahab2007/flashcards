"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Check, FilterIcon, SearchX, SortDesc, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWords } from "@/app/context/globalContext";
interface WordItem {
  word: string;
  definition: string;
  tags: Array<string>;
  index: number;
}

export default function Home() {
  const [renderType, setRenderType] = useState("dateAsc");
  const { words, setWords, displayedWords, setDisplayedWords } = useWords();
  const [visibleDefinitions, setVisibleDefinitions] = useState<{
    [key: number]: boolean;
  }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const uniqueTags = Array.from(
    new Set(words.flatMap((word) => word.tags.map((tag) => tag.toLowerCase())))
  );
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
  }, [displayedWords]);
  const scrollToWord = (index: number) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(index);
    }
  };
  useEffect(() => {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
      const parsedWords = JSON.parse(storedWords).map(
        (word: WordItem, index: number) => ({
          word: word.word,
          definition: word.definition,
          tags: word.tags,
          index,
        })
      );
      setWords(parsedWords);
      setDisplayedWords(parsedWords);

      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.getNotifications().then((notifications) => {
            if (notifications.length > 0) {
              const notification = notifications[0];
              const wordIndex = notification.data?.wordIndex;
              notification.close();

              if (wordIndex !== undefined) {
                scrollToWord(wordIndex);
              }
            }
          });
        });
      }
    }
  }, [[setWords, setDisplayedWords]]);

  const toggleDefinition = (index: number) => {
    setVisibleDefinitions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const deleteWord = (index: number) => {
    if (words.length === 0) {
      toast.error("There's nothing to delete! 🚫");
      setIsDeleteDialogOpen(false);
      return;
    }
    const updatedWords = words
      .filter((_, i) => i !== index)
      .map((word, i) => ({ ...word, index: i }));
    setWords(updatedWords);
    setDisplayedWords(updatedWords);
    localStorage.setItem("words", JSON.stringify(updatedWords));
    toast.error("Poof! That word just vanished into the void. 🚀");
    setIsDeleteDialogOpen(false);
  };
  const shuffleArray = (arr: Array<WordItem>) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setDisplayedWords(words);
      setNoResults(false);
      return;
    }
    const searchTags = searchQuery
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag !== "");

    const filteredWords =
      searchQuery.trim() === ""
        ? words
        : words.filter((word) =>
            word.tags.some((tag) => searchTags.includes(tag.toLowerCase()))
          );

    setDisplayedWords(filteredWords);
    setNoResults(filteredWords.length === 0);
  };
  const handleSearchReset = () => {
    setDisplayedWords(words);
  };
  useEffect(() => {
    setDisplayedWords(
      renderType === "random"
        ? shuffleArray(words)
        : renderType === "dateAsc"
        ? words
        : renderType === "dateDes"
        ? [...words].reverse()
        : words
    );
  }, [renderType, words, setDisplayedWords]);
  return (
    <div className="flex flex-col min-h-screen dark:bg-backgroundDark dark:text-white">
      <main className="flex-1 relative">
        <div className="w-screen h-screen flex items-center justify-center ">
          <div className="w-[13%] h-[69%]  absolute flex flex-col justify-between right-0">
            <div className="w-full  flex flex-col justify-center items-center p-2">
              <Dialog
                open={isSearchDialogOpen}
                onOpenChange={setIsSearchDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 bg-transparent hover:bg-transparent"
                  >
                    <FilterIcon className="!h-6 !w-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-[90%] rounded-lg dark:bg-backgroundDark dark:text-white flex flex-col justify-start items-start">
                  <DialogHeader>
                    <DialogTitle className="font-poppins">
                      Filter by tags
                    </DialogTitle>
                  </DialogHeader>
                  <div className="pr-2 w-full">
                    <Input
                      value={searchQuery}
                      placeholder="Search with tags (e.g., tech, science)"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="dark:bg-backgroundDark border-borderColor placeholder:text-borderColor font-opensans pr-10"
                    />
                  </div>
                  <div className="flex -ml-2 w-full flex-wrap">
                    {uniqueTags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="mx-2 my-1 px-3 dark:text-white border border-borderColor font-openSans rounded-lg cursor-pointer"
                        variant="outline"
                        onClick={() =>
                          setSearchQuery((prev) =>
                            prev ? `${prev}, ${tag}` : tag
                          )
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <DialogFooter className="flex w-full -m-2">
                    <div className="w-full flex justify-end">
                      <Button
                        type="submit"
                        variant="ghost"
                        className="font-poppins border border-borderColor dark:bg-backgroundDark bg-gray-200 dark:text-white"
                        onClick={() => {
                          handleSearch();
                          setIsSearchDialogOpen(false);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 bg-transparent hover:bg-transparent hover:text-white"
                  >
                    <SortDesc className="!h-6 !w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 dark:text-white dark:bg-backgroundDark dark:border-white/10 border border-borderColor -mt-12 mr-12">
                  <DropdownMenuItem
                    onSelect={() => setRenderType("dateAsc")}
                    className="flex items-center justify-between px-2 py-1"
                  >
                    Date added (ascending)
                    {renderType === "dateAsc" && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setRenderType("dateDes")}
                    className="flex items-center justify-between px-2 py-1 border-t border-b border-borderColor dark:border-white/10"
                  >
                    Date added (descending)
                    {renderType === "dateDes" && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setRenderType("random")}
                    className="flex items-center justify-between px-2 py-1"
                  >
                    Random
                    {renderType === "random" && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {searchQuery.trim() !== "" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => {
                    handleSearchReset();
                    setSearchQuery("");
                  }}
                >
                  <SearchX className="!h-6 !w-6" />
                </Button>
              )}
            </div>
            <div className="w-full  flex flex-col justify-center items-center p-2">
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <p className="font-openSans text-base">
                  {displayedWords.length === 0
                    ? "0 / 0"
                    : `${Math.min(currentIndex + 1, displayedWords.length)} / ${
                        displayedWords.length
                      }`}
                </p>
              </Button>

              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Trash2 className="!h-6 !w-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-[90%] rounded-lg border border-borderColor dark:bg-backgroundDark dark:text-white flex flex-col justify-start items-start">
                  <DialogHeader className="w-full flex flex-col items-start">
                    <DialogTitle className="font-poppins">
                      Are you sure?
                    </DialogTitle>
                    <DialogDescription>
                      Do you really want to delete this word?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex w-full -m-2">
                    <div className="w-full flex justify-end">
                      <Button
                        type="submit"
                        className="font-poppins border-borderColor dark:bg-backgroundDark dark:text-white mx-2"
                        variant="outline"
                        onClick={() => {
                          setIsDeleteDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="font-poppins"
                        variant="destructive"
                        onClick={() => {
                          deleteWord(currentIndex);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div
            className="overflow-y-auto snap-y snap-mandatory h-screen w-[80%] "
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
                <p className="text-2xl dark:text-borderColor text-gray-500 font-openSans">
                  The void is empty... for now. Add some words to bring it to
                  life! ✨
                </p>
              </div>
            ) : noResults && displayedWords.length === 0 ? (
              <div className="h-full w-full p-4 flex justify-center items-center">
                <p className="text-2xl dark:text-borderColor text-gray-500 font-openSans">
                  Oops! That tag must be hiding. Try a different one! 😅
                </p>
              </div>
            ) : (
              displayedWords.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="h-screen flex items-center justify-center snap-start px-4 cursor-pointer"
                >
                  <div
                    onClick={() => toggleDefinition(index)}
                    className="max-w-md border-2 rounded-lg border-borderColor p-1  h-[65%] flex flex-col items-center justify-center w-full space-y-4 text-center"
                  >
                    {visibleDefinitions[index] ? (
                      <div className="flex flex-col w-full">
                        <p className="text-xl dark:text-gray-300 text-gray-500 font-opensans">
                          {item.definition}
                        </p>
                        <div className="flex justify-center items-center">
                          {item.tags.map((tags, num) => (
                            <Badge
                              key={num}
                              variant="outline"
                              className="dark:text-white border border-borderColor m-2 font-openSans"
                            >
                              {tags}
                            </Badge>
                          ))}
                        </div>
                      </div>
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
        </div>
      </main>
      <div className="fixed top-0 left-0 right-0 border-b border-borderColor dark:border-white/10 dark:bg-backgroundDark/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-4 mx-auto">
          <p className="font-poppins font-semibold text-2xl">Flash</p>
        </div>
      </div>
    </div>
  );
}
