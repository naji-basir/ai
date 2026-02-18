import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3008;
import dotenv from "dotenv";

dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send(process.env.OPEN_AI_KEY);
});

app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});
