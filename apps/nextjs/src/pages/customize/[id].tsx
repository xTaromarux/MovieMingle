import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Button, TextField } from "@mui/material";

import { SeatsType } from "../../constants/models/Movies";
import styles from "./Customize.module.scss";
import MoviesContext from "../../context/MoviesContext";

const CustomizeRows = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id }: any = router.query;
  const movie = movies.find((mov) => mov.id === id);

  const [seatDetails, setSeatDetails] = useState<SeatsType>(movie?.seats || {});
  const [row, setRow] = useState<number>(movie?.rows || 0);
  const [column, setColumn] = useState<number>(movie?.cols || 0);

  useEffect(() => {
    clearSelectedSeats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, column]);

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
            if (seatDetails && seatDetails[key] && concretSeatDetails[i]) {
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

  const handleSaveSetup = async () => {
    const movieIndex = movies.findIndex((mov) => mov.id === id);
    const concretMovie = movies[movieIndex];
    if (movieIndex !== -1 && setMovies && concretMovie) {
      concretMovie.seats = seatDetails;
      setMovies(movies);
      router.push(`/details/${id}`);
    }
  };

  const RenderInputFields = () => {
    return (
      <div className={styles.inputContainer}>
        <form className={styles.inputHolder}>
          <TextField
            id="row"
            type="number"
            label="Row"
            variant="outlined"
            size="small"
            className={styles.inputField}
            name="row"
            value={row}
            onChange={(e) => setRow(parseInt(e.target.value) || 0)}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Column"
            variant="outlined"
            size="small"
            className={styles.inputField}
            value={column}
            onChange={(e) => setColumn(parseInt(e.target.value) || 0)}
          />
          <Button
            onClick={handleSaveSetup}
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
    return <div className={styles.seatsLeafContainer}>{seatArray}</div>;
  };

  if (!movie) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>Customize Rows</title>
      </Head>
      <div className={styles.seatsContainer}>
        {RenderInputFields()}
        <p className={styles.header}>
          Select Seats to be <b className={styles.headerBlockedText}>Blocked</b>
        </p>
        {seatDetails && <RenderSeats />}
      </div>
    </>
  );
};

export default CustomizeRows;
