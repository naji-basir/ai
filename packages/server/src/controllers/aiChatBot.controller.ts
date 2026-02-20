import type { Request, Response } from "express";
import { Ollama } from "ollama";

// GET response from Ollama API
const client = new Ollama({
  host: "https://ollama.com",
  headers: { Authorization: "Bearer " + process.env.OLLAMA_API_KEY },
});

// Controller function to handle chat requests
export const getResponse = async (req: Request, res: Response) => {
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
};

// A simple test controller
export const helloWorld = (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
};
