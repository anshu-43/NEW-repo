import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body || "{}");

    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "Prompt missing" }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return { statusCode: 200, body: JSON.stringify({ text }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Gemini failed" }) };
  }
};

export { handler };
