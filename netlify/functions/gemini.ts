import { GoogleGenerativeAI } from "@google/genai";

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const answers = body.answers;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Write a heartfelt romantic confession letter based on these answers:
${answers.join("\n")}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate letter" })
    };
  }
};
