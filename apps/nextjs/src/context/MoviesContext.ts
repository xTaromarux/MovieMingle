import React from "react";
import { TicketsType } from "../constants/models/Movies";
import { movies } from "../constants/movies";

export default React.createContext<MovieContextModal>({ movies: movies });

interface MovieContextModal {
  movies: TicketsType[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  setMovies?: Function;
}
