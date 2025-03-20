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
import {
  FilterIcon,
  HomeIcon,
  Plus,
  SearchX,
  Settings,
  SortDesc,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import NotificationComponent from "@/components/ui/notificationComponent";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface WordItem {
  word: string;
  definition: string;
  tags: Array<string>;
  index: number;
}

export default function Home() {
  const [renderType, setRenderType] = useState("bySequence");
  const [words, setWords] = useState<WordItem[]>([]);
  const [displayedWords, setDisplayedWords] = useState<WordItem[]>(words);
  const [visibleDefinitions, setVisibleDefinitions] = useState<{
    [key: number]: boolean;
  }>({});
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const uniqueTags = Array.from(new Set(words.flatMap((word) => word.tags)));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
  }, []);

  const toggleDefinition = (index: number) => {
    setVisibleDefinitions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
    const tags = e.target.value
      .split(",")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag !== "");
    setNewTags(tags);
  };
  const addWord = () => {
    if (newWord && newDefinition && newTags) {
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
      setNewWord("");
      setNewDefinition("");
      setNewTags([]);
      setTagValue("");
      toast.success("Another word enters the Hall of Knowledge! 🏛️");
    }
  };
  const deleteWord = (index: number) => {
    if (words.length === 0) {
      toast.error("There's nothing to delete! 🚫");
      return;
    }
    const updatedWords = words
      .filter((_, i) => i !== index)
      .map((word, i) => ({ ...word, index: i }));
    setWords(updatedWords);
    setDisplayedWords(updatedWords);
    localStorage.setItem("words", JSON.stringify(updatedWords));
    toast.error("Poof! That word just vanished into the void. 🚀");
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
    setDisplayedWords(renderType === "random" ? shuffleArray(words) : words);
  }, [renderType, words]);
  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <main className="flex-1 relative">
        <div className="w-screen h-screen flex items-center justify-center ">
          <div className="w-[13%] h-[69%]  absolute flex flex-col justify-between right-0">
            <div className="w-full  flex flex-col justify-center items-center p-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-12 h-12">
                    <FilterIcon className="!h-6 !w-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-[90%] rounded-lg border-zinc-800 bg-[#121212] text-white flex flex-col justify-start items-start">
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
                      className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400 font-opensans pr-10"
                    />
                  </div>
                  <div className="flex -ml-2 w-full flex-wrap">
                    {uniqueTags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="mx-2 my-1 px-3 text-white font-openSans rounded-sm cursor-pointer"
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
                        className="font-poppins"
                        onClick={() => {
                          handleSearch();
                          setIsDialogOpen(false);
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
                  <Button variant="ghost" size="icon" className="w-12 h-12">
                    <SortDesc className="!h-6 !w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-white bg-[#121212] border-white/10 mt-1">
                  <DropdownMenuRadioGroup
                    value={renderType}
                    onValueChange={setRenderType}
                  >
                    <DropdownMenuRadioItem value="bySequence">
                      Sort by sequence
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="random">
                      Sort randomly
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={() => {
                  handleSearchReset();
                }}
              >
                <SearchX className="!h-6 !w-6" />
              </Button>
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
              <Button
                onClick={() => deleteWord(currentIndex)}
                variant="ghost"
                size="icon"
                className="h-12 w-12"
              >
                <Trash2 className="!h-6 !w-6" />
              </Button>
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
                <p className="text-2xl text-gray-400 font-openSans">
                  The void is empty... for now. Add some words to bring it to
                  life! ✨
                </p>
              </div>
            ) : noResults ? (
              <div className="h-full w-full p-4 flex justify-center items-center">
                <p className="text-2xl text-gray-400 font-openSans">
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
                    className="max-w-md border-2 rounded-lg border-gray-400 p-1  h-[65%] flex flex-col items-center justify-center w-full space-y-4 text-center"
                  >
                    {visibleDefinitions[index] ? (
                      <div className="flex flex-col w-full">
                        <p className="text-xl text-gray-300 font-opensans">
                          {item.definition}
                        </p>
                        <div className="flex justify-center items-center">
                          {item.tags.map((tags, num) => (
                            <Badge
                              key={num}
                              variant="outline"
                              className="text-white m-2 font-openSans"
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
      <div className="fixed top-0 left-0 right-0 border-b border-white/10 bg-[#121212]/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-4 mx-auto">
          <p className="font-poppins font-semibold text-2xl">Flash</p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#121212]/80 backdrop-blur-sm">
        <div className="flex justify-between items-center p-2 mx-auto ">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <HomeIcon className="!h-6 !w-6" />
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-neutral-900"
              >
                <Plus className="!h-6 !w-6" />
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
                  <Textarea
                    placeholder="Enter definition"
                    value={newDefinition}
                    onChange={(e) => setNewDefinition(e.target.value)}
                    className="h-28 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400 font-opensans"
                  />
                  <Input
                    placeholder="Enter tags. (separated by comma)"
                    value={tagValue}
                    onChange={handleTagsChange}
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
            <Settings className="!h-6 !w-6" />
          </Button>

          {/* <NotificationComponent words={words} /> */}
        </div>
      </div>
    </div>
  );
}
