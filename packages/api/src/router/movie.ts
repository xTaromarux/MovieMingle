import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const movieRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movie.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.movie.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        backgroundImg: z.string(),
        cardImg: z.string(),
        titleImg: z.string(),
        title: z.string(),
        subTitle: z.string(),
        description: z.string(),
        stateType: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.movie.create({ data: input });
    }),
});
