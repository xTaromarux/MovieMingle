import ImageSlider from "../components/ImageSlider";
import ReactCardSlider from "../components/ReactCardSlider";
import { PageLayout } from "../components/Layout";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { Movie } from "../types/index";
import { useState, useEffect } from "react";
import { LoadingPage } from "../components/loading";
import router from "next/router";

export default function Home() {
  const movieQuery = trpc.movie.all.useQuery();

  const [movies, setMovies] = useState<Movie[] | null>(
    movieQuery.data !== undefined && movieQuery.data !== null
      ? movieQuery.data
      : null,
  );

  useEffect(() => {
    if (movieQuery.data !== undefined) {
      setMovies(movieQuery.data);
    }
  }, [movieQuery.data]);

  const [slidesAvailable, setSlidesAvailable] = useState<Movie[] | null>(null);
  const [slidesSoon, setSlidesSoon] = useState<Movie[] | null>(null);

  useEffect(() => {
    if (movies) {
      const filteredPlayingMovies = movies
        .filter((movie) => movie.stateType === "playing")
        .map((movie) => ({ ...movie, clickEvent: handleCardClick }));

      setSlidesAvailable(filteredPlayingMovies);

      const filteredComingMovies = movies
        .filter((movie) => movie.stateType === "coming")
        .map((movie) => ({ ...movie, clickEvent: handleCardClick }));

      setSlidesSoon(filteredComingMovies);
    }
  }, [movies]);

  if (movieQuery.isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  const handleCardClick = (movie: Movie) => {
    console.log("Kliknięto na film:", movie);
    // Przekieruj użytkownika do strony filmu, przekazując obiekt filmu jako zapytanie
    router.push({
      pathname: "/movie",
      query: { movie: JSON.stringify(movie) },
    });
  };
  return (
    <>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <ImageSlider />

        <div
          className=""
          style={{ width: "100%", padding: "100px 0 20px 20px" }}
        >
          <a className=" pl-2 text-xl font-bold uppercase tracking-wide text-white no-underline hover:no-underline">
            DOSTĘPNE
          </a>
          {slidesAvailable ? (
            <ReactCardSlider
              slides={slidesAvailable}
              showScrollButtons={true}
              clickEvent={(movie: Movie) => handleCardClick(movie)}
            />
          ) : (
            <div></div>
          )}
          <a className="text-xl font-bold uppercase tracking-wide text-white no-underline hover:no-underline ">
            WKRÓTCE
          </a>
          {slidesSoon ? (
            <ReactCardSlider
              slides={slidesSoon}
              showScrollButtons={false}
              clickEvent={(movie: Movie) => handleCardClick(movie)}
            />
          ) : (
            <div></div>
          )}
        </div>
      </PageLayout>
    </>
  );
}
