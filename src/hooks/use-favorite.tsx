import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorite() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );

  const queryClient = useQueryClient();

  const favoriteQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  const addtoFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exists = favorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorites;

      const newFavoritesList = [newFavorite, ...favorites].slice(0, 10);

      setFavorites(newFavoritesList);
      return newFavoritesList;
    },
    onSuccess: (newFavoritesList) => {
      queryClient.setQueryData(["favorites"], newFavoritesList);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavoritesList = favorites.filter((city) => city.id != cityId);
      setFavorites(newFavoritesList);
      return newFavoritesList;
    },
    onSuccess: (newFavoritesList) => {
      queryClient.setQueryData(["favorites"], newFavoritesList);
    },
  });

  return {
    favorites: favoriteQuery.data ?? [],
    addtoFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => {
      return favorites.some((city) => city.lat == lat && city.lon == lon);
    },
  };
}
