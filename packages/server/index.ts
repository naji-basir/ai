import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3008;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});
