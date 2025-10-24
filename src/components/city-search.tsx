import { useEffect, useState } from "react";

import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { CommandSeparator } from "cmdk";
import { format, formatDate, set } from "date-fns";
import { useNavigate } from "react-router";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@//components/ui/command";
import { useLocationSearch } from "@/hooks/use-weather";
import { useSearchHistory } from "@/hooks/use-search-history";

import { Button } from "./ui/button";
import { useFavorite } from "@/hooks/use-favorite";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const { favorites } = useFavorite();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (cityData: string) => {
    const [lat, lon, city, state, country] = cityData.split("|");

    addToHistory.mutate({
      query: query,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name: city,
      state,
      country,
    });

    setOpen(false);
    setQuery("");
    navigate(`/city/${city}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-60 lg:w-80"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
        <div className="flex w-full justify-end">
          <p className="text-muted-foreground text-sm">
            Press{" "}
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Cities"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length >= 1 && !isLoading && (
            <CommandEmpty>No Cities found..</CommandEmpty>
          )}

          {favorites.length > 0 && (
            <CommandGroup heading="Favorites">
                {favorites.map((h) => (
                  <CommandItem
                    key={h.id}
                    value={`${h.lat}|${h.lon}|${h.name}|${h.state}|${h.country}`}
                    onSelect={handleSelect}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>{h.name},</span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      {h.state},
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      {h.country}
                    </span>
                  </CommandItem>
                ))}
            </CommandGroup>
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                </div>

                {history.map((h) => (
                  <CommandItem
                    key={h.id}
                    value={`${h.lat}|${h.lon}|${h.name}|${h.state}|${h.country}`}
                    onSelect={handleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{h.name},</span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      {h.state},
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      {h.country}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {formatDate(h.searchedAt, "MMM d, h:mm a")}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}

              {locations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.state}|${location.country}`}
                  onSelect={handleSelect}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{location.name},</span>
                  <span className="text-sm text-muted-foreground">
                    {location.state},
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
