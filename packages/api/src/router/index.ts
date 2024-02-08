import { router } from "../trpc";
import { movieRouter } from "./movie";
import { personRouter } from "./person";
import { scheduleRouter } from "./schedule";
import { authRouter } from "./auth";

export const appRouter = router({
  movie: movieRouter,
  person: personRouter,
  schedule: scheduleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
