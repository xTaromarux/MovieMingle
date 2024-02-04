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
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.movie.create({ data: input });
    }),
});
