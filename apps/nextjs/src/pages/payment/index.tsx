/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Image from "next/image";
import { TicketsType, SeatsType } from "../../constants/models/Movies";
import styles from "./Payment.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { MovieDetailsProps } from "../../types";

const Tickets = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const router = useRouter();
  const [seconds, setSeconds] = useState(50);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  let movieSeatDetails: SeatsType = {};
  // eslint-disable-next-line prefer-const
  let bookingChargePerTicket = 3,
    ticketCost: number,
    bookingFee: number,
    totalCost: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { movieId, seatDetails, movieFromReq }: any = router.query;
  const movie = movies.find((mov) => mov.id === movieId);
  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }

  const [parsedMovie, setParsedMovie] = useState<MovieDetailsProps | null>(
    null,
  );

  useEffect(() => {
    if (typeof movieFromReq === "string") {
      // Spróbuj sparsować przekazany obiekt filmu
      try {
        const parsedMovieObj = JSON.parse(movieFromReq);
        console.log(parsedMovieObj);

        setParsedMovie(parsedMovieObj);
      } catch (error) {
        console.error("Błąd podczas parsowania obiektu filmu:", error);
      }
    }
  }, [movieFromReq]);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerCompleted(true);
    }
  }, [seconds]);

  const computeSelectedSeats = () => {
    const selectedSeats: string[] = [];
    for (const key in movieSeatDetails) {
      const movieSeatDetail = movieSeatDetails[key];

      if (movieSeatDetail) {
        movieSeatDetail.forEach((seatValue, seatIndex) => {
          if (seatValue === 2) {
            selectedSeats.push(`${key}${seatIndex + 1}`);
          }
        });
      }
    }
    return selectedSeats;
  };

  const RenderSeatDetails = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    ticketCost = selectedSeats.length * (movie?.ticketCost || 0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(", ")} ({selectedSeats.length} Tickets)
        </div>
        <div className={styles.seatCost}>{ticketCost} zł</div>
      </div>
    );
  };

  const RenderBookingCharge = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    bookingFee = selectedSeats.length * bookingChargePerTicket;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Booking Charge</div>
        <div className={styles.seatCost}>{bookingFee} zł</div>
      </div>
    );
  };

  const RenderTotalCharge = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    totalCost = ticketCost + bookingFee;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Total</div>
        <div className={styles.seatCost}>{totalCost} zł</div>
      </div>
    );
  };

  const modifiedSeatValue = () => {
    const newMovieSeatDetails = { ...movieSeatDetails };
    for (const key in movieSeatDetails) {
      const movieSeatDetail = movieSeatDetails[key];

      if (movieSeatDetail) {
        movieSeatDetail.forEach((seatValue, seatIndex) => {
          if (seatValue === 2) {
            movieSeatDetail[seatIndex] = 1;
          }
        });
      }
    }
    return newMovieSeatDetails;
  };

  const onConfirmButtonClick = async () => {
    const movieIndex = movies.findIndex((mov) => mov.id === movieId);
    const movie = movies[movieIndex];
    if (movieIndex !== -1 && setMovies && movie) {
      movie.seats = modifiedSeatValue();
      console.log(movies);
      setMovies(movies);
      router.push("/");
    }
  };

  const RenderConfirmButton = () => {
    return (
      <div className={`${styles.paymentButtonContainer} `}>
        <Button
          variant="contained"
          href="#contained-buttons"
          className={styles.paymentButton}
          disabled={isTimerCompleted}
          onClick={onConfirmButtonClick}
        >
          {isTimerCompleted
            ? "Confirm Booking"
            : `Confirm Booking (${seconds})`}
        </Button>
      </div>
    );
  };

  const RenderCard = () => {
    const selectedSeats: string[] = computeSelectedSeats();

    if (!movie) return <div>loading...</div>;
    return (
      <div className={styles.card}>
        <div
          className={`${styles.cardTitleContainer} col-span-1 col-start-1 row-span-6 row-start-1 grid grid-cols-1 grid-rows-6 items-center justify-center gap-6 p-3 pb-10`}
        >
          <Link
            href={{
              pathname: `/seats/${parsedMovie?.id}`,
              query: {
                seats: isTimerCompleted ? null : JSON.stringify(seatDetails),
                movieFromReq: JSON.stringify(parsedMovie),
              },
            }}
            className={`col-span-1 col-start-1 row-span-1 row-start-1 mr-auto ml-0`}
          >
            <ArrowBackIcon />
          </Link>
          <Image
            src={
              parsedMovie !== null && parsedMovie.titleImg !== undefined
                ? parsedMovie.titleImg
                : ""
            }
            alt={`${
              parsedMovie !== null && parsedMovie.subTitle !== undefined
                ? parsedMovie.subTitle
                : ""
            }`}
            width={200}
            height={200}
            quality={100}
            className=" col-span-1 col-start-1 row-span-4 row-start-2 mx-auto"
            style={{ width: "auto" }}
          />
          <div
            className={`${styles.cardTitle} col-span-1 col-start-1 row-span-1 row-start-6 mx-auto text-white`}
          >
            BOOKING SUMMARY
          </div>
        </div>
        <div
          className={`col-span-1 col-start-1 row-span-6 row-start-7 grid grid-cols-1 grid-rows-6 items-center justify-center gap-6 p-16 pb-10`}
        >
          <RenderSeatDetails selectedSeats={selectedSeats} />
          <RenderBookingCharge selectedSeats={selectedSeats} />
          <hr className={styles.hrStyle} />
          <RenderTotalCharge selectedSeats={selectedSeats} />
          <RenderConfirmButton />
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
      <div className={styles.container}>
        <RenderCard />
      </div>
    </>
  );
};

type MovieType = {
  movie: TicketsType;
  isLoading: boolean;
  isError: boolean;
};

export default Tickets;
