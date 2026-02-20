import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Ollama } from "ollama";

dotenv.config();

const client = new Ollama({
  host: "https://ollama.com",
  headers: { Authorization: "Bearer " + process.env.OLLAMA_API_KEY },
});

const port = process.env.PORT || 3008;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body as { prompt: string };

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await client.chat({
      model: "gpt-oss:120b",
      messages: [{ role: "user", content: prompt }],
      options: {
        temperature: 0.4,
      },
    });

    console.log(response);

    res.json({
      reply: response?.message?.content ?? "No response returned",
    });
  } catch (error: any) {
    console.error("Ollama error:", error?.response?.data || error.message);
    res.status(500).json({ error: "API request failed" });
  }
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World" });
});

app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});

// Runnung a local chatbot server
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "llama3.2",
//       prompt: message,
//       stream: false,
//     });

//     res.json({ reply: response.data.response });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something failed" });
//   }
// });
