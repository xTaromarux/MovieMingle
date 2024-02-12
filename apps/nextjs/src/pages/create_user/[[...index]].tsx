// pages/movie/index.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Movie } from "../../types/index";
import MovieDetailsComponent from "../../components/MovieDetailsComponent";

const MoviePage = () => {
  const router = useRouter();
  const { movie } = router.query;

  const [parsedMovie, setParsedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (typeof movie === "string") {
      // Spróbuj sparsować przekazany obiekt filmu
      try {
        const parsedMovieObj = JSON.parse(movie);
        setParsedMovie(parsedMovieObj);
      } catch (error) {
        console.error("Błąd podczas parsowania obiektu filmu:", error);
      }
    }
  }, [movie]);

  if (!parsedMovie) {
    return <div>Loading...</div>;
  }

  return <MovieDetailsComponent {...parsedMovie} />;
};

export default MoviePage;
