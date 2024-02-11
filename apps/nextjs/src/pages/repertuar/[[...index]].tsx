// pages/movie/index.tsx
import { useEffect, useState } from "react";
import { Movie } from "@acme/db";
import { LoadingSpinner, LoadingPage } from "../../components/loading";
import { PageLayout } from "../../components/Layout";
import { trpc } from "../../utils/trpc";
import { Schedule } from "@acme/db";
import { Button } from "@mui/material";
import router from "next/router";
import Image from "next/image";
import styles from "./Repertuar.module.scss";

// movieId: z.string(),
//         time: z.string(),
//         remainTickets: z.number(),
//         fromDate: z.date(),
//         toDate: z.date(),
//         roomNumber: z.number(),

function RenderMovieSection({ movie }: { movie: Movie }) {
  const scheduleQuery = trpc.schedule.all.useQuery();

  const [schedule, setSchedule] = useState<Schedule[] | null>(
    scheduleQuery.data !== undefined && scheduleQuery.data !== null
      ? scheduleQuery.data
      : null,
  );

  useEffect(() => {
    if (scheduleQuery.data !== undefined) {
      setSchedule(scheduleQuery.data);
    }
  }, [scheduleQuery.data]);

  const handleCardClick = (movie: Movie) => {
    // Przekieruj użytkownika do strony filmu, przekazując obiekt filmu jako zapytanie
    router.push({
      pathname: "/movie",
      query: { movie: JSON.stringify(movie) },
    });
  };

  return (
    <>
      <div className={`${styles.renderMovieSection} mx-2 h-96 w-full `}>
        <div
          className={`mx-2 grid h-96 w-full grid-cols-6 grid-rows-1 items-center`}
        >
          <div className="col-span-2 col-start-1">
            <Image
              src={
                movie.cardImg !== undefined && movie.cardImg !== null
                  ? movie.cardImg
                  : ""
              }
              alt={`${movie.subTitle}`}
              width={400}
              height={400}
              quality={100}
              className={``}
              style={{ width: "auto" }}
            />
          </div>
          <div
            className={` ${styles.scheduleContainer} col-span-4 col-start-3 grid h-full w-full grid-cols-1 text-white`}
          >
            <div className="row-span-3 row-start-2 text-5xl">{movie.title}</div>
            <div className="row-span-2 row-start-5">{movie.subTitle}</div>
            <div className="row-span-3 row-start-7">{movie.description}</div>
            <div className="row-start-10 row-span-2 grid grid-cols-12 grid-rows-1  gap-4">
              {scheduleQuery.isLoading ? (
                <div className="flex grow">
                  <LoadingSpinner size={60} />
                </div>
              ) : (
                schedule?.map((schedule) =>
                  schedule.movieId === movie.id ? (
                    <Button
                      key={schedule.id}
                      variant="contained"
                      className={`col-span-2 grid items-center justify-center`}
                      onClick={() => {
                        handleCardClick(movie);
                      }}
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        height: "70px",
                        border: "2px solid white",
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {schedule.time}
                    </Button>
                  ) : null,
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

const MoviePage = () => {
  const movieQuery = trpc.movie.all.useQuery();

  const [movies, setMovies] = useState<Movie[] | null>(
    movieQuery.data !== undefined && movieQuery.data !== null
      ? movieQuery.data
      : null,
  );
  const [slidesAvailable, setSlidesAvailable] = useState<Movie[] | null>(null);
  const [slidesSoon, setSlidesSoon] = useState<Movie[] | null>(null);

  useEffect(() => {
    if (movieQuery.data !== undefined) {
      setMovies(movieQuery.data);
    }
  }, [movieQuery.data]);

  useEffect(() => {
    if (movies) {
      const filteredPlayingMovies = movies
        .filter((movie) => movie.stateType === "playing")
        .map((movie) => ({ ...movie }));

      setSlidesAvailable(filteredPlayingMovies);

      const filteredComingMovies = movies
        .filter((movie) => movie.stateType === "coming")
        .map((movie) => ({ ...movie }));

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
    <PageLayout>
      <div className="my-40 flex w-4/6 flex-col items-center justify-center gap-4 ">
        <div className="grid w-full grid-cols-1 grid-rows-1 items-start justify-start">
          <a className="text-4xl font-bold uppercase tracking-wide text-white no-underline hover:no-underline ">
            NADCHODZĄCE FILMY
          </a>
        </div>
        {slidesSoon ? (
          <div className="grid grid-cols-4 grid-rows-1 gap-3">
            {slidesSoon.map((movie, index) => (
              <Image
                key={index}
                src={movie.cardImg !== undefined ? movie.cardImg : ""}
                alt={`${movie.subTitle}`}
                width={300}
                height={300}
                quality={100}
                className={`col-span-1 col-start-${index} row-span-1 row-start-1 w-full`}
                style={{ width: "auto" }}
              />
            ))}
          </div>
        ) : (
          <div></div>
        )}
        <div className="mt-14 grid w-full grid-cols-1 grid-rows-1 items-start justify-start">
          <a className="text-4xl font-bold uppercase tracking-wide text-white no-underline hover:no-underline ">
            REPERTUAR
          </a>
        </div>
        {slidesAvailable ? (
          <div className="w-full">
            {slidesAvailable.map((movie, index) => (
              <RenderMovieSection key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </PageLayout>
  );
};

export default MoviePage;
