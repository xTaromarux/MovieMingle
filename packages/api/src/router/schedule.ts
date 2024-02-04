import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const scheduleRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.schedule.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.schedule.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.schedule.create({ data: input });
    }),
});
