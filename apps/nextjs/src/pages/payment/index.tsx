import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

import { TicketsType, SeatsType } from "../../constants/models/Movies";
import styles from "./Payment.module.scss";
import MoviesContext from "../../context/MoviesContext";

const Tickets = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  let movieSeatDetails: SeatsType = {};
  let bookingChargePerTicket = 20,
    ticketCost: number,
    bookingFee: number,
    totalCost: number;
  const { movieId, seatDetails }: any = router.query;
  const movie = movies.find((mov) => mov.id === movieId);
  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerCompleted(true);
    }
  });

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
        <div className={styles.seatCost}>Rs.{ticketCost}</div>
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
        <div className={styles.seatCost}>Rs.{bookingFee}</div>
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
        <div className={styles.seatCost}>Rs.{totalCost}</div>
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
      <div className={styles.paymentButtonContainer}>
        <Button
          variant="contained"
          disabled={isTimerCompleted}
          className={styles.paymentButton}
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
        <div className={styles.cardTitleContainer}>
          <Link
            href={{
              pathname: `/seats/${movie?.id}`,
              query: {
                seats: isTimerCompleted ? null : JSON.stringify(seatDetails),
              },
            }}
          >
            <ArrowBackIcon />
          </Link>
          <div className={styles.cardTitle}>BOOKING SUMMARY</div>
        </div>
        <p className={styles.movieName}>{movie.name}</p>
        <RenderSeatDetails selectedSeats={selectedSeats} />
        <RenderBookingCharge selectedSeats={selectedSeats} />
        <hr className={styles.hrStyle} />
        <RenderTotalCharge selectedSeats={selectedSeats} />
        <RenderConfirmButton />
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
