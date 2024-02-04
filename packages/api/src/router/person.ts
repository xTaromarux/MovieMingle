import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const personRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.person.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.person.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.person.create({ data: input });
    }),
});
