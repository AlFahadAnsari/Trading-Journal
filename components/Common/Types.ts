import { z } from "zod";

export const journalSchema = z.object({
  totalTrades: z.string().optional(),
  session: z.string().optional(),
  tradeResult: z.string().optional(),

  profit: z.string().optional(),
  loss: z.string().optional(),

  setup: z.string().optional(),
  reason: z.string().optional(),
  confirmations: z.string().optional(),

  fixedSL: z.boolean().optional(),
  riskPercent: z.string().optional(),
  rr: z.string().optional(),

  zoneReason: z.string().optional(),
  chartAnalysis: z.string().optional(),
  learning: z.string().optional(),

  entryReview: z.string().optional(),
  emotions: z.array(z.string()).optional(),

  mistake: z.boolean().optional(),
  mistakeReason: z.string().optional(),
  avoidPlan: z.string().optional(),

  positive: z.string().optional(),
  improved: z.string().optional(),
  improvementReason: z.string().optional(),

  updateDone: z.boolean().optional(),
  img1: z.string().optional(),
zoneTradeTF: z.string().optional(),
confirmTF: z.string().optional(),

});

export type JournalSchemaType = z.infer<typeof journalSchema>;

export type JournalEntry = {
  id: string;
  date: string;
  session: string;
  tradeResult: string;
  profit?: string;
  loss?: string;
  improved?: string;
};
