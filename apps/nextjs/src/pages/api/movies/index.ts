import type { NextApiRequest, NextApiResponse } from "next";

import { TicketsType } from "../../../constants/models/Movies";
import { movies } from "../../../constants/movies";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TicketsType[]>,
) {
  if (req.method === "GET") {
    res.status(200).json(movies);
  }
}
