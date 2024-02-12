import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { PageLayout } from "../../components/Layout";
import { SeatsType } from "../../constants/models/Movies";
import styles from "./Customize.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { MovieDetailsProps } from "../../types";

const CustomizeRows = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id, movieFromReq }: any = router.query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movie = movies.find((mov) => mov.id === id);

  const [seatDetails, setSeatDetails] = useState<SeatsType>(movie?.seats || {});
  const [row, setRow] = useState<number>(movie?.rows || 0);
  const [column, setColumn] = useState<number>(movie?.cols || 0);
  const [parsedMovie, setParsedMovie] = useState<MovieDetailsProps | null>(
    null,
  );
  useEffect(() => {
    clearSelectedSeats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, column]);

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
    return newMovieSeatDetails;
  };

  const handleSubmit = () => {
    console.log(column);

    const newSeatObject: SeatsType = {};
    let key: string;
    for (let i = 0; i < column; i++) {
      if (i < 26) {
        key = String.fromCharCode(65 + i);
      } else {
        const character = String.fromCharCode(64 + i / 25);
        key = `${character}${String.fromCharCode(64 + (i % 25))}`;
      }
      const concretSeatDetails = seatDetails[key];
      if (concretSeatDetails) {
        newSeatObject[key] = Array(row)
          .fill(0)
          .map((_, i) => {
            if (seatDetails && concretSeatDetails && concretSeatDetails[i]) {
              return concretSeatDetails[i];
            } else {
              return 0;
            }
          });
      }
    }
    console.log(seatDetails);
    setSeatDetails(newSeatObject);
  };

  const handleSaveSetup = (movie: MovieDetailsProps) => {
    const movieIndex = movies.findIndex((mov) => mov.id === id);
    const concretMovie = movies[movieIndex];
    console.log(movieIndex !== -1);
    console.log(setMovies);
    console.log(concretMovie);

    if (movieIndex !== -1 && setMovies && concretMovie) {
      concretMovie.seats = seatDetails;
      setMovies(movies);
      router.push({
        pathname: "/movie",
        query: { movie: JSON.stringify(movie) },
      });
    }
  };

  const RenderInputFields = () => {
    const movieObject = {
      id: id,
      backgroundImg: parsedMovie !== null ? parsedMovie.backgroundImg : "",
      cardImg: parsedMovie !== null ? parsedMovie.cardImg : "",
      titleImg: parsedMovie !== null ? parsedMovie.titleImg : "",
      subTitle: parsedMovie !== null ? parsedMovie.subTitle : "",
      title: parsedMovie !== null ? parsedMovie.title : "",
      description: parsedMovie !== null ? parsedMovie.description : "",
      stateType: parsedMovie !== null ? parsedMovie.stateType : "",
    };

    return (
      <div className={`${styles.inputContainer} row-start-11 row-span-1`}>
        <form className={styles.inputHolder}>
          <TextField
            id="row"
            type="number"
            variant="outlined"
            size="small"
            color="primary"
            className={styles.inputField}
            name="row"
            value={row}
            sx={{
              input: {
                color: "white",
                border: "2px solid white",
                borderRadius: "5px",
              },
            }}
            onChange={(e) => setRow(parseInt(e.target.value) || 0)}
          />
          <TextField
            id="outlined"
            type="number"
            variant="outlined"
            size="small"
            color="success"
            className={styles.inputField}
            sx={{
              input: {
                color: "white",
                border: "2px solid white",
                borderRadius: "5px",
              },
            }}
            value={column}
            onChange={(e) => setColumn(parseInt(e.target.value) || 0)}
          />

          <Button
            onClick={() => {
              handleSaveSetup(movieObject);
            }}
            variant="contained"
            className={styles.saveSetUpButton}
          >
            Save Setup
          </Button>
        </form>
      </div>
    );
  };

  const onSeatClick = (
    seatValue: number | undefined,
    rowIndex: number,
    key: string,
  ) => {
    if (seatDetails) {
      const concretSeatDetails = seatDetails[key];

      if (seatValue === 1) {
        return;
      } else if (seatValue === 0 && concretSeatDetails) {
        concretSeatDetails[rowIndex] = 3;
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
          <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
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
      <div className={`${styles.seatsLeafContainer} row-span-5 row-start-6`}>
        {seatArray}
      </div>
    );
  };

  if (!movie) return <div>loading...</div>;
  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center gap-4 ">
        <div
          className={`${styles.seatsContainer}  grid w-4/6 grid-cols-1 items-end justify-center `}
        >
          {RenderInputFields()}
          <p
            className={`${styles.header} row-span-4 row-start-1 text-2xl text-white`}
          >
            Select Seats to be{" "}
            <b className={styles.headerBlockedText}>Blocked</b>
          </p>
          <div
            className={`${styles.movieInfo} row-span-1 row-start-5 mx-auto  h-6 w-5/6 bg-white`}
          ></div>
          {seatDetails && <RenderSeats />}
        </div>
      </div>
    </PageLayout>
  );
};

export default CustomizeRows;
