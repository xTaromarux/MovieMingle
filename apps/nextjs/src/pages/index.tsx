import ImageSlider from "../components/ImageSlider";
import ReactCardSlider from "../components/ReactCardSlider";
import { PageLayout } from "../components/Layout";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { Movie } from "../types/index";
import { useState, useEffect } from "react";
import { LoadingPage } from "../components/loading";

export default function Home() {
  const movieQuery = trpc.movie.all.useQuery();

  useEffect(() => {
    if (movieQuery.data !== undefined) {
      setMovies(movieQuery.data);
    }
  }, [movieQuery.data]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [movies, setMovies] = useState<Movie[] | null>(
    movieQuery.data === undefined ? null : movieQuery.data,
  );

  const [slidesAvailable, setSlidesAvailable] = useState<Movie[] | null>(null);
  const [slidesSoon, setSlidesSoon] = useState<Movie[] | null>(null);

  useEffect(() => {
    if (movies) {
      const filteredPlayingMovies = movies.filter(
        (movie) => movie.stateType === "playing",
      );
      setSlidesAvailable(filteredPlayingMovies);

      const filteredComingMovies = movies.filter(
        (movie) => movie.stateType === "coming",
      );
      setSlidesSoon(filteredComingMovies);
    }
  }, [movies]);

  if (movieQuery.isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  return (
    <>
      <Head>
        <title>Vocabulary learning App</title>
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
            />
          ) : (
            <div></div>
          )}
          <a className="text-xl font-bold uppercase tracking-wide text-white no-underline hover:no-underline ">
            WKRÓTCE
          </a>
          {slidesSoon ? (
            <ReactCardSlider slides={slidesSoon} showScrollButtons={false} />
          ) : (
            <div></div>
          )}
        </div>
      </PageLayout>
    </>
  );
}
