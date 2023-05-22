import { type NextApiRequest, type NextApiResponse } from "next";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import NextCors from "nextjs-cors";

const igcseClassByYearAndSeriesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Configuring the CORS
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { year, series } = req.query;

  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  try {
    const igcseClass = await caller.igcseClass.getByYearAndSeries({
      year: parseInt(year as string),
      series: series as "Feb/Mar" | "May/Jun" | "Oct/Nov",
    });
    res.status(200).json(igcseClass);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default igcseClassByYearAndSeriesHandler;
