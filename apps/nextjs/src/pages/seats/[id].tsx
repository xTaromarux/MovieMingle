import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { LoadingPage } from "../../components/loading";
import { PageLayout } from "../../components/Layout";
import Image from "next/image";
import { SeatsType } from "../../constants/models/Movies";
import styles from "./Seats.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { type MovieDetailsProps } from "../../types/index";

const Seats = () => {
  const { movies } = useContext(MoviesContext);
  const router = useRouter();
  let selectedSeats: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id, seats, movieFromReq }: any = router.query;
  const movie = movies.find((mov) => mov.id === id);
  const [seatDetails, setSeatDetails] = useState<SeatsType>(movie?.seats || {});

  useEffect(() => {
    if (!seats) {
      clearSelectedSeats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seats]);

  const clearSelectedSeats = () => {
    const newMovieSeatDetails = { ...seatDetails };
    for (const key in seatDetails) {
      const concretSeatDetails = seatDetails[key];
      if (concretSeatDetails) {
        concretSeatDetails.forEach((seatValue, seatIndex) => {
          if (seatValue === 2) {
            concretSeatDetails[seatIndex] = 0;
          }
        });
      }
    }
    setSeatDetails(newMovieSeatDetails);
  };

  const onSeatClick = (
    seatValue: number | undefined,
    rowIndex: number,
    key: string,
  ) => {
    const concretSeatDetails = seatDetails[key];

    if (seatDetails) {
      if (seatValue === 1 || seatValue === 3) {
        return;
      } else if (seatValue === 0 && concretSeatDetails) {
        concretSeatDetails[rowIndex] = 2;
      } else if (concretSeatDetails) {
        concretSeatDetails[rowIndex] = 0;
      }
    }
    setSeatDetails({ ...seatDetails });
  };

  /**
   * 0 - Not booked
   * 1 - Booked
   * 2 - Selected
   * 3 - Blocked
   */
  const getClassNameForSeats = (seatValue: number | undefined) => {
    let dynamicClass;
    if (seatValue === 0) {
      // Not booked
      dynamicClass = styles.seatNotBooked;
    } else if (seatValue === 1) {
      // booked
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {
      // Seat Selected
      dynamicClass = styles.seatSelected;
    } else {
      // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`;
  };

  const RenderSeats = () => {
    const seatArray = [];
    for (const key in seatDetails) {
      const concretSeatDetails = seatDetails[key];

      if (concretSeatDetails) {
        const colValue = concretSeatDetails.map((seatValue, rowIndex) => (
          <span key={`${key}.${rowIndex}`} className={`${styles.seatsHolder}`}>
            {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
            <span
              className={getClassNameForSeats(seatValue)}
              onClick={() => onSeatClick(seatValue, rowIndex, key)}
            >
              {rowIndex + 1}
            </span>
            {seatDetails && rowIndex === concretSeatDetails.length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </span>
        ));
        seatArray.push(colValue);
      }
    }
    return (
      <div className={`${styles.seatsLeafContainer} row-span-5 row-start-7 `}>
        {seatArray}
      </div>
    );
  };

  const RenderPaymentButton = () => {
    selectedSeats = [];
    for (const key in seatDetails) {
      const concretSeatDetails = seatDetails[key];

      if (concretSeatDetails) {
        concretSeatDetails.forEach((seatValue, seatIndex) => {
          if (seatValue === 2) {
            selectedSeats.push(`${key}${seatIndex + 1}`);
          }
        });
      }
    }
    if (selectedSeats.length) {
      return (
        <Link
          className="row-start-12 row-span-1 mx-auto mb-10 w-1/4"
          href={{
            pathname: "/payment",
            query: {
              movieId: movie?.id,
              seatDetails: JSON.stringify(seatDetails),
              movieFromReq: JSON.stringify(parsedMovie),
            },
          }}
        >
          <div className={`${styles.paymentButtonContainer} `}>
            <Button
              variant="contained"
              href="#contained-buttons"
              className={styles.paymentButton}
            >
              BUY
            </Button>
          </div>
        </Link>
      );
    } else {
      return <></>;
    }
  };

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

  console.log(parsedMovie);

  if (!movie || !parsedMovie)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );
  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center gap-4 ">
        <div
          className={`${styles.seatsContainer}  grid w-4/6 grid-cols-1 items-end justify-center `}
        >
          <div
            className={`${styles.movieInfo} row-span-4 row-start-1 grid h-full w-full grid-cols-12 items-end justify-center  text-left text-xl`}
          >
            <Image
              src={parsedMovie.cardImg !== undefined ? parsedMovie.cardImg : ""}
              alt={`${parsedMovie.subTitle}`}
              width={400}
              height={400}
              quality={100}
              className="col-span-3 col-start-2 row-span-1 row-start-1"
              style={{ width: "auto" }}
            />
            <div className="col-span-5 col-start-5 row-span-1 row-start-1 ml-9 ">
              <p className="text-3xl">TICKET PURCHASE</p>
              <br />
              {parsedMovie.title}
              <br />
              {parsedMovie.subTitle}
              <br />
            </div>
          </div>
          <h1 className="row-span-1 row-start-5 text-2xl text-white">
            SELECTED SEATING
          </h1>
          <div
            className={`${styles.movieInfo} row-span-1 row-start-6 mx-auto  h-6 w-5/6 bg-white`}
          ></div>

          {seatDetails && <RenderSeats />}
          <RenderPaymentButton />
        </div>
      </div>
    </PageLayout>
  );
};

export default Seats;
