import { Star } from "lucide-react";
import { toast } from "sonner";

import type { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";

import { Button } from "./ui/button";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addtoFavorite, isFavorite, removeFavorite } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const toggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addtoFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <>
      <Button
        className={
          isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""
        }
        variant={isCurrentlyFavorite ? "default" : "outline"}
        size={"icon"}
        onClick={toggleFavorite}
      >
        <Star
          className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
        />
      </Button>
    </>
  );
};

export default FavoriteButton;
